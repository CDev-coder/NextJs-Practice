/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        background: "#FFF5E6", // Main canvas / page
        card: "#F2E0C9", // Cards / panels / forms
        navbar: "#A8B8A2", // Floating navbar / sticky elements (alternate: #A67C52)
        footer: "#EDE0CF", // Footer

        // Text
        sofwords: "#A67C52", // Primary text
        "sofwords-secondary": "#8C7B6A", // Secondary text / meta info / captions
        "sofwords-disabled": "rgba(140,123,106,0.5)", // Disabled text
        link: "#7DA7C0", // Link / clickable text
        "link-alt": "#EFA78B", // Alternate link / clickable text

        // Buttons
        "btn-primary": "#7DA7C0", // Primary button
        "btn-primary-hover": "#D99A70", // Primary hover
        "btn-secondary": "#EFA78B", // Secondary button
        "btn-secondary-hover": "#F7D78D", // Secondary hover
        "btn-disabled": "rgba(140,123,106,0.5)", // Disabled button
        "btn-text": "#A67C52", // Text buttons / minimal

        // Inputs / Forms
        input: "#F2E0C9", // Input background
        "input-border": "#A67C52", // Input border
        "input-placeholder": "#8C7B6A", // Input placeholder text
        "input-focus": "#7DA7C0", // Focus border / outline
        "input-error": "#F4B8A3", // Error text / warning

        // Navigation
        "nav-text": "#FFF5E6", // Navbar text
        "nav-active": "#EFA78B", // Active tab / category highlight
        "nav-hover": "#D99A70", // Hover / focus

        // Cards / Tiles
        "card-border": "rgba(166,124,82,0.15)", // Card border / shadow
        "card-title": "#A67C52", // Card title
        "card-subtext": "#8C7B6A", // Card description / subtext

        // Icons / Graphics / Decorative accents
        icon: "#A67C52", // Icons in nav or actions
        "icon-alt": "#7DA7C0", // Alternative icons
        accent: "#F7D78D", // Playful icons / stars / lights
        badge: "#F4B8A3", // Badge / highlight

        // Alerts / Messages
        success: "#F7D78D", // Success / positive feedback
        warning: "#EFA78B", // Warning / attention
        error: "#F4B8A3", // Error / negative
        info: "#7DA7C0", // Info / neutral

        // Borders / Dividers
        divider: "rgba(166,124,82,0.25)", // Subtle dividers
        section: "#F2E0C9", // Card borders / section separation

        // Shadows
        "shadow-card": "rgba(166,124,82,0.1)", // Card / modal shadows
        "shadow-floating": "rgba(168,184,162,0.1)", // Floating elements
      },
      fontFamily: {
        sans: ["Merriweather", "serif"], // set Merriweather as the default
      },
    },
  },
  plugins: [],
};
