/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0B0F19",
        cardBg: "#111827",
        cardHover: "#1F2937",
        navyDark: "#050811",
        accentBlue: "#3B82F6",
        accentCyan: "#06B6D4",
        accentPurple: "#8B5CF6",
        accentEmerald: "#10B981",
        accentRose: "#F43F5E",
        accentAmber: "#F59E0B"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 15px rgba(6, 182, 212, 0.8), 0 0 25px rgba(6, 182, 212, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
