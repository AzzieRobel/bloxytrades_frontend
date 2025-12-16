import { imageConfig } from "./imageConfig"
import { itemMockUpConfig } from "./itmeMockUpConfig"
import { dashboardConfig } from "./dashboardConfig"

export const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    storageKey: import.meta.env.VITE_STORAGE_KEY,

    
    ...imageConfig,
    itemMockUpConfig,
    dashboardConfig,
}