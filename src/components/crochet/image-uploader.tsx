'use client';

import React from "react"

import { useCallback, useRef } from 'react';
import { Card } from './card';

interface ImageUploaderProps {
  image: string | null;
  onImageChange: (image: string | null) => void;
}

export function ImageUploader({ image, onImageChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        onImageChange(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onImageChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file?.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        onImageChange(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onImageChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <Card title="1. Escolha uma imagem">
      <div
        className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-rose-300 transition-colors"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image ? (
          <div className="space-y-4">
            <img
              src={image || "/placeholder.svg"}
              alt="Imagem selecionada"
              className="max-h-48 mx-auto rounded-lg object-contain"
            />
            <p className="text-sm text-gray-500">Clique para trocar a imagem</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl">📷</div>
            <p className="text-gray-600">
              Arraste uma imagem ou clique para selecionar
            </p>
            <p className="text-sm text-gray-400">PNG, JPG ou WEBP</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </Card>
  );
}
