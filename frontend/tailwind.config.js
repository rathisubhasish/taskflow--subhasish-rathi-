export default {
  darkMode: "class", // enable dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        /* 🔷 BRAND */
        primary: "#4F46E5",
        primaryHover: "#4338CA",
        primaryActive: "#3730A3",

        secondary: "#06B6D4",
        secondaryHover: "#0891B2",
        secondaryActive: "#0E7490",

        bg: {
          light: "#E0E7FF",
          card: "#FFFFFF",
          hover: "#F1F5F9",

          dark: "#0F172A",
          darkCard: "#1E293B",
          darkHover: "#334155",
        },

        border: {
          light: "#E5E7EB",
          subtle: "#F1F5F9",
          active: "#6366F1",

          dark: "#334155",
          darkSubtle: "#1E293B",
          darkActive: "#818CF8",
        },

        text: {
          primary: "#0F172A",
          secondary: "#64748B",
          muted: "#94A3B8",

          darkPrimary: "#F1F5F9",
          darkSecondary: "#CBD5F5",
          darkMuted: "#64748B",
        },

        /* 🔘 BUTTONS (optional semantic alias) */
        button: {
          primary: "#4F46E5",
          primaryHover: "#4338CA",
          primaryActive: "#3730A3",

          secondary: "#06B6D4",
          secondaryHover: "#0891B2",
          secondaryActive: "#0E7490",
        },
      },

      keyframes: {
        "bounce-in": {
          "0%": { transform: "translate(-50%, 20px)", opacity: "0" },
          "60%": { transform: "translate(-50%, -5px)", opacity: "1" },
          "100%": { transform: "translate(-50%, 0)", opacity: "1" },
        },
      },
      animation: {
        "bounce-in":
          "bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
      },

      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
        soft: "0 4px 12px rgba(0,0,0,0.05)",
      },

      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },

  plugins: [],
};
