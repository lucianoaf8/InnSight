import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DailyIntention from '../components/DailyIntention';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import { AuthProvider, useAuth } from '../lib/firebase';
import * as api from '../lib/api';

// Mock the API module
vi.mock('../lib/api', () => ({
  apiRequest: vi.fn(),
}));

// Mock the Auth context
vi.mock('../lib/firebase', async () => {
  const actual = await vi.importActual('../lib/firebase');
  return {
    ...actual,
    useAuth: vi.fn(),
    AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Create a custom render function that includes providers
function renderWithProviders(ui: React.ReactElement, mockUser = true) {
  const mockGetIdToken = vi.fn().mockResolvedValue('mock-token');
  
  if (mockUser) {
    (useAuth as any).mockReturnValue({
      currentUser: {
        getIdToken: mockGetIdToken,
      },
    });
  } else {
    (useAuth as any).mockReturnValue({
      currentUser: null,
    });
  }
  
  return {
    ...render(
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          {ui}
        </I18nextProvider>
      </AuthProvider>
    ),
    mockGetIdToken,
  };
}

describe('DailyIntention Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders the input field when no intention is set', async () => {
    // Mock an empty intention response
    (api.apiRequest as any).mockResolvedValueOnce({ intention: '' });
    
    renderWithProviders(<DailyIntention />);
    
    // Should find the input field with the exact placeholder from translations
    const placeholder = i18n.t('dashboard.set_intention');
    const inputField = await screen.findByPlaceholderText(placeholder);
    expect(inputField).toBeInTheDocument();
    
    // Should find the save button
    const saveButton = screen.getByRole('button', { 
      name: new RegExp(i18n.t('common.save'), 'i') 
    });
    expect(saveButton).toBeInTheDocument();
  });
  
  it('fetches and displays the saved intention on mount', async () => {
    const testIntention = 'Test my daily intention';
    (api.apiRequest as any).mockResolvedValueOnce({ intention: testIntention });
    
    renderWithProviders(<DailyIntention />);
    
    // Wait for the intention text to be displayed
    const intentionText = await screen.findByText(testIntention);
    expect(intentionText).toBeInTheDocument();
    
    // Should find the edit button when an intention is displayed
    const editButton = screen.getByRole('button', { 
      name: new RegExp(i18n.t('dashboard.edit_intention'), 'i') 
    });
    expect(editButton).toBeInTheDocument();
  });
  
  it('allows editing an existing intention', async () => {
    const initialIntention = 'Initial intention';
    const updatedIntention = 'Updated intention';
    
    // Mock API responses
    (api.apiRequest as any).mockResolvedValueOnce({ intention: initialIntention });
    (api.apiRequest as any).mockResolvedValueOnce({}); // For the save operation
    
    renderWithProviders(<DailyIntention />);
    
    // Wait for the initial intention to be displayed
    await screen.findByText(initialIntention);
    
    // Click the edit button
    const editButton = screen.getByRole('button', { 
      name: new RegExp(i18n.t('dashboard.edit_intention'), 'i') 
    });
    fireEvent.click(editButton);
    
    // Find the input field and update its value
    const inputField = screen.getByDisplayValue(initialIntention);
    fireEvent.change(inputField, { target: { value: updatedIntention } });
    
    // Click the save button
    const saveButton = screen.getByRole('button', { 
      name: new RegExp(i18n.t('common.save'), 'i') 
    });
    fireEvent.click(saveButton);
    
    // Verryyhe APAIIswae cllld carpectly).toHaveBeenCalledWith(
    '/save-intention', 
    'POST', 
    { intention: updatedIntention }, 
    'mock-token'
  );
  
    Wait for the updated intention to be displayed
    expWaut fopathe tedText).toBeInTheto bo uisplaymdt();
  }););
    expect(updatedText).toBeInTheDocument();
  }
  
  it('shows an error message when fetching fails', async () => {
    // Mock API failure
    (api.apiRequest as any).mockRejectedValueOnce(new Error('Fetch failed'));
    
    renderWithProviders(<DailyIntention />);
    
    // Wait for the error message
    const errorMessage = await screen.findByText(i18n.t('errors.save_failed'));
    expect(errorMessage).toBeInTheDocument();
  });
  
  it('shows an error message when saving fails', async () => {
    // Mock initial fetch success but save failure
    (api.apiRequest as any).mockResolvedValueOnce({ intention: 'Initial intention' });
    (api.apiRequest as any).mockRejectedValueOnce(new Error('Save failed'));
    
    renderWithProviders(<DailyIntention />);
    
    // Wait for the initial intention to load
    await screen.findByText('Initial intention');
    
    // Click the edit button
    const editButton = screen.getByRole('button', { 
      name: new RegExp(i18n.t('dashboard.edit_intention'), 'i') 
    });
    fireEvent.click(editButton);
    
    // Update the intention
    const inputField = screen.getByDisplayValue('Initial intention');
    fireEvent.change(inputField, { target: { value: 'Updated intention' } });
    
    // Click the save button
    const saveButton = screen.getByRole('button', { 
      name: new RegExp(i18n.t('common.save'), 'i') 
    });
    fireEvent.click(saveButton);
    
    // Wait for the error message
    const errorMessage = await screen.findByText(i18n.t('errors.save_failed'));
    expect(errorMessage).toBeInTheDocument();
  });
  
  it('does not fetch intention when user is not authenticated', async () => {
    renderWithProviders(<DailyIntention />, false); // no mock user
    
    // Input should be visible for unauthenticated users
    const placeholder = i18n.t('dashboard.set_intention');
    const inputField = screen.getByPlaceholderText(placeholder);
    expect(inputField).toBeInTheDocument();
    
    // API should not have been called
    expect(api.apiRequest).not.toHaveBeenCalled();
  });
});
