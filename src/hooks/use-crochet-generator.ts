'use client';

import { useState, useCallback } from 'react';
import type { ColorEntry, ConversionAlgorithm, GeneratorState } from '../lib/types';
import { DEFAULT_PALETTE, DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../lib/constants';
import { applyAlgorithm } from '../lib/algorithms';
import { downloadImage } from '../lib/utils';

const initialState: GeneratorState = {
  image: null,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  algorithm: 'simple',
  selectedColors: [...DEFAULT_PALETTE],
  result: null,
  isProcessing: false,
};

export function useCrochetGenerator() {
  const [state, setState] = useState<GeneratorState>(initialState);

  const setImage = useCallback((image: string | null) => {
    setState((prev) => ({ ...prev, image, result: null }));
  }, []);

  const setWidth = useCallback((width: number) => {
    setState((prev) => ({ ...prev, width }));
  }, []);

  const setHeight = useCallback((height: number) => {
    setState((prev) => ({ ...prev, height }));
  }, []);

  const setAlgorithm = useCallback((algorithm: ConversionAlgorithm) => {
    setState((prev) => ({ ...prev, algorithm }));
  }, []);

  const setSelectedColors = useCallback((colors: ColorEntry[]) => {
    setState((prev) => ({ ...prev, selectedColors: colors }));
  }, []);

  const toggleColor = useCallback((color: ColorEntry) => {
    setState((prev) => {
      const isSelected = prev.selectedColors.some((c) => c.hex === color.hex);

      if (isSelected) {
        // Não permite desmarcar se só tem 2 cores
        if (prev.selectedColors.length <= 2) return prev;
        return {
          ...prev,
          selectedColors: prev.selectedColors.filter((c) => c.hex !== color.hex),
        };
      } else {
        return {
          ...prev,
          selectedColors: [...prev.selectedColors, color],
        };
      }
    });
  }, []);

  const selectAllColors = useCallback((palette: ColorEntry[]) => {
    setState((prev) => ({ ...prev, selectedColors: [...palette] }));
  }, []);

  const deselectAllColors = useCallback((keepMinimum: ColorEntry[]) => {
    setState((prev) => ({
      ...prev,
      selectedColors: keepMinimum.slice(0, 2),
    }));
  }, []);

  const generate = useCallback(async () => {
    if (!state.image || state.selectedColors.length < 2) return;

    setState((prev) => ({ ...prev, isProcessing: true }));

    try {
      const result = await applyAlgorithm(
        state.algorithm,
        state.image,
        state.width,
        state.height,
        state.selectedColors
      );

      setState((prev) => ({ ...prev, result, isProcessing: false }));
    } catch (error) {
      console.error('Erro ao gerar gráfico:', error);
      setState((prev) => ({ ...prev, isProcessing: false }));
    }
  }, [state.image, state.algorithm, state.width, state.height, state.selectedColors]);

  const download = useCallback(() => {
    if (!state.result) return;

    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `crochet-pattern-${state.width}x${state.height}-${timestamp}.png`;
    downloadImage(state.result, filename);
  }, [state.result, state.width, state.height]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    // Estado
    ...state,

    // Ações
    setImage,
    setWidth,
    setHeight,
    setAlgorithm,
    setSelectedColors,
    toggleColor,
    selectAllColors,
    deselectAllColors,
    generate,
    download,
    reset,
  };
}
