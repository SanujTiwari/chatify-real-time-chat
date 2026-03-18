export const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:3001"
        : import.meta.env.VITE_BACKEND_URL;

export const API_URL = `${BASE_URL}/api`;
