import React, { useState, useCallback } from 'react';
import { Upload, Image, X } from 'lucide-react';

interface DragAndDropInputProps {
  value: string;
  onChange: (value: string) => void;
  productName: string;
}

export default function DragAndDropInput({ value, onChange, productName }: DragAndDropInputProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // 1. Obtener el nombre del archivo sin extensión
      const fileName = file.name.split('.').slice(0, -1).join('.');
      const fileExtension = file.name.split('.').pop();
      
      // 2. Generar la ruta según la convención: /images/{productName}.{ext}
      // Usamos el nombre del producto para la ruta, limpiando espacios y caracteres especiales
      const cleanProductName = productName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      
      // Si el nombre del producto está vacío, usamos el nombre del archivo
      const finalName = cleanProductName || fileName;

      const newPath = `/images/${finalName}.${fileExtension}`;
      onChange(newPath);
    }
  }, [onChange, productName]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileName = file.name.split('.').slice(0, -1).join('.');
      const fileExtension = file.name.split('.').pop();
      
      const cleanProductName = productName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const finalName = cleanProductName || fileName;

      const newPath = `/images/${finalName}.${fileExtension}`;
      onChange(newPath);
    }
  }, [onChange, productName]);

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <label className="block body-base font-semibold mb-2">Ruta de Imagen</label>
      
      {/* Input de texto para la ruta */}
      <div className="relative mb-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/nombre_producto.jpg"
          className="input-field w-full pr-10"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Área de Drag and Drop */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
          isDragging ? 'border-artra-blue bg-artra-blue/10' : 'border-gray-300 hover:border-artra-blue'
        }`}
        onClick={() => document.getElementById('file-upload-input')?.click()}
      >
        <input
          type="file"
          id="file-upload-input"
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*"
        />
        <Upload className={`w-8 h-8 mb-2 ${isDragging ? 'text-artra-blue' : 'text-gray-500'}`} />
        <p className="text-sm text-center text-gray-600">
          Arrastra y suelta una imagen aquí, o haz click para seleccionar.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          (Simulación: La ruta se generará automáticamente)
        </p>
      </div>
      
      {value && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
          <Image className="w-4 h-4" />
          Ruta generada: <span className="font-mono text-artra-navy">{value}</span>
        </div>
      )}
    </div>
  );
}
