import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Secure storage utility for sensitive data like tokens
 * Uses Expo SecureStore on iOS/Android and fallback for web
 */

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  BIOMETRIC_ENABLED: 'biometric_enabled',
} as const;

type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

interface SecureStorageService {
  setItem: (key: StorageKey, value: string) => Promise<void>;
  getItem: (key: StorageKey) => Promise<string | null>;
  removeItem: (key: StorageKey) => Promise<void>;
  clear: () => Promise<void>;
}

class SecureStorageManager implements SecureStorageService {
  async setItem(key: StorageKey, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        // Fallback to localStorage for web with basic encoding
        localStorage.setItem(key, btoa(value));
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error(`Failed to store ${key}:`, error);
      throw new Error(`Storage operation failed for ${key}`);
    }
  }

  async getItem(key: StorageKey): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        const value = localStorage.getItem(key);
        return value ? atob(value) : null;
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error(`Failed to retrieve ${key}:`, error);
      return null;
    }
  }

  async removeItem(key: StorageKey): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error(`Failed to remove ${key}:`, error);
      throw new Error(`Remove operation failed for ${key}`);
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await Promise.all(keys.map(key => this.removeItem(key)));
    } catch (error) {
      console.error('Failed to clear secure storage:', error);
      throw new Error('Clear operation failed');
    }
  }
}

// Token management utilities
export class TokenManager {
  private storage = new SecureStorageManager();

  async storeTokens(accessToken: string, refreshToken?: string): Promise<void> {
    await this.storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken) {
      await this.storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  }

  async getAccessToken(): Promise<string | null> {
    return await this.storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  async getRefreshToken(): Promise<string | null> {
    return await this.storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async clearTokens(): Promise<void> {
    await Promise.all([
      this.storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
      this.storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
    ]);
  }

  async isTokenValid(token: string): Promise<boolean> {
    if (!token) return false;
    
    try {
      // Basic JWT validation (check if it's not expired)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp && payload.exp > currentTime;
    } catch {
      return false;
    }
  }
}

// User data management
export class UserDataManager {
  private storage = new SecureStorageManager();

  async storeUserId(userId: string): Promise<void> {
    await this.storage.setItem(STORAGE_KEYS.USER_ID, userId);
  }

  async getUserId(): Promise<string | null> {
    return await this.storage.getItem(STORAGE_KEYS.USER_ID);
  }

  async setBiometricEnabled(enabled: boolean): Promise<void> {
    await this.storage.setItem(STORAGE_KEYS.BIOMETRIC_ENABLED, enabled.toString());
  }

  async isBiometricEnabled(): Promise<boolean> {
    const value = await this.storage.getItem(STORAGE_KEYS.BIOMETRIC_ENABLED);
    return value === 'true';
  }

  async clearUserData(): Promise<void> {
    await Promise.all([
      this.storage.removeItem(STORAGE_KEYS.USER_ID),
      this.storage.removeItem(STORAGE_KEYS.BIOMETRIC_ENABLED),
    ]);
  }
}

// Singleton instances
export const tokenManager = new TokenManager();
export const userDataManager = new UserDataManager();
export const secureStorage = new SecureStorageManager();

export { STORAGE_KEYS };
