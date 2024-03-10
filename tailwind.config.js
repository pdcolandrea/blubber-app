/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        incon_light: ['Inconsolata_300Light'],
        incon: ['Inconsolata_400Regular'],
        incon_semibold: ['Inconsolata_600SemiBold'],
        incon_bold: ['Inconsolata_700Bold'],
        incon_extrabold: ['Inconsolata_800ExtraBold'],
        incon_black: ['Inconsolata_900Black'],
      },
    },
  },
  plugins: [],
};
