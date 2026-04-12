export default {
  darkMode: "class", // enable dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#06B6D4",

        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-danger)",
        errorBg: "var(--color-danger-bg)",

        mainBg: "var(--color-bg-main)",
        cardBg: "var(--color-bg-card)",
        hoverBg: "var(--color-bg-hover)",
        sidebarBg: "var(--color-bg-sidebar)",
        accentBg: "var(--color-bg-accent)",
        inputBg: "var(--color-bg-input)",

        content: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          placeholder: "var(--color-text-placeholder)",
        },

        line: {
          main: "var(--color-border-main)",
          subtle: "var(--color-border-subtle)",
        },

        status: {
          todoText: "var(--color-todo-text)",
          todoBg: "var(--color-todo-bg)",
          progressText: "var(--color-progress-text)",
          progressBg: "var(--color-progress-bg)",
          doneText: "var(--color-done-text)",
          doneBg: "var(--color-done-bg)",
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
    },
  },

  plugins: [],
};
