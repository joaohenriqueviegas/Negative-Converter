import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Check } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function ImageGallery({ images, currentIndex, onSelectImage, onRemoveImage }) {
    if (images.length === 0) return null;

    return (
        <div className="border-t border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-400">
                    Batch Queue ({images.length} {images.length === 1 ? 'image' : 'images'})
                </h3>
                <div className="text-xs text-slate-500">
                    Click to edit • {images.filter(img => img.processed).length} processed
                </div>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className="relative flex-shrink-0"
                    >
                        <button
                            onClick={() => onSelectImage(index)}
                            className={cn(
                                "relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all",
                                currentIndex === index
                                    ? "border-blue-500 ring-2 ring-blue-500/50"
                                    : "border-slate-700 hover:border-slate-600"
                            )}
                        >
                            <img
                                src={image.originalUrl}
                                alt={image.name}
                                className="w-full h-full object-cover"
                            />
                            {image.processed && (
                                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            )}
                            {currentIndex === index && (
                                <div className="absolute inset-0 bg-blue-500/20" />
                            )}
                        </button>
                        
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveImage(index);
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors shadow-lg"
                        >
                            <X className="w-3 h-3 text-white" />
                        </button>
                        
                        <div className="mt-1 text-xs text-slate-500 truncate max-w-[96px]" title={image.name}>
                            {image.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}