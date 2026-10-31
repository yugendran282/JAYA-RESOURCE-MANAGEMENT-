/**
 * Cryptographic security utilities for Jaya Resource Management
 * Uses Web Crypto API SHA-256 with salt for secure client/edge hashing.
 * Never stores plain-text passwords.
 */

const PASSWORD_SALT = 'jaya_institutional_sec_salt_2026_v1';

export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${password}:${PASSWORD_SALT}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, expectedHash: string): Promise<boolean> {
  const actualHash = await hashPassword(password);
  return actualHash === expectedHash;
}

export function generateTemporaryPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const nums = '23456789';
  const symbols = '!@#$%&*';
  
  let result = 'Jaya@';
  for (let i = 0; i < 3; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  for (let i = 0; i < 3; i++) {
    result += nums.charAt(Math.floor(Math.random() * nums.length));
  }
  result += symbols.charAt(Math.floor(Math.random() * symbols.length));
  return result;
}
