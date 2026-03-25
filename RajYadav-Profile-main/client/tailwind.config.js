/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0E2431', // Navy Blue
                    hover: '#1a3a4d',
                },
                accent: {
                    DEFAULT: '#FFA500', // Orange
                    hover: '#e69500',
                },
                background: {
                    light: '#E5ECFB', // Light Periwinkle
                }
            },
            fontFamily: {
                sans: ['Nunito', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '1.5rem',
                screens: {
                    '2xl': '1280px',
                },
            },
        },
    },
    plugins: [],
}
