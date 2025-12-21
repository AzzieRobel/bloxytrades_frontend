import { config } from "@/config";

const { ALLOWED_MIME_TYPES } = config;

// Security: Validate file type
export const isValidImageType = (file: File): boolean => {
    return ALLOWED_MIME_TYPES.includes(file.type);
};

// Security: Validate file extension
export const isValidExtension = (filename: string): boolean => {
    const ext = filename.toLowerCase().split('.').pop();
    return ext ? ['jpg', 'jpeg', 'png', 'webp'].includes(ext) : false;
};

// Security: Validate Cloudinary URL
export const isValidCloudinaryUrl = (url: string): boolean => {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        // Verify it's from Cloudinary CDN
        return urlObj.hostname.includes('cloudinary.com') ||
            urlObj.hostname.includes('res.cloudinary.com');
    } catch {
        return false;
    }
};

export const formatPriceCompact = (num: number): string => {
    if (num >= 1_000_000) {
        return `$${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M`;
    }
    if (num >= 1_000) {
        return `$${(num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1)}K`;
    }
    return `$${num}`;
}