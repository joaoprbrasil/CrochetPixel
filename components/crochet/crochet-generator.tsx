'use client';

import { useCrochetGenerator } from '@/hooks/use-crochet-generator';
import {
  ImageUploader,
  DimensionInputs,
  ColorPalette,
  AlgorithmSelector,
  GenerateButton,
  ResultDisplay,
  Card,
} from '@/components/crochet';

/**
 * Main crochet pattern generator component
 * Orchestrates all sub-components and manages state through hook
 */
export function CrochetGenerator() {
  const {
    imageUrl,
    width,
    height,
    selectedPalette,
    advancedMode,
    algorithm,
    isGenerating,
    generatedUrl,
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
    canvasRef,
    isValid,
    currentPalette,
  } = useCrochetGenerator();

  return (
    <main className="flex flex-col gap-6">
      {/* Image Upload */}
      <Card title="1. Escolha sua imagem">
        <ImageUploader imageUrl={imageUrl} onImageChange={setImageUrl} />
      </Card>

      {/* Dimensions */}
      <Card title="2. Defina o tamanho">
        <DimensionInputs
          width={width}
          height={height}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
        />
      </Card>

      {/* Color Palette */}
      <Card>
        <ColorPalette
          colors={currentPalette}
          selectedColors={selectedPalette}
          advancedMode={advancedMode}
          onToggleColor={toggleColor}
          onSelectAll={selectAllColors}
          onDeselectAll={deselectAllColors}
          onToggleAdvanced={setAdvancedMode}
        />
      </Card>

      {/* Algorithm Selection */}
      <Card>
        <AlgorithmSelector selected={algorithm} onSelect={setAlgorithm} />
      </Card>

      {/* Generate Button */}
      <GenerateButton
        onClick={generate}
        disabled={!isValid}
        isGenerating={isGenerating}
      />

      {/* Result */}
      {generatedUrl && (
        <ResultDisplay
          imageUrl={generatedUrl}
          width={width}
          height={height}
          onDownload={download}
        />
      )}

      {/* Hidden canvas for generation */}
      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}
