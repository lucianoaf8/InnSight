// src/lib/api.ts
import { auth } from './firebase';
import i18n from 'i18next';

const IS_TEST_ENV = typeof globalThis !== 'undefined' && (
  // Vitest
  typeof (globalThis as any).vi !== 'undefined' ||
  // Jest (if ever used)
  typeof (globalThis as any).jest !== 'undefined'
);
const USE_MOCKS = !IS_TEST_ENV && import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === 'true';
const BASE_URL =
  import.meta.env.DEV
    ? "http://localhost:5174/api"
    : "https://your-pythonanywhere-url/api";

    
let _mockData: Record<string, any> | undefined;
async function loadMockData(): Promise<Record<string, any>> {
  if (!_mockData) {
    const res = await fetch('/mocks/data.json');
    if (!res.ok) {
      throw new Error(`Failed to load mock data: ${res.status}`);
    }
    _mockData = await res.json();
  }
  return _mockData!;
}

async function getIdToken(): Promise<string | null> {
  if (!auth.currentUser) return null;
  try {
    return await auth.currentUser.getIdToken();
  } catch (err) {
    console.error('Error getting ID token:', err);
    return null;
  }
}

/**
 * Unified API request function, with optional mock support.
 */
export async function apiRequest(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  forceToken?: string
): Promise<any> {
  // —— MOCK MODE ——
  if (USE_MOCKS) {
    const all = await loadMockData();
    const lang = i18n.language in all ? i18n.language : 'en';
    const section = all[lang];

    // route‐to‐mock mapping
    if (path === '/intention/today') {
      return { intention: section.intention };
    }
    if (path === '/entries') {
      return section.entries; 
    }
    if (path === '/quote') {
      return { quote: section.quote };
    }
    if (path === '/user') {
      return { user: section.user };
    }

    throw new Error(`No mock handler for ${method} ${path}`);
  }

  // —— REAL API MODE ——
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = forceToken ?? await getIdToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}
