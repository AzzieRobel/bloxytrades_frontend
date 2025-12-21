import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { config } from '@/config';

import { isValidImageType, isValidExtension, isValidCloudinaryUrl } from '@/utils';
const { MAX_FILE_SIZE, ALLOWED_MIME_TYPES } = config;

export const ImageUpload = ({ imageUrl, onImageChange }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security: Validate and upload file
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Security: Validate file exists
    if (!file) {
      toast.error('No file selected');
      return;
    }

    // Security: Validate file type by MIME type
    if (!isValidImageType(file)) {
      toast.error('Invalid file type. Only JPG, PNG, and WebP images are allowed.');
      return;
    }

    // Security: Validate file extension (double check)
    if (!isValidExtension(file.name)) {
      toast.error('Invalid file extension. Only .jpg, .jpeg, .png, and .webp are allowed.');
      return;
    }

    // Security: Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return;
    }

    // Security: Validate file size is not zero
    if (file.size === 0) {
      toast.error('File is empty');
      return;
    }

    // Show preview immediately (client-side only, not uploaded yet)
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.onerror = () => {
      toast.error('Failed to read file');
      setPreview(null);
    };
    reader.readAsDataURL(file);

    // Upload directly to Cloudinary
    try {
      setUploading(true);

      // Security: Validate config values exist
      if (!config.cloudinaryName) throw new Error('Cloudinary configuration is missing');

      if (!config.cloudinaryUploadPreset) throw new Error('Upload preset is not configured');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', config.cloudinaryUploadPreset);

      // Security: Use folder from config, fallback to 'listings'
      const folder = config.couldinaryFolder || 'listings';
      formData.append('folder', folder);

      // Note: Transformations should be configured in Cloudinary upload preset settings
      // For unsigned uploads, transformations cannot be sent as parameters

      // Security: Use secure HTTPS endpoint
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${config.cloudinaryName}/image/upload`;

      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
        // Security: Don't send credentials (no cookies)
        credentials: 'omit',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `Upload failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Security: Validate response contains secure URL
      if (!data.secure_url) throw new Error('Invalid response from Cloudinary');

      // Security: Validate URL is from Cloudinary
      if (!isValidCloudinaryUrl(data.secure_url)) throw new Error('Invalid image URL received');

      // Security: Only update if URL is valid
      onImageChange(data.secure_url);
      toast.success('Image uploaded successfully!');
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error(err.message || 'Failed to upload image. Please try again.');
      setPreview(null);
      onImageChange('');
    } finally {
      setUploading(false);
      // Security: Clear file input
      if (fileInputRef.current)
        fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange('');
    if (fileInputRef.current)
      fileInputRef.current.value = '';
  };

  const handleChange = () => {
    if (fileInputRef.current && !uploading)
      fileInputRef.current.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm text-left text-gray-300 mb-1">
        Listing Image
      </label>
      <div className="relative">
        {preview ? (
          <div className="relative w-full h-48 border border-white/10 rounded-sm overflow-hidden group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => {
                // Security: Handle broken image URLs
                setPreview(null);
                onImageChange('');
                toast.error('Invalid image URL');
              }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleChange}
                disabled={uploading}
                className="px-3 py-1.5 bg-primary/80 hover:bg-primary text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? 'Uploading...' : 'Change'}
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="px-3 py-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-sm cursor-pointer hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-gray-400 mb-2 animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
            )}
            <span className="text-sm text-gray-400">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Max 5MB • JPG, PNG, WebP
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_MIME_TYPES.join(',')}
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>
    </div>
  );
};

