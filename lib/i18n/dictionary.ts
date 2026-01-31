export const dictionaries = {
  en: {
    meta: {
      title: 'CrochetPixel - Transform photos into crochet charts',
      description: 'Convert your images into pixelated crochet charts. Multiple conversion algorithms, customizable color palette.',
    },
    header: {
      title: 'CrochetPixel',
      subtitle: 'Transform your photos into crochet charts',
    },
    steps: {
      chooseImage: '1. Choose your image',
      setSize: '2. Set the size',
      selectColors: '3. Select colors',
      conversionAlgorithm: '4. Conversion algorithm',
    },
    imageUploader: {
      clickOrDrag: 'Click or drag an image',
      supportedFormats: 'PNG, JPG or GIF',
      clickToChange: 'Click to change',
    },
    dimensions: {
      width: 'Width',
      height: 'Height',
      blocks: 'blocks',
    },
    colorPalette: {
      advancedMode: 'Advanced mode',
      colorSelected: 'color selected',
      colorsSelected: 'colors selected',
      selectAll: 'Select all',
      clear: 'Clear',
    },
    algorithms: {
      title: '4. Conversion algorithm',
      description: 'Choose how the image will be converted to pixels',
      simple: {
        name: 'Simple',
        description: 'Direct conversion, no processing. Fastest.',
      },
      simpleEnhanced: {
        name: 'Simple+',
        description: 'Conversion with noise reduction. Cleaner result.',
      },
      kmeansAdvanced: {
        name: 'K-Means Pro',
        description: 'Analyzes dominant colors. More faithful to the image.',
      },
      cartoon: {
        name: 'Cartoon',
        description: 'Simplifies areas, preserves edges. Perfect for crochet!',
      },
      highContrast: {
        name: 'High Contrast',
        description: 'Increases contrast, more vivid colors. Great for patterns.',
      },
      floydSteinberg: {
        name: 'Dithering',
        description: 'Smooth gradients. Experimental, may have noise.',
      },
    },
    generateButton: {
      generate: 'Generate Crochet Chart',
      generating: 'Generating...',
    },
    result: {
      ready: 'Your chart is ready!',
      download: 'Download Chart',
      chartReady: 'Chart ready',
    },
  },
  pt: {
    meta: {
      title: 'CrochetPixel - Transforme fotos em gráficos de crochê',
      description: 'Converta suas imagens em gráficos pixelados para crochê e pixel art. Múltiplos algoritmos de conversão, paleta de cores personalizável.',
    },
    header: {
      title: 'CrochetPixel',
      subtitle: 'Transforme suas fotos em gráficos de crochê',
    },
    steps: {
      chooseImage: '1. Escolha sua imagem',
      setSize: '2. Defina o tamanho',
      selectColors: '3. Selecione as cores',
      conversionAlgorithm: '4. Algoritmo de conversão',
    },
    imageUploader: {
      clickOrDrag: 'Clique ou arraste uma imagem',
      supportedFormats: 'PNG, JPG ou GIF',
      clickToChange: 'Clique para mudar',
    },
    dimensions: {
      width: 'Largura',
      height: 'Altura',
      blocks: 'blocos',
    },
    colorPalette: {
      advancedMode: 'Modo avançado',
      colorSelected: 'cor selecionada',
      colorsSelected: 'cores selecionadas',
      selectAll: 'Selecionar todas',
      clear: 'Limpar',
    },
    algorithms: {
      title: '4. Algoritmo de conversão',
      description: 'Escolha como a imagem será convertida em pixels',
      simple: {
        name: 'Simples',
        description: 'Conversão direta, sem processamento. Mais rápido.',
      },
      simpleEnhanced: {
        name: 'Simples+',
        description: 'Conversão com redução de ruído. Resultado mais limpo.',
      },
      kmeansAdvanced: {
        name: 'K-Means Pro',
        description: 'Analisa cores dominantes. Resultado mais fiel à imagem.',
      },
      cartoon: {
        name: 'Cartoon',
        description: 'Simplifica áreas, preserva bordas. Perfeito para crochê!',
      },
      highContrast: {
        name: 'Alto Contraste',
        description: 'Aumenta contraste, cores mais vivas. Ótimo para padrões.',
      },
      floydSteinberg: {
        name: 'Dithering',
        description: 'Gradientes suaves. Experimental, pode ter ruído.',
      },
    },
    generateButton: {
      generate: 'Gerar Gráfico de Crochê',
      generating: 'Gerando...',
    },
    result: {
      ready: 'Seu gráfico está pronto!',
      download: 'Baixar Gráfico',
      chartReady: 'Gráfico pronto',
    },
  },
} as const

export type Dictionary = typeof dictionaries.en
export type Locale = keyof typeof dictionaries
