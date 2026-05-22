/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#010101",
          cream: "#FDF3BF",
          gold: {
            DEFAULT: "#E5C414", // Principal
            light: "#DBC975",
            bright: "#E5BF13",
            dark: "#C09926",
            pale: "#D3C575",
          }
        }
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
      backgroundImage: {
        'gold-gradient': "linear-gradient(135deg, #C09926 0%, #E5C414 50%, #DBC975 100%)",
        'gold-gradient-hover': "linear-gradient(135deg, #E5C414 0%, #FDF3BF 50%, #C09926 100%)",
        'dark-radial': "radial-gradient(circle at center, #121212 0%, #010101 100%)",
        'gold-radial-glow': "radial-gradient(circle, rgba(229,196,20,0.1) 0%, rgba(1,1,1,0) 75%)",
      },
      boxShadow: {
        'gold-sm': "0 0 10px rgba(229, 196, 20, 0.15)",
        'gold-md': "0 0 20px rgba(229, 196, 20, 0.3)",
        'gold-lg': "0 0 35px rgba(229, 196, 20, 0.5)",
        'gold-border': "inset 0 0 0 1px rgba(229, 196, 20, 0.2)",
      },
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        // Asegurando alineaciones simétricas estrictas en múltiplos de 8
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)', // Transición ultra-suave y premium
      }
    },
  },
  plugins: [],
}
