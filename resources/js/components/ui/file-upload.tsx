import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { UploadCloud, X, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FileUploadProps {
    value?: string | File | null;
    onChange: (file: string | File | null) => void;
    className?: string;
    accept?: Record<string, string[]>;
    maxSize?: number; // in bytes
}

export function FileUpload({
    value,
    onChange,
    className,
    accept = { 'image/*': [] },
    maxSize = 5 * 1024 * 1024 // 5MB
}: FileUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [inputType, setInputType] = useState<'file' | 'url'>('file');
    const [urlInput, setUrlInput] = useState('');

    // Handle initial value and value changes
    useEffect(() => {
        if (typeof value === 'string') {
            setPreview(value);
            setUrlInput(value);
            if (value) setInputType('url');
        } else if (value instanceof File) {
            setPreview(URL.createObjectURL(value));
            setInputType('file');
        } else {
            setPreview(null);
            setUrlInput('');
            // Keep current input type or default to file
        }
    }, [value]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            onChange(file);
            // Preview is handled by useEffect when value updates, 
            // but for immediate feedback we can set it here too if needed.
            // However, value update propagation is safer.
        }
    }, [onChange]);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrlInput(newUrl);
        onChange(newUrl);
    };

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
        setUrlInput('');
        setPreview(null);
        setInputType('file');
    };

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        accept,
        maxSize,
        maxFiles: 1,
        onDropRejected: (rejections) => {
            console.log("Rejected", rejections);
        }
    });

    return (
        <div className={cn("w-full space-y-4", className)}>
            {/* Input Method Toggle (Only visible if no file selected or switching) */}
            {!preview && (
                <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                    <button
                        type="button"
                        onClick={() => setInputType('file')}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            inputType === 'file' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Upload
                    </button>
                    <button
                        type="button"
                        onClick={() => setInputType('url')}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            inputType === 'url' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        URL
                    </button>
                </div>
            )}

            {inputType === 'file' ? (
                // Dropzone Area
                <div
                    {...getRootProps()}
                    className={cn(
                        "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center gap-4 bg-gray-50/50 hover:bg-gray-50 border-gray-200",
                        isDragActive && "border-indigo-500 bg-indigo-50/50",
                        preview && "p-0 border-solid overflow-hidden bg-gray-900 border-gray-900"
                    )}
                >
                    <input {...getInputProps()} />

                    {preview ? (
                        <div className="relative w-full aspect-video group">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="text-white text-sm font-medium flex flex-col items-center gap-2">
                                    <UploadCloud className="w-6 h-6" />
                                    <span className="underline">Click or Drop to Replace</span>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={removeFile}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center">
                                <UploadCloud className="w-6 h-6 text-indigo-500" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {isDragActive ? "Drop the file here" : "Click to upload or drag and drop"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    SVG, PNG, JPG or GIF (max 5MB)
                                </p>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                // URL Input Area
                <div className="space-y-3">
                    <div className="relative">
                        <Input
                            placeholder="https://example.com/image.png"
                            value={urlInput}
                            onChange={handleUrlChange}
                            className="bg-white"
                        />
                        {preview && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-red-500"
                                onClick={removeFile}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>

                    {/* URL Preview */}
                    {preview && (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-900 border border-gray-200">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-contain"
                                onError={(e) => (e.target as HTMLImageElement).src = ''} // Handle broken links gracefully
                            />
                        </div>
                    )}
                </div>
            )}

            {fileRejections.length > 0 && (
                <p className="text-sm text-red-500 mt-2">
                    File rejected: {fileRejections[0].errors[0].message}
                </p>
            )}
        </div>
    );
}
