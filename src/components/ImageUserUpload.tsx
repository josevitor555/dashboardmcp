'use client';
import * as React from 'react';
import { AlertCircleIcon, ImageUpIcon, XIcon } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';

type ImageUploadModalProps = {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
};

const ImageUploadModal = ({ open, onClose, onUpload }: ImageUploadModalProps) => {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({ accept: 'image/*', maxSize });

  const previewUrl = files[0]?.preview?.trim() || null;

  React.useEffect(() => {
    if (files[0]?.file) {
      onUpload(files[0].file);
    }
  }, [files, onUpload]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h3 className="text-xl font-bold mb-4">Subir imagem do cliente</h3>

        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors cursor-pointer"
        >
          <input {...getInputProps()} className="sr-only" aria-label="Upload file" />

          {previewUrl ? (
            <div className="absolute inset-0">
              <img
                src={previewUrl}
                alt={files[0]?.file?.name || 'Uploaded image'}
                className="size-full object-cover"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div className="bg-background mb-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border">
                <ImageUpIcon className="h-4 w-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">Drop your image here or click to browse</p>
              <p className="text-muted-foreground text-xs">Max size: {maxSizeMB}MB</p>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              onClick={() => removeFile(files[0]?.id)}
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              aria-label="Remove image"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        {errors.length > 0 && (
          <div className="text-destructive flex items-center gap-1 text-xs mt-2" role="alert">
            <AlertCircleIcon className="h-3 w-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}

        <p className="text-muted-foreground mt-2 text-center text-xs">
          Single image uploader w/ max size ∙{' '}
          <a
            href="https://github.com/origin-space/originui/tree/main/docs/use-file-upload.md"
            className="hover:text-foreground underline"
          >
            API
          </a>
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="btn-primary bg-muted px-4 py-2 rounded">
            Cancelar
          </button>
          <button onClick={onClose} className="btn-primary px-4 py-2 rounded">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
