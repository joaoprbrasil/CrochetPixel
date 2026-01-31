'use client'

import { useState, useCallback, useRef, useMemo } from 'react'
import type { ConversionAlgorithm } from '@/lib/types'
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_ALGORITHM,
  DEFAULT_SELECTED_COLORS,
  BASIC_PALETTE,
  ADVANCED_PALETTE,
  BLOCK_SIZE,
} from '@/lib/constants'
import { applyAlgorithm } from '@/lib/algorithms'
import { loadImage, createResizedCanvas, renderBlocksToCanvas, canvasToDataUrl, downloadDataUrl } from '@/lib/utils/canvas'

export function useCrochetGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [selectedPalette, setSelectedPalette] = useState<string[]>(DEFAULT_SELECTED_COLORS)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [algorithm, setAlgorithm] = useState<ConversionAlgorithm>(DEFAULT_ALGORITHM)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const currentPalette = useMemo(
    () => advancedMode ? [...BASIC_PALETTE, ...ADVANCED_PALETTE] : BASIC_PALETTE,
    [advancedMode]
  )

  const isValid = useMemo(
    () => imageUrl && selectedPalette.length >= 2,
    [imageUrl, selectedPalette.length]
  )

  const toggleColor = useCallback((hex: string) => {
    setSelectedPalette(prev => {
      const isSelected = prev.includes(hex)
      if (isSelected) {
        return prev.length > 2 ? prev.filter(c => c !== hex) : prev
      }
      return [...prev, hex]
    })
  }, [])

  const selectAllColors = useCallback(() => {
    setSelectedPalette(currentPalette.map(c => c.hex))
  }, [currentPalette])

  const deselectAllColors = useCallback(() => {
    setSelectedPalette(DEFAULT_SELECTED_COLORS)
  }, [])

  const generate = useCallback(async () => {
    if (!imageUrl || !canvasRef.current || selectedPalette.length < 2) return

    setIsGenerating(true)

    try {
      const img = await loadImage(imageUrl)
      const { imageData } = createResizedCanvas(img, width, height)
      
      applyAlgorithm(algorithm, imageData.data, width, height, selectedPalette)

      const canvas = canvasRef.current
      canvas.width = width * BLOCK_SIZE
      canvas.height = height * BLOCK_SIZE

      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Failed to get canvas context')

      renderBlocksToCanvas(ctx, imageData.data, width, height)
      setGeneratedUrl(canvasToDataUrl(canvas))
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [imageUrl, width, height, algorithm, selectedPalette])

  const download = useCallback(() => {
    if (!generatedUrl) return
    const timestamp = new Date().toISOString().slice(0, 10)
    downloadDataUrl(generatedUrl, `crochet-${width}x${height}-${timestamp}.png`)
  }, [generatedUrl, width, height])

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
    canvasRef,
    isValid,
    currentPalette,
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
  }
}
