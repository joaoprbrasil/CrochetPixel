'use client'

import { useCrochetGenerator } from '@/hooks/use-crochet-generator'
import { useLanguage } from '@/lib/i18n'
import { Card } from './card'
import { ImageUploader } from './image-uploader'
import { DimensionInputs } from './dimension-inputs'
import { ColorPalette } from './color-palette'
import { AlgorithmSelector } from './algorithm-selector'
import { GenerateButton } from './generate-button'
import { ResultDisplay } from './result-display'

export function CrochetGenerator() {
  const { dict } = useLanguage()
  const {
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
    setAdvancedMode,
    toggleColor,
    selectAllColors,
    deselectAllColors,
    generate,
    download,
  } = useCrochetGenerator()

  return (
    <main className="flex flex-col gap-6">
      <Card title={dict.steps.chooseImage}>
        <ImageUploader imageUrl={imageUrl} onImageChange={setImageUrl} />
      </Card>

      <Card title={dict.steps.setSize}>
        <DimensionInputs
          width={width}
          height={height}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
        />
      </Card>

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

      <Card>
        <AlgorithmSelector selected={algorithm} onSelect={setAlgorithm} />
      </Card>

      <GenerateButton
        onClick={generate}
        disabled={!isValid}
        isGenerating={isGenerating}
      />

      {generatedUrl && (
        <ResultDisplay
          imageUrl={generatedUrl}
          width={width}
          height={height}
          onDownload={download}
        />
      )}

      <canvas ref={canvasRef} className="hidden" />
    </main>
  )
}
