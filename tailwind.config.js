/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,ts}'
    ],
    mode: 'jit',
    plugins: [],
    purge: {
        enabled: true,
        content: [
            './src/**/*.{html,ts}'
        ]
    },
    theme: {
        extend: {}
    }
}
