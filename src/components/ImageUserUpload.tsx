import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onUpload: (url: string) => void;
}

export function ImageUploadModal({ onClose, onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-sm rounded-2xl p-6 bg-popover text-popover-foreground shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/30 transition"
        >
          <X className="h-5 w-5 text-popover-foreground" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Enviar Imagem</h2>

        {preview ? (
          <div className="mb-4">
            <img
              src={preview}
              alt="Prévia"
              className="w-32 h-32 object-cover rounded-full mx-auto border border-input shadow-md"
            />
          </div>
        ) : (
          <div className="mb-4 text-center text-muted-foreground">
            Nenhuma imagem selecionada.
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded border border-input bg-input text-foreground file:text-sm file:border-0 file:bg-primary file:text-primary-foreground file:px-4 file:py-1.5"
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary text-sm"
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
