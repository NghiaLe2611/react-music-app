# react-music-app
 
# Install ViteJS
npm create vite@latest react-app --template react
npm install
npm run dev

# Install Tailwindcss
npm install -D tailwindcss
npx tailwindcss init

# Create jsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
            "*": [
                "*"
            ]
        },
    }
}

# Set up Tailwindcss with vite
// vite.config.js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
css: {
    postcss: {
        plugins: [tailwindcss, autoprefixer],
    },
},