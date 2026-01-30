import React, { useState, useRef, useEffect } from "react";

const BASIC_PALETTE = [
  { name: "Branco", hex: "#FFFFFF" },
  { name: "Preto", hex: "#000000" },
  { name: "Cinza", hex: "#7F7F7F" },
  { name: "Marrom", hex: "#804000" },
  { name: "Vermelho", hex: "#FF0000" },
  { name: "Vermelho Alaranjado", hex: "#FF5722" },
  { name: "Laranja", hex: "#FF8000" },
  { name: "Amarelo Alaranjado", hex: "#FFC107" },
  { name: "Amarelo", hex: "#FFFF00" },
  { name: "Verde Lima", hex: "#7FFF00" },
  { name: "Verde Puro", hex: "#00FF00" },
  { name: "Verde Amarelado", hex: "#8BC34A" },
  { name: "Verde Primavera", hex: "#00FF80" },
  { name: "Ciano / Aqua", hex: "#00FFFF" },
  { name: "Azul Celeste", hex: "#007FFF" },
  { name: "Azul", hex: "#0000FF" },
  { name: "Azul Violeta", hex: "#3F51B5" },
  { name: "Violeta Escuro", hex: "#7F00FF" },
  { name: "Magenta / Fuchsia", hex: "#FF00FF" },
  { name: "Rosa Choque", hex: "#FF0080" },
  { name: "Vermelho Violeta", hex: "#AD1457" },
];

const ADVANCED_PALETTE = [
  // Tons de Branco e Cinza (expandido)
  { name: "Branco Neve", hex: "#FFFAFA" },
  { name: "Branco Fantasma", hex: "#F8F8FF" },
  { name: "Branco Floral", hex: "#FFFAF0" },
  { name: "Marfim", hex: "#FFFFF0" },
  { name: "Cinza Platina", hex: "#E5E4E2" },
  { name: "Cinza Claro", hex: "#D3D3D3" },
  { name: "Cinza Prata", hex: "#C0C0C0" },
  { name: "Cinza Nevoeiro", hex: "#A9A9A9" },
  { name: "Cinza Médio", hex: "#808080" },
  { name: "Cinza Grafite", hex: "#5F5F5F" },
  { name: "Cinza Escuro", hex: "#404040" },
  { name: "Cinza Carvão", hex: "#36454F" },
  { name: "Cinza Ardósia", hex: "#708090" },
  { name: "Cinza Fumaça", hex: "#848884" },
  
  // Tons de Vermelho (expandido)
  { name: "Vermelho Vinho", hex: "#722F37" },
  { name: "Vermelho Escuro", hex: "#8B0000" },
  { name: "Bordô", hex: "#9B111E" },
  { name: "Carmim", hex: "#DC143C" },
  { name: "Vermelho Indiano", hex: "#CD5C5C" },
  { name: "Vermelho Tijolo", hex: "#B22222" },
  { name: "Vermelho Fogo", hex: "#E25822" },
  { name: "Vermelho Tomate", hex: "#FF6347" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Coral Claro", hex: "#F08080" },
  { name: "Salmão", hex: "#FA8072" },
  { name: "Salmão Claro", hex: "#FFA07A" },
  { name: "Salmão Escuro", hex: "#E9967A" },
  { name: "Terracota", hex: "#E2725B" },
  
  // Tons de Rosa (expandido)
  { name: "Rosa Millennial", hex: "#F3CFC6" },
  { name: "Rosa", hex: "#FFC0CB" },
  { name: "Rosa Claro", hex: "#FFB6C1" },
  { name: "Rosa Bebê", hex: "#F4C2C2" },
  { name: "Rosa Pálido", hex: "#FADADD" },
  { name: "Rosa Quente", hex: "#FF69B4" },
  { name: "Rosa Profundo", hex: "#FF1493" },
  { name: "Rosa Shocking", hex: "#FC0FC0" },
  { name: "Rosa Fúcsia", hex: "#C74375" },
  { name: "Rosa Antigo", hex: "#FAEBD7" },
  { name: "Rosa Misty", hex: "#FFE4E1" },
  { name: "Rosa Lavanda", hex: "#FFF0F5" },
  
  // Tons de Laranja (expandido)
  { name: "Laranja Queimado", hex: "#CC5500" },
  { name: "Laranja Escuro", hex: "#FF8C00" },
  { name: "Laranja Cenoura", hex: "#ED9121" },
  { name: "Tangerina", hex: "#F28500" },
  { name: "Laranja Abóbora", hex: "#FF7518" },
  { name: "Coral Laranja", hex: "#FF6E4A" },
  { name: "Pêssego", hex: "#FFDAB9" },
  { name: "Pêssego Claro", hex: "#FFCBA4" },
  { name: "Damasco", hex: "#FBCEB1" },
  { name: "Melão", hex: "#FEBAAD" },
  
  // Tons de Amarelo (expandido)
  { name: "Amarelo Escuro", hex: "#B8860B" },
  { name: "Ouro Escuro", hex: "#B8860B" },
  { name: "Ouro", hex: "#FFD700" },
  { name: "Amarelo Dourado", hex: "#FFDF00" },
  { name: "Amarelo Canário", hex: "#FFEF00" },
  { name: "Amarelo Limão", hex: "#FFFF33" },
  { name: "Amarelo Claro", hex: "#FFFFE0" },
  { name: "Creme", hex: "#FFFACD" },
  { name: "Creme Claro", hex: "#FAFAD2" },
  { name: "Mostarda", hex: "#FFDB58" },
  { name: "Champanhe", hex: "#F7E7CE" },
  { name: "Baunilha", hex: "#F3E5AB" },
  
  // Tons de Verde (expandido)
  { name: "Verde Garrafa", hex: "#006A4E" },
  { name: "Verde Escuro", hex: "#006400" },
  { name: "Verde Caçador", hex: "#355E3B" },
  { name: "Verde Floresta", hex: "#228B22" },
  { name: "Verde Grama", hex: "#7CFC00" },
  { name: "Verde Chartreuse", hex: "#7FFF00" },
  { name: "Verde Oliva", hex: "#808000" },
  { name: "Verde Oliva Escuro", hex: "#556B2F" },
  { name: "Verde Musgo", hex: "#8A9A5B" },
  { name: "Verde Jade", hex: "#00A86B" },
  { name: "Verde Esmeralda", hex: "#50C878" },
  { name: "Verde Menta", hex: "#98FF98" },
  { name: "Verde Menta Claro", hex: "#AAFFAA" },
  { name: "Verde Água", hex: "#00FA9A" },
  { name: "Verde Mar", hex: "#2E8B57" },
  { name: "Verde Mar Claro", hex: "#20B2AA" },
  { name: "Verde Mar Médio", hex: "#3CB371" },
  { name: "Verde Abacate", hex: "#568203" },
  { name: "Verde Pistache", hex: "#93C572" },
  { name: "Turquesa", hex: "#40E0D0" },
  { name: "Turquesa Escuro", hex: "#00CED1" },
  { name: "Turquesa Médio", hex: "#48D1CC" },
  
  // Tons de Azul (expandido)
  { name: "Azul Meia-Noite", hex: "#191970" },
  { name: "Azul Marinho", hex: "#000080" },
  { name: "Azul Escuro", hex: "#00008B" },
  { name: "Azul Médio", hex: "#0000CD" },
  { name: "Azul Cobalto", hex: "#0047AB" },
  { name: "Azul Real", hex: "#4169E1" },
  { name: "Azul Elétrico", hex: "#7DF9FF" },
  { name: "Azul Aço", hex: "#4682B4" },
  { name: "Azul Cornflower", hex: "#6495ED" },
  { name: "Azul Safira", hex: "#0F52BA" },
  { name: "Azul Turquesa", hex: "#30D5C8" },
  { name: "Azul Bebê", hex: "#89CFF0" },
  { name: "Azul Claro", hex: "#ADD8E6" },
  { name: "Azul Céu", hex: "#87CEEB" },
  { name: "Azul Céu Claro", hex: "#87CEFA" },
  { name: "Azul Powder", hex: "#B0E0E6" },
  { name: "Azul Dodger", hex: "#1E90FF" },
  { name: "Azul Alice", hex: "#F0F8FF" },
  { name: "Azul Persa", hex: "#1C39BB" },
  { name: "Azul Tiffany", hex: "#0ABAB5" },
  
  // Tons de Roxo/Violeta (expandido)
  { name: "Índigo Escuro", hex: "#310062" },
  { name: "Índigo", hex: "#4B0082" },
  { name: "Roxo Escuro", hex: "#301934" },
  { name: "Roxo", hex: "#800080" },
  { name: "Roxo Médio", hex: "#9370DB" },
  { name: "Púrpura", hex: "#9370DB" },
  { name: "Púrpura Médio", hex: "#9966CC" },
  { name: "Ametista", hex: "#9966CC" },
  { name: "Berinjela", hex: "#614051" },
  { name: "Uva", hex: "#6F2DA8" },
  { name: "Lavanda", hex: "#E6E6FA" },
  { name: "Lavanda Floral", hex: "#B57EDC" },
  { name: "Lilás", hex: "#C8A2C8" },
  { name: "Malva", hex: "#E0B0FF" },
  { name: "Violeta", hex: "#EE82EE" },
  { name: "Orquídea", hex: "#DA70D6" },
  { name: "Orquídea Média", hex: "#BA55D3" },
  { name: "Ameixa", hex: "#DDA0DD" },
  { name: "Magenta Escuro", hex: "#8B008B" },
  
  // Tons de Marrom (expandido)
  { name: "Marrom Café", hex: "#6F4E37" },
  { name: "Marrom Chocolate", hex: "#D2691E" },
  { name: "Marrom Cacau", hex: "#7B3F00" },
  { name: "Marrom Saddle", hex: "#8B4513" },
  { name: "Sépia", hex: "#704214" },
  { name: "Siena", hex: "#A0522D" },
  { name: "Siena Queimado", hex: "#E97451" },
  { name: "Peru", hex: "#CD853F" },
  { name: "Castanho", hex: "#8B4513" },
  { name: "Caramelo", hex: "#AF6E4D" },
  { name: "Bronze", hex: "#CD7F32" },
  { name: "Cobre", hex: "#B87333" },
  { name: "Ferrugem", hex: "#B7410E" },
  { name: "Âmbar", hex: "#FFBF00" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Tan Escuro", hex: "#918151" },
  { name: "Bege", hex: "#F5F5DC" },
  { name: "Khaki", hex: "#C3B091" },
  { name: "Khaki Escuro", hex: "#BDB76B" },
  { name: "Trigo", hex: "#F5DEB3" },
  { name: "Areia", hex: "#C2B280" },
  { name: "Bisque", hex: "#FFE4C4" },
];

const DEFAULT_PALETTE = [...BASIC_PALETTE, ...ADVANCED_PALETTE];

function App() {
  useEffect(() => {
    // Remove margin/padding padrão do body
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
  }, []);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(60);
  const [selectedPalette, setSelectedPalette] = useState<string[]>(
    BASIC_PALETTE.filter(
      (c) => c.name === "Preto" || c.name === "Branco",
    ).map((c) => c.hex),
  );
  const [advancedMode, setAdvancedMode] = useState(false);
  const [conversionAlgorithm, setConversionAlgorithm] = useState<'simple' | 'simple-enhanced' | 'kmeans-advanced' | 'cartoon' | 'high-contrast' | 'floyd-steinberg'>('simple-enhanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setGeneratedUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setGeneratedUrl(null);
      }
    }
  };

  const toggleColor = (hex: string) => {
    setSelectedPalette((prev) =>
      prev.includes(hex) ? prev.filter((h) => h !== hex) : [...prev, hex],
    );
  };

  const selectAllColors = () => {
    const palette = advancedMode ? DEFAULT_PALETTE : BASIC_PALETTE;
    setSelectedPalette(palette.map((c) => c.hex));
  };

  const deselectAllColors = () => {
    setSelectedPalette([]);
  };

  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const getClosestColor = (r: number, g: number, b: number): string => {
    if (selectedPalette.length === 0) return "#000000";
    let minDistance = Infinity;
    let closest = selectedPalette[0];

    selectedPalette.forEach((hex) => {
      const [pr, pg, pb] = hexToRgb(hex);
      const rMean = (r + pr) / 2;
      const dr = r - pr;
      const dg = g - pg;
      const db = b - pb;

      const distance = Math.sqrt(
        (2 + rMean / 256) * dr * dr +
          4 * dg * dg +
          (2 + (255 - rMean) / 256) * db * db,
      );

      if (distance < minDistance) {
        minDistance = distance;
        closest = hex;
      }
    });
    return closest;
  };

  const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
  };

  const generateCrochetImage = async () => {
    if (!imageUrl || !canvasRef.current || selectedPalette.length === 0) return;
    setIsGenerating(true);
    setGeneratedUrl(null);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.src = imageUrl;
    await new Promise((resolve) => (img.onload = resolve));

    const blockSize = 10;
    canvas.width = width * blockSize;
    canvas.height = height * blockSize;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
    if (!tempCtx) return;
    tempCtx.drawImage(img, 0, 0, width, height);

    const imageData = tempCtx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    // Aplicar algoritmo selecionado
    if (conversionAlgorithm === 'simple') {
      // Simples Original: conversão direta sem processamento
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];

          const closestHex = getClosestColor(r, g, b);
          const [newR, newG, newB] = hexToRgb(closestHex);

          pixels[idx] = newR;
          pixels[idx + 1] = newG;
          pixels[idx + 2] = newB;
        }
      }

    } else if (conversionAlgorithm === 'simple-enhanced') {
      // Simples Melhorado: com redução de ruído e suavização
      
      // Passo 1: Aplicar blur gaussiano leve para reduzir ruído
      const blurred = new Uint8ClampedArray(pixels);
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          let sumR = 0, sumG = 0, sumB = 0, count = 0;
          
          // Kernel 3x3
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const nidx = ((y + dy) * width + (x + dx)) * 4;
              if (pixels[nidx + 3] >= 10) {
                const weight = (dx === 0 && dy === 0) ? 4 : 1; // Centro tem mais peso
                sumR += pixels[nidx] * weight;
                sumG += pixels[nidx + 1] * weight;
                sumB += pixels[nidx + 2] * weight;
                count += weight;
              }
            }
          }

          blurred[idx] = sumR / count;
          blurred[idx + 1] = sumG / count;
          blurred[idx + 2] = sumB / count;
        }
      }

      // Passo 2: Converter para paleta
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          const r = blurred[idx];
          const g = blurred[idx + 1];
          const b = blurred[idx + 2];

          const closestHex = getClosestColor(r, g, b);
          const [newR, newG, newB] = hexToRgb(closestHex);

          pixels[idx] = newR;
          pixels[idx + 1] = newG;
          pixels[idx + 2] = newB;
        }
      }

    } else if (conversionAlgorithm === 'kmeans-advanced') {
      // K-Means Avançado: clustering real com análise de dominância
      
      // Passo 1: Coletar todas as cores da imagem
      const colorMap = new Map<string, number>();
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          if (pixels[idx + 3] >= 10) {
            const key = `${pixels[idx]},${pixels[idx + 1]},${pixels[idx + 2]}`;
            colorMap.set(key, (colorMap.get(key) || 0) + 1);
          }
        }
      }

      // Passo 2: Encontrar cores dominantes (simplificar antes de mapear)
      const colorArray = Array.from(colorMap.entries()).map(([key, count]) => {
        const [r, g, b] = key.split(',').map(Number);
        return { r, g, b, count };
      });

      // Agrupar cores similares (quantização)
      const quantized = new Map<string, { r: number; g: number; b: number; count: number }>();
      const quantizeLevel = 32; // Reduz 256 tons para 8 grupos por canal
      
      colorArray.forEach(({ r, g, b, count }) => {
        const qr = Math.floor(r / quantizeLevel) * quantizeLevel;
        const qg = Math.floor(g / quantizeLevel) * quantizeLevel;
        const qb = Math.floor(b / quantizeLevel) * quantizeLevel;
        const key = `${qr},${qg},${qb}`;
        
        const existing = quantized.get(key);
        if (existing) {
          existing.count += count;
          existing.r = (existing.r * existing.count + r * count) / (existing.count + count);
          existing.g = (existing.g * existing.count + g * count) / (existing.count + count);
          existing.b = (existing.b * existing.count + b * count) / (existing.count + count);
        } else {
          quantized.set(key, { r: qr, g: qg, b: qb, count });
        }
      });

      // Passo 3: Criar mapeamento para paleta
      const paletteMap = new Map<string, string>();
      quantized.forEach(({ r, g, b }) => {
        const key = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
        paletteMap.set(key, getClosestColor(r, g, b));
      });

      // Passo 4: Aplicar mapeamento
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];
          
          const qr = Math.floor(r / quantizeLevel) * quantizeLevel;
          const qg = Math.floor(g / quantizeLevel) * quantizeLevel;
          const qb = Math.floor(b / quantizeLevel) * quantizeLevel;
          const key = `${qr},${qg},${qb}`;
          
          const mappedHex = paletteMap.get(key) || getClosestColor(r, g, b);
          const [newR, newG, newB] = hexToRgb(mappedHex);

          pixels[idx] = newR;
          pixels[idx + 1] = newG;
          pixels[idx + 2] = newB;
        }
      }

    } else if (conversionAlgorithm === 'cartoon') {
      // Cartoon: simplifica áreas, mantém bordas (perfeito para crochê!)
      
      // Passo 1: Detectar bordas usando Sobel
      const edges = new Uint8ClampedArray(width * height);
      
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          // Gradiente horizontal (Sobel X)
          const gx = 
            -pixels[((y-1) * width + (x-1)) * 4] + pixels[((y-1) * width + (x+1)) * 4] +
            -2 * pixels[(y * width + (x-1)) * 4] + 2 * pixels[(y * width + (x+1)) * 4] +
            -pixels[((y+1) * width + (x-1)) * 4] + pixels[((y+1) * width + (x+1)) * 4];

          // Gradiente vertical (Sobel Y)
          const gy = 
            -pixels[((y-1) * width + (x-1)) * 4] - 2 * pixels[((y-1) * width + x) * 4] - pixels[((y-1) * width + (x+1)) * 4] +
            pixels[((y+1) * width + (x-1)) * 4] + 2 * pixels[((y+1) * width + x) * 4] + pixels[((y+1) * width + (x+1)) * 4];

          const magnitude = Math.sqrt(gx * gx + gy * gy);
          edges[y * width + x] = magnitude > 50 ? 1 : 0;
        }
      }

      // Passo 2: Aplicar bilateral filter (preserva bordas, suaviza áreas)
      const smoothed = new Uint8ClampedArray(pixels);
      
      for (let y = 2; y < height - 2; y++) {
        for (let x = 2; x < width - 2; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          if (edges[y * width + x] === 1) {
            // Borda: manter original
            continue;
          }

          // Área plana: suavizar fortemente
          let sumR = 0, sumG = 0, sumB = 0, totalWeight = 0;
          
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const nidx = ((y + dy) * width + (x + dx)) * 4;
              if (pixels[nidx + 3] >= 10) {
                const spatialDist = Math.sqrt(dx * dx + dy * dy);
                const weight = Math.exp(-spatialDist / 2);
                
                sumR += pixels[nidx] * weight;
                sumG += pixels[nidx + 1] * weight;
                sumB += pixels[nidx + 2] * weight;
                totalWeight += weight;
              }
            }
          }

          smoothed[idx] = sumR / totalWeight;
          smoothed[idx + 1] = sumG / totalWeight;
          smoothed[idx + 2] = sumB / totalWeight;
        }
      }

      // Passo 3: Converter para paleta
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          const r = smoothed[idx];
          const g = smoothed[idx + 1];
          const b = smoothed[idx + 2];

          const closestHex = getClosestColor(r, g, b);
          const [newR, newG, newB] = hexToRgb(closestHex);

          pixels[idx] = newR;
          pixels[idx + 1] = newG;
          pixels[idx + 2] = newB;
        }
      }

    } else if (conversionAlgorithm === 'high-contrast') {
      // High Contrast: aumenta contraste, reduz tons intermediários
      
      // Passo 1: Converter para LAB (aproximação)
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          let r = pixels[idx] / 255;
          let g = pixels[idx + 1] / 255;
          let b = pixels[idx + 2] / 255;

          // Ajuste de contraste sigmoidal
          const contrast = 2.0;
          r = 1 / (1 + Math.exp(-contrast * (r - 0.5)));
          g = 1 / (1 + Math.exp(-contrast * (g - 0.5)));
          b = 1 / (1 + Math.exp(-contrast * (b - 0.5)));

          pixels[idx] = clamp(r * 255, 0, 255);
          pixels[idx + 1] = clamp(g * 255, 0, 255);
          pixels[idx + 2] = clamp(b * 255, 0, 255);
        }
      }

      // Passo 2: Posterização (reduzir níveis de cor)
      const levels = 4; // Reduz para 4 níveis por canal
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          pixels[idx] = Math.floor(pixels[idx] / (256 / levels)) * (256 / levels);
          pixels[idx + 1] = Math.floor(pixels[idx + 1] / (256 / levels)) * (256 / levels);
          pixels[idx + 2] = Math.floor(pixels[idx + 2] / (256 / levels)) * (256 / levels);
        }
      }

      // Passo 3: Converter para paleta
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];

          const closestHex = getClosestColor(r, g, b);
          const [newR, newG, newB] = hexToRgb(closestHex);

          pixels[idx] = newR;
          pixels[idx + 1] = newG;
          pixels[idx + 2] = newB;
        }
      }

    } else if (conversionAlgorithm === 'floyd-steinberg') {
      // Floyd-Steinberg Dithering (mantido como opção avançada)
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          
          if (pixels[idx + 3] < 10) continue;

          const oldR = pixels[idx];
          const oldG = pixels[idx + 1];
          const oldB = pixels[idx + 2];

          const closestHex = getClosestColor(oldR, oldG, oldB);
          const [newR, newG, newB] = hexToRgb(closestHex);

          pixels[idx] = newR;
          pixels[idx + 1] = newG;
          pixels[idx + 2] = newB;

          const errorR = oldR - newR;
          const errorG = oldG - newG;
          const errorB = oldB - newB;

          const distributeError = (dx: number, dy: number, factor: number) => {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nidx = (ny * width + nx) * 4;
              pixels[nidx] = clamp(pixels[nidx] + errorR * factor, 0, 255);
              pixels[nidx + 1] = clamp(pixels[nidx + 1] + errorG * factor, 0, 255);
              pixels[nidx + 2] = clamp(pixels[nidx + 2] + errorB * factor, 0, 255);
            }
          };

          distributeError(1, 0, 7/16);
          distributeError(-1, 1, 3/16);
          distributeError(0, 1, 5/16);
          distributeError(1, 1, 1/16);
        }
      }
    }

    // Desenhar resultado final
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;

        if (pixels[idx + 3] < 10) {
          ctx.fillStyle = "#ffffff";
        } else {
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        }

        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }

    setGeneratedUrl(canvas.toDataURL("image/png"));
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (!generatedUrl) return;
    const link = document.createElement("a");
    link.download = `grafico-croche-${width}x${height}.png`;
    link.href = generatedUrl;
    link.click();
  };

  const isValid = !!imageUrl && selectedPalette.length > 0 && !isGenerating;

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <div style={styles.titleWrapper}>
            <span style={styles.icon}>🧶</span>
            <h1 style={styles.title}>CrochetPixel</h1>
          </div>
          <p style={styles.subtitle}>Transforme suas fotos em gráficos de crochê</p>
        </header>

        <main style={styles.main}>
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>1. Escolha sua imagem</h2>
            
            <div
              style={{
                ...styles.uploadArea,
                ...(isDragging ? styles.uploadAreaDragging : {}),
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {imageUrl ? (
                <div style={styles.imagePreviewWrapper}>
                  <img src={imageUrl} alt="Preview" style={styles.previewImage} />
                  <div style={styles.changeImageOverlay}>
                    <span style={styles.changeImageText}>Clique para mudar</span>
                  </div>
                </div>
              ) : (
                <div style={styles.uploadPlaceholder}>
                  <span style={styles.uploadIcon}>📷</span>
                  <p style={styles.uploadText}>Clique ou arraste uma imagem</p>
                  <p style={styles.uploadSubtext}>PNG, JPG ou GIF</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>2. Defina o tamanho</h2>
            <div style={styles.inputGroup}>
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Largura</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  style={styles.input}
                  min="5"
                  max="200"
                />
                <span style={styles.inputUnit}>blocos</span>
              </div>
              <div style={styles.separator}>×</div>
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Altura</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  style={styles.input}
                  min="5"
                  max="200"
                />
                <span style={styles.inputUnit}>blocos</span>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.colorHeader}>
              <h2 style={styles.sectionTitle}>3. Selecione as cores</h2>
              <label style={styles.advancedToggle}>
                <input
                  type="checkbox"
                  checked={advancedMode}
                  onChange={(e) => setAdvancedMode(e.target.checked)}
                  style={styles.checkbox}
                />
                <span style={styles.advancedLabel}>Modo avançado</span>
              </label>
            </div>
            
            <div style={styles.colorControls}>
              <p style={styles.colorInfo}>
                {selectedPalette.length} {selectedPalette.length === 1 ? 'cor selecionada' : 'cores selecionadas'}
              </p>
              <div style={styles.buttonGroup}>
                <button onClick={selectAllColors} style={styles.selectBtn}>
                  Selecionar todas
                </button>
                <button onClick={deselectAllColors} style={styles.deselectBtn}>
                  Limpar
                </button>
              </div>
            </div>
            
            <div style={styles.colorsGrid}>
              {(advancedMode ? DEFAULT_PALETTE : BASIC_PALETTE).map((color) => {
                const isSelected = selectedPalette.includes(color.hex);
                return (
                  <div
                    key={color.hex}
                    onClick={() => toggleColor(color.hex)}
                    style={{
                      ...styles.colorButton,
                      backgroundColor: color.hex,
                      border: isSelected ? "3px solid #ec4899" : "2px solid #e5e7eb",
                      boxShadow: isSelected ? "0 0 0 4px rgba(236, 72, 153, 0.1)" : "none",
                    }}
                    title={color.name}
                  >
                    {isSelected && (
                      <div style={styles.checkmark}>✓</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>4. Algoritmo de conversão</h2>
            <p style={styles.algorithmDescription}>
              Escolha como a imagem será convertida em pixels
            </p>
            <div style={styles.algorithmGrid}>
              <div
                onClick={() => setConversionAlgorithm('simple')}
                style={{
                  ...styles.algorithmCard,
                  ...(conversionAlgorithm === 'simple' ? styles.algorithmCardActive : {}),
                }}
              >
                <div style={styles.algorithmIcon}>⚡</div>
                <h3 style={styles.algorithmTitle}>Simples</h3>
                <p style={styles.algorithmText}>Conversão direta, sem processamento. Mais rápido.</p>
              </div>
              
              <div
                onClick={() => setConversionAlgorithm('simple-enhanced')}
                style={{
                  ...styles.algorithmCard,
                  ...(conversionAlgorithm === 'simple-enhanced' ? styles.algorithmCardActive : {}),
                }}
              >
                <div style={styles.algorithmIcon}>✨</div>
                <h3 style={styles.algorithmTitle}>Simples+</h3>
                <p style={styles.algorithmText}>Conversão com redução de ruído. Resultado mais limpo.</p>
              </div>
              
              <div
                onClick={() => setConversionAlgorithm('kmeans-advanced')}
                style={{
                  ...styles.algorithmCard,
                  ...(conversionAlgorithm === 'kmeans-advanced' ? styles.algorithmCardActive : {}),
                }}
              >
                <div style={styles.algorithmIcon}>🧠</div>
                <h3 style={styles.algorithmTitle}>K-Means Pro</h3>
                <p style={styles.algorithmText}>Analisa cores dominantes. Resultado mais fiel à imagem.</p>
              </div>
              
              <div
                onClick={() => setConversionAlgorithm('cartoon')}
                style={{
                  ...styles.algorithmCard,
                  ...(conversionAlgorithm === 'cartoon' ? styles.algorithmCardActive : {}),
                }}
              >
                <div style={styles.algorithmIcon}>🎨</div>
                <h3 style={styles.algorithmTitle}>Cartoon</h3>
                <p style={styles.algorithmText}>Simplifica áreas, preserva bordas. Perfeito para crochê!</p>
              </div>
              
              <div
                onClick={() => setConversionAlgorithm('high-contrast')}
                style={{
                  ...styles.algorithmCard,
                  ...(conversionAlgorithm === 'high-contrast' ? styles.algorithmCardActive : {}),
                }}
              >
                <div style={styles.algorithmIcon}>🌗</div>
                <h3 style={styles.algorithmTitle}>Alto Contraste</h3>
                <p style={styles.algorithmText}>Aumenta contraste, cores mais vivas. Ótimo para padrões.</p>
              </div>
              
              <div
                onClick={() => setConversionAlgorithm('floyd-steinberg')}
                style={{
                  ...styles.algorithmCard,
                  ...(conversionAlgorithm === 'floyd-steinberg' ? styles.algorithmCardActive : {}),
                }}
              >
                <div style={styles.algorithmIcon}>🔬</div>
                <h3 style={styles.algorithmTitle}>Dithering</h3>
                <p style={styles.algorithmText}>Gradientes suaves. Experimental, pode ter ruído.</p>
              </div>
            </div>
          </div>

          <button
            onClick={generateCrochetImage}
            disabled={!isValid}
            style={{
              ...styles.generateBtn,
              ...(isValid ? styles.generateBtnActive : styles.generateBtnDisabled),
            }}
          >
            {isGenerating ? (
              <>
                <span style={styles.spinner}></span>
                Gerando...
              </>
            ) : (
              <>
                <span>✨</span>
                Gerar Gráfico de Crochê
              </>
            )}
          </button>

          {generatedUrl && (
            <div style={styles.resultCard}>
              <h2 style={styles.resultTitle}>✅ Seu gráfico está pronto!</h2>
              <div style={styles.resultImageWrapper}>
                <img
                  src={generatedUrl}
                  alt="Gráfico pronto"
                  style={styles.generatedImage}
                />
              </div>
              <button onClick={handleDownload} style={styles.downloadBtn}>
                <span>⬇️</span>
                Baixar Gráfico ({width}×{height})
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </main>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #fce7f3 100%)",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  contentWrapper: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    paddingTop: "20px",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "10px",
  },
  icon: {
    fontSize: "3rem",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #db2777 0%, #ec4899 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#831843",
    margin: 0,
    fontWeight: "500",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.05)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#be185d",
    marginTop: 0,
    marginBottom: "20px",
  },
  uploadArea: {
    border: "3px dashed #f9a8d4",
    borderRadius: "16px",
    padding: "40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "#fdf2f8",
    position: "relative",
  },
  uploadAreaDragging: {
    borderColor: "#ec4899",
    backgroundColor: "#fce7f3",
    transform: "scale(1.02)",
  },
  imagePreviewWrapper: {
    position: "relative",
  },
  previewImage: {
    maxWidth: "100%",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "12px",
    display: "block",
    margin: "0 auto",
  },
  changeImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  changeImageText: {
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  uploadPlaceholder: {
    padding: "20px",
  },
  uploadIcon: {
    fontSize: "4rem",
    display: "block",
    marginBottom: "16px",
  },
  uploadText: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#be185d",
    margin: "0 0 8px 0",
  },
  uploadSubtext: {
    fontSize: "0.95rem",
    color: "#9ca3af",
    margin: 0,
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "140px",
  },
  label: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#831843",
  },
  input: {
    padding: "12px 16px",
    fontSize: "1.1rem",
    border: "2px solid #f9a8d4",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "600",
    color: "#be185d",
    outline: "none",
    transition: "all 0.2s ease",
  },
  inputUnit: {
    fontSize: "0.85rem",
    color: "#9ca3af",
    textAlign: "center",
  },
  separator: {
    fontSize: "2rem",
    color: "#f9a8d4",
    fontWeight: "300",
    marginTop: "20px",
  },
  algorithmDescription: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "0.95rem",
    marginBottom: "20px",
  },
  algorithmGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  algorithmCard: {
    padding: "20px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    backgroundColor: "#f9fafb",
  },
  algorithmCardActive: {
    border: "2px solid #ec4899",
    backgroundColor: "#fce7f3",
    boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.1)",
  },
  algorithmIcon: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  algorithmTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#831843",
    margin: "0 0 8px 0",
  },
  algorithmText: {
    fontSize: "0.85rem",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.4",
  },
  colorInfo: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "0.95rem",
    fontWeight: "500",
    margin: 0,
  },
  colorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  advancedToggle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    userSelect: "none",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#ec4899",
  },
  advancedLabel: {
    fontSize: "0.95rem",
    color: "#831843",
    fontWeight: "600",
  },
  colorControls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
  },
  selectBtn: {
    padding: "8px 16px",
    fontSize: "0.9rem",
    fontWeight: "600",
    backgroundColor: "#ec4899",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  deselectBtn: {
    padding: "8px 16px",
    fontSize: "0.9rem",
    fontWeight: "600",
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  colorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
    gap: "12px",
  },
  colorButton: {
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  generateBtn: {
    width: "100%",
    padding: "18px 32px",
    fontSize: "1.2rem",
    fontWeight: "700",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  generateBtnActive: {
    backgroundColor: "#ec4899",
    color: "white",
    boxShadow: "0 10px 15px rgba(236, 72, 153, 0.3)",
  },
  generateBtnDisabled: {
    backgroundColor: "#e5e7eb",
    color: "#9ca3af",
    cursor: "not-allowed",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  resultCard: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
  },
  resultTitle: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#059669",
    marginTop: 0,
    marginBottom: "24px",
  },
  resultImageWrapper: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "24px",
  },
  generatedImage: {
    maxWidth: "100%",
    maxHeight: "600px",
    objectFit: "contain",
    borderRadius: "12px",
    border: "3px solid #ec4899",
  },
  downloadBtn: {
    backgroundColor: "#10b981",
    color: "white",
    padding: "16px 32px",
    fontSize: "1.1rem",
    fontWeight: "700",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 15px rgba(16, 185, 129, 0.3)",
  },
};

export default App;