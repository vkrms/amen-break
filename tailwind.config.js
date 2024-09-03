import medusaPreset from "@medusajs/ui-preset";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [medusaPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",    
  ],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [
    typography,
  ],
}

