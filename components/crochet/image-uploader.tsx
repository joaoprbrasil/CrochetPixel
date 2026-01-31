'use client'

import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n'

interface ImageUploaderProps {
  imageUrl: string | null
  onImageChange: (url: string | null) => void
}

export function ImageUploader({ imageUrl, onImageChange }: ImageUploaderProps) {
  const { dict } = useLanguage()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      onImageChange(URL.createObjectURL(file))
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0])
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
  }

  return (
    <div
      className={cn(
        'relative cursor-pointer rounded-2xl border-3 border-dashed p-10 text-center transition-all duration-300',
        'border-pink-300 bg-pink-50',
        isDragging && 'scale-[1.02] border-pink-500 bg-pink-100'
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      {imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Preview"
            className="mx-auto block max-h-[400px] max-w-full rounded-xl object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60 opacity-0 transition-opacity hover:opacity-100">
            <span className="text-lg font-semibold text-white">{dict.imageUploader.clickToChange}</span>
          </div>
        </div>
      ) : (
        <div className="py-5">
          <span className="mb-4 block text-6xl">📷</span>
          <p className="mb-2 text-xl font-semibold text-pink-700">
            {dict.imageUploader.clickOrDrag}
          </p>
          <p className="text-sm text-muted-foreground">{dict.imageUploader.supportedFormats}</p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
