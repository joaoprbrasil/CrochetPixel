'use client';

interface GenerateButtonProps {
  onGenerate: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

export function GenerateButton({
  onGenerate,
  isProcessing,
  disabled,
}: GenerateButtonProps) {
  return (
    <button
      onClick={onGenerate}
      disabled={disabled || isProcessing}
      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
        disabled || isProcessing
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
      }`}
    >
      {isProcessing ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Gerando...
        </span>
      ) : (
        'Gerar Grafico'
      )}
    </button>
  );
}
