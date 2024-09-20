/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: [' "Nunito Sans", sans-serif'],
      },
      backgroundImage: {
        'progress-img': 'url("progress.png")',
        'login-p-img' : 'url("Login-Page-img.png")',
      },
      boxShadow: {
        'custom-blue': '0px 4px 14px 0px #3F8CFF63', 
      },
      
    },
  },
  plugins: [
    require('daisyui'),
    // require('preline/plugin'),
    require('flowbite/plugin'),

    function ({addUtilities}) {
      const newUtilities = {
          '.no-scrollbar::-webkit': {
            display: "none",
          },
          '.no-scrollbar':{
            '-ms-overflow-style':'none',
            "scrollbar-width":"none",
          }
      }
      addUtilities(newUtilities)
    }
  ],
}

//  0px 6px 58px 0px #C4CBD61A;
