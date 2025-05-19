/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Base background colors
        base: {
          light: '#F5FAFD',
          dark: '#0B2540',
        },
        // Header/card background
        surface: {
          light: '#FFFFFF',
          dark: '#0A1D30',
        },
        // Primary colors
        primary: {
          light: '#2AB3B1',
          dark: '#2EC8C4',
          hover: {
            light: '#239997',
            dark: '#26AEA9',
          },
        },
        // Accent colors
        accent: {
          light: '#F58F6C',
          dark: '#C4B8FF',
        },
        // Support/Positive colors
        support: {
          light: '#3ED8A0',
          dark: '#3ED8A0',
        },
        // Text colors
        text: {
          primary: {
            light: '#1F262E',
            dark: '#E7ECEF',
          },
          secondary: {
            light: '#1F262E/70',
            dark: '#E7ECEF/70',
          },
        },
        // Border colors
        border: {
          light: '#E5E7EB',  // gray-200 equivalent
          dark: '#15324D',
          accent: {
            light: '#F58F6C',
            dark: '#C4B8FF',
          },
          support: {
            light: '#3ED8A0',
            dark: '#3ED8A0',
          },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-support': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'active': '0 5px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
