# Crochet Conversion Algorithms 🧶

This document explains the technical logic behind the image processing algorithms used in CrochetPixel. All processing happens client-side using the HTML5 Canvas API.

## Core Concepts

- **Grid Mapping:** The image is divided into a grid based on the user's selected dimensions (e.g., 50x50 blocks).
- **Color Quantization:** Input pixel colors are mapped to the nearest color in the selected yarn palette (Basic or Advanced) using Euclidean distance in the RGB color space.

## Algorithms Detail

### 1. Simple
**Best for:** Quick previews and simple shapes.
- **Logic:** Resizes the source image directly to the target grid dimensions.
- **Sampling:** Uses the center pixel of each grid block to determine the color.
- **Performance:** O(1) per block. Fastest execution.

### 2. Simple Enhanced
**Best for:** Images with noise or fine textures.
- **Logic:** Applies a box blur filter before downsampling.
- **Sampling:** averages the RGB values of all pixels within a grid block area instead of picking a single pixel.
- **Result:** Smoother color transitions and less aliasing/noise artifacts.

### 3. K-Means Advanced
**Best for:** Reducing the total number of yarn colors needed.
- **Logic:** Uses K-Means clustering to find the $k$ most dominant colors in the source image, then maps those cluster centers to the nearest available yarn colors.
- **Process:**
  1. Sample pixels from the image.
  2. Cluster into $k$ groups (dynamic based on image complexity).
  3. Remap image using only the dominant cluster colors.

### 4. Cartoon
**Best for:** Logos, illustrations, and high-contrast portraits.
- **Logic:** Combines color quantization with edge detection.
- **Process:**
  1. Applies a bilateral filter to smooth colors while preserving edges.
  2. Detects edges using a Sobel operator.
  3. Superimposes dark outlines on top of the quantized color layers.

### 5. High Contrast
**Best for:** Images with poor lighting or washed-out colors.
- **Logic:** Increases saturation and contrast levels in the HSL color space before quantization.
- **Adjustment:** Typically boosts saturation by 1.2x and contrast by 1.1x to make colors "pop" more clearly in yarn form.

### 6. Floyd-Steinberg (Dithering)
**Best for:** Gradients, shadows, and photorealistic results.
- **Logic:** Error diffusion dithering.
- **Process:**
  1. Process pixels left-to-right, top-to-bottom.
  2. Quantize the current pixel to the nearest palette color.
  3. Calculate the "quantization error" (difference between original and new color).
  4. Distribute this error to neighboring pixels (right, bottom-left, bottom, bottom-right) to create the illusion of blended colors.