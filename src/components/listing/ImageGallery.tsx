import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface Image {
  url: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: (string | Image)[];
  videoUrl?: string;
  has360View?: boolean;
}

export function ImageGallery({ images, videoUrl, has360View = false }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Normalize images to Image objects
  const normalizedImages: Image[] = images.map((img) =>
    typeof img === "string" ? { url: img } : img
  );

  const currentImage = normalizedImages[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? normalizedImages.length - 1 : prev - 1));
    setZoom(1);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === normalizedImages.length - 1 ? 0 : prev + 1));
    setZoom(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setIsLightboxOpen(false);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-video bg-muted rounded-xl overflow-hidden group">
        <img
          src={currentImage.url}
          alt={currentImage.caption || `Vehicle image ${selectedIndex + 1}`}
          className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Navigation Arrows */}
          {normalizedImages.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Zoom Button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute bottom-4 right-4 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            aria-label="View fullscreen"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
          {selectedIndex + 1} / {normalizedImages.length}
        </div>

        {/* Special Features Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {videoUrl && (
            <Badge className="bg-red-500 text-white gap-1.5">
              <Play className="h-3 w-3" />
              Video
            </Badge>
          )}
          {has360View && (
            <Badge className="bg-blue-500 text-white">
              360° View
            </Badge>
          )}
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white text-sm">{currentImage.caption}</p>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-6 gap-2">
        {normalizedImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative aspect-video rounded-lg overflow-hidden border-2 transition-all hover:opacity-100",
              selectedIndex === index
                ? "border-primary opacity-100 ring-2 ring-primary/50"
                : "border-border opacity-60"
            )}
          >
            <img
              src={image.url}
              alt={image.caption || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}

        {/* Video Thumbnail */}
        {videoUrl && (
          <button
            onClick={() => {
              // Open video in lightbox
              setIsLightboxOpen(true);
            }}
            className="relative aspect-video rounded-lg overflow-hidden border-2 border-border opacity-60 hover:opacity-100 transition-all bg-black"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-8 w-8 text-white" />
            </div>
            <div className="absolute bottom-1 left-1 right-1">
              <p className="text-xs text-white font-medium truncate">Video</p>
            </div>
          </button>
        )}

        {/* 360° View Thumbnail */}
        {has360View && (
          <button
            onClick={() => {
              // Open 360 view
              setIsLightboxOpen(true);
            }}
            className="relative aspect-video rounded-lg overflow-hidden border-2 border-border opacity-60 hover:opacity-100 transition-all bg-gradient-to-br from-blue-500 to-purple-500"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">360°</span>
            </div>
          </button>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              disabled={zoom <= 1}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <div className="px-4 py-3 rounded-full bg-white/10 text-white text-sm font-medium min-w-[80px] text-center">
              {Math.round(zoom * 100)}%
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              disabled={zoom >= 3}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium z-10">
            {selectedIndex + 1} / {normalizedImages.length}
          </div>

          {/* Navigation */}
          {normalizedImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="relative max-w-7xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption || `Vehicle image ${selectedIndex + 1}`}
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

