/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    important: true,
    theme: {
        extend: {
            colors: {
                main: '#33A0FF',
                second: '#F2F2F2',
                background: '#F2F2F2',
                gray1: '#C7C7C7',
                gray2: '#3D3D3D',
                gray3: '#D9D9D9',
                search: '#F9F9F9',
                money: '#FF952D',
                red: '#FF3333',
            },
        },
    },
    plugins: [],
};
