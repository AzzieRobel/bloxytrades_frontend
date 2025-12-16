import axios from "axios";

import { config } from "@/config";

const { apiBaseUrl } = config;

export const api = axios.create({ baseURL: apiBaseUrl });