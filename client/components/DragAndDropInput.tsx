import { useRef, useState } from "react";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  productName?: string;
}

export default function DragAndDropInput({ value, onChange, productName }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (productName) formData.append("name", productName);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error subiendo imagen");
      const data = await res.json();
      const url = data?.path || data?.url || data?.dataUrl;
      if (!url) throw new Error("Respuesta inválida del servidor");
      onChange(url); // puede ser ruta pública (/images/...) o data URL
    } catch (e: any) {
      setError(e.message || "Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-4 ${isDragging ? "bg-gray-100" : "bg-gray-50"}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file && file.type.startsWith("image/")) {
            uploadFile(file);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.type.startsWith("image/")) {
                uploadFile(file);
              }
            }}
          />
          <span className="text-xs text-gray-500">Arrastra o selecciona una imagen (PNG/JPG/WEBP)</span>
        </div>
        {uploading && (
          <p className="text-sm text-gray-600 mt-2">Subiendo imagen...</p>
        )}
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
      </div>
      {/* Vista previa debajo */}
      <div className="mt-3 w-28 h-28 bg-white border rounded-lg overflow-hidden flex items-center justify-center">
        {value ? (
          <img src={value} alt="Vista previa" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-gray-400">Sin imagen</span>
        )}
      </div>
    </div>
  );
}
