// API configuration and helper functions
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn('API_URL is not defined in environment variables. Using default URL.');
}

export const BASE_URL = API_URL || 'http://localhost:3000';

// Helper function to handle JSON responses
export async function handleResponse(response: Response) {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // If JSON parsing fails, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error('Invalid response format from server');
  }
}

// API request helper with proper error handling
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}