import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import jsconfigPaths from 'vite-jsconfig-paths';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), jsconfigPaths()],
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
});
