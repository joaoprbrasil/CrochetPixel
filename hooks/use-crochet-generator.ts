'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import type { ConversionAlgorithm } from '@/lib/types'
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_ALGORITHM,
  BASIC_COLORS,
  ADVANCED_COLORS,
} from '@/lib/constants'
import { loadImageData, createCrochetChart, downloadCanvas } from '@/lib/utils/canvas'
import { processImage } from '@/lib/algorithms'

export function useCrochetGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [selectedPalette, setSelectedPalette] = useState<string[]>(
    BASIC_COLORS.map(c => c.hex)
  )
  const [algorithm, setAlgorithm] = useState<ConversionAlgorithm>(DEFAULT_ALGORITHM)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const currentPalette = useMemo(() => 
    advancedMode ? ADVANCED_COLORS : BASIC_COLORS,
    [advancedMode]
  )
  
  const isValid = useMemo(() => 
    imageUrl !== null && selectedPalette.length > 0 && width > 0 && height > 0,
    [imageUrl, selectedPalette, width, height]
  )
  
  const toggleColor = useCallback((hex: string) => {
    setSelectedPalette(prev => 
      prev.includes(hex) 
        ? prev.filter(c => c !== hex)
        : [...prev, hex]
    )
  }, [])
  
  const selectAllColors = useCallback(() => {
    setSelectedPalette(currentPalette.map(c => c.hex))
  }, [currentPalette])
  
  const deselectAllColors = useCallback(() => {
    setSelectedPalette([])
  }, [])
  
  const handleAdvancedToggle = useCallback((enabled: boolean) => {
    setAdvancedMode(enabled)
    // Reset selection when switching modes
    const newPalette = enabled ? ADVANCED_COLORS : BASIC_COLORS
    setSelectedPalette(newPalette.map(c => c.hex))
  }, [])
  
  const generate = useCallback(async () => {
    if (!imageUrl || !canvasRef.current || selectedPalette.length === 0) return
    
    setIsGenerating(true)
    
    try {
      // Load and resize image
      const imageData = await loadImageData(imageUrl, width, height)
      
      // Process with selected algorithm
      const processed = processImage(imageData, algorithm, selectedPalette)
      
      // Draw to canvas
      createCrochetChart(canvasRef.current, processed, selectedPalette)
      
      // Generate preview URL
      setGeneratedUrl(canvasRef.current.toDataURL('image/png'))
    } catch (error) {
      console.error('Error generating chart:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [imageUrl, width, height, algorithm, selectedPalette])
  
  const download = useCallback(() => {
    if (!canvasRef.current) return
    downloadCanvas(canvasRef.current, `crochet-chart-${width}x${height}.png`)
  }, [width, height])
  
  return {
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
    setImageUrl,
    setWidth,
    setHeight,
    setAlgorithm,
    setAdvancedMode: handleAdvancedToggle,
    toggleColor,
    selectAllColors,
    deselectAllColors,
    generate,
    download,
  }
}
