/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "var(--font-sans)", "ui-sans-serif", "sans-serif"]
      },
      colors: {
        primary: {
          DEFAULT: "#9fb8f4",
          dark: "#5475c7",
          soft: "#edf3ff",
          foreground: "#162033"
        },
        secondary: {
          DEFAULT: "#b5e19c",
          dark: "#5c9f45",
          soft: "#f0faeb",
          foreground: "#162033"
        },
        ink: "#162033",
        muted: {
          DEFAULT: "#647084",
          foreground: "#647084"
        },
        line: "#dbe3ef",
        surface: "#f7f9fc",
        wheat: "#f4cf62",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)"
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)"
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)"
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(22, 32, 51, 0.08)"
      }
    }
  },
  plugins: []
};
