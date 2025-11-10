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
        
        // RED BULL INSPIRED COLOR PALETTE - Next Level Energy
        brand: {
          // Navy - Primary brand color (Deep Blue)
          navy: {
            DEFAULT: "#0F2D5B", // Red Bull Dark Blue - main brand color
            light: "#1A4278",   // Lighter blue for hover states
            dark: "#091D3C",    // Red Bull Darkest Blue - depth
          },
          // Blue - Secondary accent (same as navy for consistency)
          blue: {
            DEFAULT: "#0F2D5B", // Red Bull Dark Blue
            light: "#1A4278",   // Lighter blue - hover states
            dark: "#091D3C",    // Darkest blue - active states
          },
          // Red - Accent color (Red Bull Red - Energy!)
          red: {
            DEFAULT: "#E41349", // Red Bull Red - primary CTA
            light: "#FF1F5A",   // Light red - hover
            dark: "#C10D3A",    // Dark red - active
          },
          // Gold - Premium accent (Red Bull Yellow)
          gold: {
            DEFAULT: "#FDD205", // Red Bull Yellow - secondary CTA
            light: "#FFDC33",   // Light yellow - hover
            dark: "#E5BD00",    // Dark yellow - active
          },
        },
        
        // Neutral Colors - Clean & Modern (Red Bull Style)
        neutral: {
          50: "#FFFFFF",   // Pure white - backgrounds
          100: "#F5F5F5",  // Very light gray - subtle backgrounds
          200: "#E8E8E8",  // Light gray - borders, dividers
          300: "#D3D3D3",  // Red Bull Gray - disabled states
          400: "#B8B8B8",  // Medium gray - placeholders
          500: "#9E9E9E",  // Medium dark - secondary text
          600: "#757575",  // Dark gray - body text
          700: "#424242",  // Darker - headings
          800: "#212121",  // Very dark - emphasis
          900: "#091D3C",  // Red Bull Dark Blue - maximum contrast
        },
        
        // Semantic Colors - User Feedback (Red Bull Palette)
        success: {
          DEFAULT: "#FDD205", // Yellow for success (Red Bull style)
          light: "#FFDC33",   // Light yellow - hover
          dark: "#E5BD00",    // Dark yellow - active
          bg: "#FFFEF0",      // Background for success messages
        },
        warning: {
          DEFAULT: "#FDD205", // Red Bull Yellow - warning states
          light: "#FFDC33",   // Light yellow - hover
          dark: "#E5BD00",    // Dark yellow - active
          bg: "#FFFEF0",      // Background for warnings
        },
        error: {
          DEFAULT: "#E41349", // Red Bull Red - error states
          light: "#FF1F5A",   // Light red - hover
          dark: "#C10D3A",    // Dark red - active
          bg: "#FFF0F3",      // Background for errors
        },
        info: {
          DEFAULT: "#0F2D5B", // Red Bull Blue - info states
          light: "#1A4278",   // Light blue - hover
          dark: "#091D3C",    // Dark blue - active
          bg: "#F0F4FF",      // Background for info
        },
        
        // Service Card Backgrounds - Red Bull Energy Style
        service: {
          beige: "#FFFFFF",   // Pure white - clean
          purple: "#F0F4FF",  // Soft blue tint - premium (épaviste)
          green: "#FFFEF0",   // Soft yellow tint - energy
          blue: "#F0F4FF",    // Soft blue - premium (rachat)
          gold: "#FFFEF0",    // Soft yellow - premium value
          pink: "#FFF0F3",    // Soft red tint - action
        },
        
        // WhatsApp Brand Color
        whatsapp: {
          DEFAULT: "#25D366", // Official WhatsApp green
          hover: "#20BA5A",   // Darker green for hover
          light: "#DCF8C6",   // Light green for backgrounds
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
