import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Light Mode Design System
        brand: {
          white: "#FFFFFF",
          black: "#0D0D0D",
          // Main Brand Colors
          red: "#A92020",
          navy: "#142641",
          gold: "#D4B372",
          // Light surfaces
          dark: "#142641",
          surface: "#F8F9FB",
          card: "#FFFFFF",
          elevated: "#FFFFFF",
          // Aliases for backward compat
          coral: "#A92020",
        },

        // Neutral Colors - Light theme
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },

        // Service Card Backgrounds
        service: {
          beige: "#FFFDF8",
          purple: "#F8FAFC",
          green: "#F0FDF4",
          blue: "#F0F9FF",
          gold: "#FFFAEB",
          pink: "#FEF2F2",
        },

        // WhatsApp Brand Color
        whatsapp: {
          DEFAULT: "#25D366",
          hover: "#20BA5A",
          light: "#DCF8C6",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      borderRadius: {
        'pill': '9999px',
        'card': '20px',
        'card-lg': '24px',
      },
      boxShadow: {
        'glow': '0 0 60px -15px rgba(244, 121, 108, 0.4)',
        'glow-red': '0 0 60px -15px rgba(220, 38, 39, 0.3)',
        'glow-navy': '0 0 40px -10px rgba(22, 42, 70, 0.3)',
        'soft': '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 4px 24px -4px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px -8px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
