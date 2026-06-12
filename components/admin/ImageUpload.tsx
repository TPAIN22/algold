"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  name: string;
  currentImageUrl?: string | null;
}

export function ImageUpload({ name, currentImageUrl }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl ?? null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
      if (inputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(file);
        inputRef.current.files = dt.files;
      }
    }
  };

  const clear = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" name={name} accept="image/*" className="hidden" onChange={handleChange} />
      <input type="hidden" name="existing_image_url" value={currentImageUrl ?? ""} />

      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-border aspect-video bg-muted">
          <Image src={preview} alt="معاينة المنتج" fill className="object-cover" />
          <button
            type="button"
            onClick={clear}
            className="absolute top-2 end-2 w-7 h-7 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragging ? "border-gold bg-gold/5" : "border-border hover:border-gold/50 hover:bg-muted/50"
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <ImageIcon className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-1">أسقطي الصورة هنا أو انقري للرفع</p>
          <p className="text-xs text-muted-foreground/60">PNG, JPG, WEBP حتى 10 ميجابايت</p>
        </div>
      )}

      <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => inputRef.current?.click()}>
        <Upload className="h-4 w-4 me-2" />
        {preview ? "تغيير الصورة" : "رفع صورة"}
      </Button>
    </div>
  );
}
