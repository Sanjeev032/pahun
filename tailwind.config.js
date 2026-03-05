/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                luxury: {
                    black: "#121212",
                    gold: "#C5A039",
                    goldLight: "#DFBA69",
                    ivory: "#FDFCF8",
                    gray: {
                        dark: "#2A2A2A",
                        medium: "#757575",
                        light: "#E0E0E0",
                    }
                }
            },
            fontFamily: {
                serif: ["'Playfair Display'", "serif"],
                sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
            },
            letterSpacing: {
                widest: ".25em",
                extra: ".5em",
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
