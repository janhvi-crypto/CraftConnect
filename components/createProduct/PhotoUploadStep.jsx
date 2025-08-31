import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, X, Image as ImageIcon } from "lucide-react";

export default function PhotoUploadStep({ data, updateData, onNext }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    updateData({ images: [...data.images, ...imageUrls] });
  };

  const removeImage = (index) => {
    const newImages = data.images.filter((_, i) => i !== index);
    updateData({ images: newImages });
  };

  const canProceed = data.images.length > 0;

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-orange-600" />
          Upload Product Photos
        </CardTitle>
        <p className="text-gray-600">Add clear, well-lit photos of your craft from different angles</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Zone */}
        <div 
          className="border-2 border-dashed border-orange-200 rounded-xl p-8 text-center hover:border-orange-300 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref__={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-50 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Drop your photos here</h3>
          <p className="text-gray-500 mb-4">or click to browse and select multiple images</p>
          <Button className="bg-orange-600 hover:bg-orange-700">
            Choose Photos
          </Button>
        </div>

        {/* Image Preview Grid */}
        {data.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border shadow-sm"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-6">
          <div className="text-sm text-gray-600">
            {data.images.length > 0 && (
              <span className="text-green-600 font-medium">
                ✓ {data.images.length} photo{data.images.length > 1 ? 's' : ''} uploaded
              </span>
            )}
          </div>
          <Button 
            onClick={onNext}
            disabled={!canProceed}
            className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
          >
            Next: Share Your Story
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
