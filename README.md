# CrochetPixel 🧶

Transform your photos into crochet charts with multiple conversion algorithms.

## Features

- 6 optimized conversion algorithms
- Expandable color palette (21 basic + 150 advanced)
- Precise dimension control (5-200 blocks)
- High-quality PNG export
- Responsive and intuitive interface

## Technologies

- **Next.js 16** - React Framework
- **TypeScript** - Static typing
- **Tailwind CSS 4** - Styling
- **Canvas API** - Image processing

## Installation

```bash
npm install
npm run dev
```

Access http://localhost:3000

## Project Structure

```
├── app/                 # Next.js Pages
├── components/          # React Components
│   └── crochet/        # Specific components
├── lib/                # Business logic
│   ├── algorithms/     # Conversion algorithms
│   ├── constants/      # Constants and palettes
│   ├── types/          # TypeScript definitions
│   └── utils/          # Utilities
└── hooks/              # Custom React hooks
```

## Algorithms

1. **Simple** - Direct conversion (fastest)
2. **Simple Enhanced** - With noise reduction
3. **K-Means Advanced** - Dominant color analysis
4. **Cartoon** - Cartoon style with edges
5. **High Contrast** - High contrast and saturation
6. **Floyd-Steinberg** - Dithering for gradients

## License

MIT
