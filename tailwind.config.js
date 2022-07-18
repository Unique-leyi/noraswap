// default settings can be found here
// https://unpkg.com/browse/tailwindcss@2.2.17/stubs/defaultConfig.stub.js

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'false' or 'class'
  theme: {
     screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
     extend: {
      colors: {
        primary: '#0f1114',
        secondary: {
          100: "#12161c",
        },
        siteblue: '#3bacb5',
        sitepurple: '#6867c5',
      
        animation: {
            text:'text 5s ease infinite',
        },
        keyframes: {
            text: {
                '0%, 100%': {
                   'background-size':'200% 200%',
                    'background-position': 'left center'
                },
                '50%': {
                   'background-size':'200% 200%',
                    'background-position': 'right center'
                }
            },
        }
      },

      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },

      backgroundImage: {
        'arrow-down': "url('/img/arrow-down.svg')",
      }

      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require("@tailwindcss/forms")],
  daisyui: {
    styled: true,
    themes: [
      // first one will be the default theme
      "dark",
      // uncomment to enable
      // "light (default)",
      // "dark",
      // "cupcake",
      // "bumblebee",
      // "emerald",
      // "corporate",
      // "synthwave",
      // "retro",
      // "cyberpunk",
      // "valentine",
      // "halloween",
      // "garden",
      // "forest",
      // "aqua",
      // "lofi",
      // "pastel",
      // "fantasy",
      // "wireframe",
      // "black",
      // "luxury",
      // "dracula",
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
