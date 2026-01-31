import { useCrochetGenerator } from '../../hooks/use-crochet-generator';
import { ImageUploader } from './image-uploader';
import { DimensionInputs } from './dimension-inputs';
import { ColorPalette } from './color-palette';
import { AlgorithmSelector } from './algorithm-selector';
import { GenerateButton } from './generate-button';
import { ResultDisplay } from './result-display';

export function CrochetGenerator() {
  const {
    image,
    width,
    height,
    algorithm,
    selectedColors,
    result,
    isProcessing,
    setImage,
    setWidth,
    setHeight,
    setAlgorithm,
    toggleColor,
    selectAllColors,
    deselectAllColors,
    generate,
    download,
  } = useCrochetGenerator();

  const canGenerate = image !== null && selectedColors.length >= 2;

  return (
    <div className="space-y-6">
      <ImageUploader image={image} onImageChange={setImage} />

      <div className="grid md:grid-cols-2 gap-6">
        <DimensionInputs
          width={width}
          height={height}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
        />
        <AlgorithmSelector
          algorithm={algorithm}
          onAlgorithmChange={setAlgorithm}
        />
      </div>

      <ColorPalette
        selectedColors={selectedColors}
        onToggleColor={toggleColor}
        onSelectAll={selectAllColors}
        onDeselectAll={deselectAllColors}
      />

      <GenerateButton
        onGenerate={generate}
        isProcessing={isProcessing}
        disabled={!canGenerate}
      />

      <ResultDisplay
        result={result}
        width={width}
        height={height}
        onDownload={download}
      />
    </div>
  );
}
