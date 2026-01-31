'use client';

import React from "react"

import { useState, useRef, useEffect, useCallback } from 'react';
import type { ConversionAlgorithm } from '@/lib/types';
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_ALGORITHM,
  DEFAULT_SELECTED_COLORS,
  BASIC_PALETTE,
  DEFAULT_PALETTE,
  BLOCK_SIZE,
} from '@/lib/constants';
import { loadImage, createResizedCanvas, renderBlocksToCanvas } from '@/lib/utils/canvas';
import { applyAlgorithm } from '@/lib/algorithms';

export interface UseCrochetGeneratorReturn {
  // State
  imageUrl: string | null;
  width: number;
  height: number;
  selectedPalette: string[];
  advancedMode: boolean;
  algorithm: ConversionAlgorithm;
  isGenerating: boolean;
  generatedUrl: string | null;
  
  // Actions
  setImageUrl: (url: string | null) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setAlgorithm: (algorithm: ConversionAlgorithm) => void;
  setAdvancedMode: (mode: boolean) => void;
  toggleColor: (hex: string) => void;
  selectAllColors: () => void;
  deselectAllColors: () => void;
  generate: () => Promise<void>;
  download: () => void;
  
  // Refs
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  
  // Computed
  isValid: boolean;
  currentPalette: typeof BASIC_PALETTE;
}

/**
 * Main hook for crochet pattern generation
 * Encapsulates all state and logic for the generator
 */
export function useCrochetGenerator(): UseCrochetGeneratorReturn {
  // State
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [selectedPalette, setSelectedPalette] = useState<string[]>(DEFAULT_SELECTED_COLORS);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [algorithm, setAlgorithm] = useState<ConversionAlgorithm>(DEFAULT_ALGORITHM);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cleanup URL on unmount or change
  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  // Color management
  const toggleColor = useCallback((hex: string) => {
    setSelectedPalette(prev =>
      prev.includes(hex)
        ? prev.filter(h => h !== hex)
        : [...prev, hex]
    );
  }, []);

  const selectAllColors = useCallback(() => {
    const palette = advancedMode ? DEFAULT_PALETTE : BASIC_PALETTE;
    setSelectedPalette(palette.map(c => c.hex));
  }, [advancedMode]);

  const deselectAllColors = useCallback(() => {
    setSelectedPalette([]);
  }, []);

  // Generation
  const generate = useCallback(async () => {
    if (!imageUrl || !canvasRef.current || selectedPalette.length === 0) return;

    setIsGenerating(true);
    setGeneratedUrl(null);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const img = await loadImage(imageUrl);

      canvas.width = width * BLOCK_SIZE;
      canvas.height = height * BLOCK_SIZE;

      const { imageData } = createResizedCanvas(img, width, height);
      const pixels = imageData.data;

      // Apply selected algorithm
      applyAlgorithm(algorithm, pixels, width, height, selectedPalette);

      // Render to canvas
      renderBlocksToCanvas(ctx, pixels, width, height);

      setGeneratedUrl(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [imageUrl, width, height, selectedPalette, algorithm]);

  // Download
  const download = useCallback(() => {
    if (!generatedUrl) return;

    const link = document.createElement('a');
    link.download = `grafico-croche-${width}x${height}.png`;
    link.href = generatedUrl;
    link.click();
  }, [generatedUrl, width, height]);

  // Computed
  const isValid = !!imageUrl && selectedPalette.length > 0 && !isGenerating;
  const currentPalette = advancedMode ? DEFAULT_PALETTE : BASIC_PALETTE;

  return {
    // State
    imageUrl,
    width,
    height,
    selectedPalette,
    advancedMode,
    algorithm,
    isGenerating,
    generatedUrl,
    
    // Actions
    setImageUrl,
    setWidth,
    setHeight,
    setAlgorithm,
    setAdvancedMode,
    toggleColor,
    selectAllColors,
    deselectAllColors,
    generate,
    download,
    
    // Refs
    canvasRef,
    
    // Computed
    isValid,
    currentPalette,
  };
}
