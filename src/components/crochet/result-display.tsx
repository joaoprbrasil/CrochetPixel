'use client';

import { Card } from './card';

interface ResultDisplayProps {
  result: string | null;
  width: number;
  height: number;
  onDownload: () => void;
}

export function ResultDisplay({
  result,
  width,
  height,
  onDownload,
}: ResultDisplayProps) {
  if (!result) return null;

  return (
    <Card title="Resultado">
      <div className="space-y-4">
        <div className="overflow-auto max-h-[500px] border border-gray-100 rounded-lg p-2 bg-gray-50">
          <img
            src={result || "/placeholder.svg"}
            alt={`Grafico de croche ${width}x${height}`}
            className="max-w-full mx-auto"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {width} x {height} pontos
          </span>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Baixar PNG
          </button>
        </div>
      </div>
    </Card>
  );
}
