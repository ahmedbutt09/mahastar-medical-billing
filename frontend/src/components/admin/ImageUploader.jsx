import React, { useState } from 'react';
import { Upload, X, Loader, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabaseClient';

const ImageUploader = ({ 
  onImageUploaded, 
  currentImage, 
  bucket = 'images', 
  folder = 'general',
  label = 'Upload Image',
  aspectRatio = '16:9'
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const uploadImage = async (file) => {
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }
    
    setUploading(true);
    
    try {
      // Create unique filename
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${folder}/${timestamp}_${sanitizedName}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filename);
      
      setPreview(publicUrl);
      onImageUploaded(publicUrl);
      toast.success('Image uploaded successfully!');
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  const removeImage = async () => {
    if (currentImage) {
      // Extract filename from URL
      const urlParts = currentImage.split('/');
      const filename = urlParts[urlParts.length - 1];
      const filePath = `${folder}/${filename}`;
      
      try {
        await supabase.storage.from(bucket).remove([filePath]);
      } catch (error) {
        console.error('Error removing image:', error);
      }
    }
    setPreview(null);
    onImageUploaded(null);
    toast.success('Image removed');
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {preview ? (
        <div className="relative group">
          <img 
            src={preview} 
            alt="Preview" 
            className={`w-full rounded-lg object-cover border border-gray-200`}
            style={{ aspectRatio: aspectRatio }}
          />
          <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
            <label className="cursor-pointer bg-white text-gray-700 px-3 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-gray-100">
              <Upload size={14} /> Change
              <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
            </label>
            <button onClick={removeImage} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-red-600">
              <X size={14} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition cursor-pointer"
          onClick={() => document.getElementById(`image-input-${label.replace(/\s/g, '')}`).click()}
        >
          <input 
            id={`image-input-${label.replace(/\s/g, '')}`} 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileSelect} 
          />
          
          {uploading ? (
            <Loader className="w-10 h-10 text-primary mx-auto animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Click to upload image</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;