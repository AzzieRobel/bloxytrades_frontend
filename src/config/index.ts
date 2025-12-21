import { imageConfig } from "./imageConfig"
import { dashboardConfig } from "./dashboardConfig"

export const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    storageKey: import.meta.env.VITE_STORAGE_KEY,
    cloudinaryName: import.meta.env.VITE_CLOUDINARY_NAME,
    cloudinaryApiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
    cloudinarySecret: import.meta.env.VITE_CLOUDINARY_SECRET,
    cloudinaryUploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    couldinaryFolder: import.meta.env.VITE_CLOUDINARY_FOLDER,
    MAX_FILE_SIZE: 5 * 1024 * 1024,
    ALLOWED_MIME_TYPES: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
    ],

    ...imageConfig,
    dashboardConfig,
}