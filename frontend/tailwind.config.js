/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                main: '#33A0FF',
                second: '#F2F2F2',
                gray1: '#C7C7C7',
                gray2: '#3D3D3D',
            },
        },
    },
    plugins: [],
};
