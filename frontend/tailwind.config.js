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
                search: '#F9F9F9',
                money: '#FF952D',
            },
            dropShadow: {
                navbar: '0px 2px 20px 0 rgba(255,255,255,0.05)',
            },
        },
    },
    plugins: [],
};
