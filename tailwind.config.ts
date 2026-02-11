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
        
        // CORPORATE TRUST PALETTE - Professional & Reliable
        brand: {
          // Navy - Primary brand color (Deep Executive Blue)
          navy: {
            DEFAULT: "#0B1C33", // Deep authoritative navy
            light: "#162A47",   // Lighter navy for hover
            dark: "#050E1A",    // Darkest navy - almost black
          },
          // Blue - Secondary accent (Trust Blue)
          blue: {
            DEFAULT: "#0F4C81", // Classic Blue - Trust & Dependability
            light: "#1D5D9B",   // Lighter blue
            dark: "#083054",    // Dark blue
          },
          // Red - Accent color (Subtle & Professional)
          red: {
            DEFAULT: "#B91C1C", // Deep professional red (not bright/alarmist)
            light: "#DC2626",   // Hover red
            dark: "#991B1B",    // Active red
          },
          // Gold - Premium accent (Muted Gold/Brass)
          gold: {
            DEFAULT: "#C5A059", // Muted metallic gold/brass
            light: "#D4B372",   // Lighter gold
            dark: "#A3823E",    // Darker antique gold
          },
        },
        
        // Neutral Colors - Slate/Cool Tones for Tech/Professional Feel
        neutral: {
          50: "#F8FAFC",   // Clean white-blue tint
          100: "#F1F5F9",  // Very light slate
          200: "#E2E8F0",  // Light slate - borders
          300: "#CBD5E1",  // Slate gray - disabled
          400: "#94A3B8",  // Medium slate - accents
          500: "#64748B",  // Slate - secondary text
          600: "#475569",  // Dark slate - body text
          700: "#334155",  // Darker slate - headings
          800: "#1E293B",  // Very dark slate
          900: "#0F172A",  // Deepest slate - maximum contrast
        },
        
        // Semantic Colors - Professional Feedback
        success: {
          DEFAULT: "#10B981", // Professional emerald
          light: "#34D399",   // Light emerald
          dark: "#059669",    // Dark emerald
          bg: "#ECFDF5",      // Background for success
        },
        warning: {
          DEFAULT: "#F59E0B", // Professional amber
          light: "#FBBF24",   // Light amber
          dark: "#D97706",    // Dark amber
          bg: "#FFFBEB",      // Background for warnings
        },
        error: {
          DEFAULT: "#EF4444", // Standard professional red
          light: "#F87171",   // Light red
          dark: "#B91C1C",    // Dark red
          bg: "#FEF2F2",      // Background for errors
        },
        info: {
          DEFAULT: "#3B82F6", // Standard blue
          light: "#60A5FA",   // Light blue
          dark: "#2563EB",    // Dark blue
          bg: "#EFF6FF",      // Background for info
        },
        
        // Service Card Backgrounds - Sophisticated & Clean
        service: {
          beige: "#FFFFFF",   // Pure white
          purple: "#F8FAFC",  // Very subtle slate tint
          green: "#F0FDF4",   // Very subtle green tint
          blue: "#F0F9FF",    // Very subtle blue tint
          gold: "#FFFAEB",    // Very subtle gold tint
          pink: "#FEF2F2",    // Very subtle red tint
        },
        
        // WhatsApp Brand Color
        whatsapp: {
          DEFAULT: "#25D366", // Official WhatsApp green
          hover: "#20BA5A",   // Darker green for hover
          light: "#DCF8C6",   // Light green for backgrounds
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
