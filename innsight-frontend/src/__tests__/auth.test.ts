/** @vitest-environment node */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCurrentUserToken } from '../lib/auth';
import { auth } from '../lib/firebase';

describe('Auth Utility', () => {
  beforeEach(() => {
    // Reset auth.currentUser before each test
    (auth as any).currentUser = null;
    vi.clearAllMocks();
  });

  it('returns null when there is no current user', async () => {
    (auth as any).currentUser = null;
    const token = await getCurrentUserToken();
    expect(token).toBeNull();
  });

  it('returns token when user is present', async () => {
    const mockToken = 'abc123';
    const mockGetIdToken = vi.fn().mockResolvedValue(mockToken);
    (auth as any).currentUser = { getIdToken: mockGetIdToken };
    const token = await getCurrentUserToken();
    expect(mockGetIdToken).toHaveBeenCalled();
    expect(token).toBe(mockToken);
  });

  it('propagates errors from getIdToken', async () => {
    const error = new Error('fail');
    const mockGetIdToken = vi.fn().mockRejectedValue(error);
    (auth as any).currentUser = { getIdToken: mockGetIdToken };
    await expect(getCurrentUserToken()).rejects.toThrow('fail');
  });
});
