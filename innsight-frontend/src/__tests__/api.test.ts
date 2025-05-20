import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiRequest } from '../lib/api'
import i18n from '../lib/i18n'

describe('API Request Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // @ts-ignore
    global.fetch = vi.fn()
  })

  it('should include authorization token in headers when token is provided', async () => {
    const mockResponse = { ok: true, json: () => Promise.resolve({ data: 'test' }) }
    // @ts-ignore
    global.fetch.mockResolvedValueOnce(mockResponse)

    const token = 'test-token'
    await apiRequest('/test-endpoint', 'GET', null, token)

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': `Bearer ${token}`
        })
      })
    )
  })

  it('should not include authorization token when not provided', async () => {
    const mockResponse = { ok: true, json: () => Promise.resolve({ data: 'test' }) }
    // @ts-ignore
    global.fetch.mockResolvedValueOnce(mockResponse)

    await apiRequest('/test-endpoint', 'GET')

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.not.objectContaining({
          'Authorization': expect.any(String)
        })
      })
    )
  })

  it('should use the correct HTTP method', async () => {
    const mockResponse = { ok: true, json: () => Promise.resolve({ data: 'test' }) }
    // @ts-ignore
    global.fetch.mockResolvedValueOnce(mockResponse)

    await apiRequest('/test-endpoint', 'POST', { testData: 'value' })

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ testData: 'value' })
      })
    )
  })

  it('should handle successful responses', async () => {
    const mockData = { success: true, data: 'test-data' }
    const mockResponse = { 
      ok: true,
      json: () => Promise.resolve(mockData)
    }
    // @ts-ignore
    global.fetch.mockResolvedValueOnce(mockResponse)

    const result = await apiRequest('/test-endpoint')
    
    expect(result).toEqual(mockData)
  })

  it('should handle error responses', async () => {
    const errorMessage = 'Not found'
    const mockResponse = { 
      ok: false,
      status: 404,
      statusText: errorMessage,
      json: () => Promise.resolve({ error: errorMessage })
    }
    // @ts-ignore
    global.fetch.mockResolvedValueOnce(mockResponse)

    await expect(apiRequest('/test-endpoint')).rejects.toThrow()
  })
})
