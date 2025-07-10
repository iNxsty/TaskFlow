@@ .. @@
 /** @type {import('tailwindcss').Config} */
 export default {
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
     extend: {
       colors: {
         primary: {
           50: '#fff7ed',
           100: '#ffedd5',
           200: '#fed7aa',
           300: '#fdba74',
           400: '#fb923c',
           500: '#f97316',
           600: '#ea580c',
           700: '#c2410c',
           800: '#9a3412',
           900: '#7c2d12',
         },
+        gray: {
+          650: '#4a5568',
+          750: '#2d3748',
+          850: '#1a202c',
+        }
       },
+      animation: {
+        'in': 'fadeIn 0.2s ease-in-out',
+        'slide-in-from-top-2': 'slideInFromTop 0.2s ease-out',
+        'zoom-in': 'zoomIn 0.2s ease-out',
+      },
+      keyframes: {
+        fadeIn: {
+          '0%': { opacity: '0' },
+          '100%': { opacity: '1' },
+        },
+        slideInFromTop: {
+          '0%': { transform: 'translateY(-8px)', opacity: '0' },
+          '100%': { transform: 'translateY(0)', opacity: '1' },
+        },
+        zoomIn: {
+          '0%': { transform: 'scale(0.95)', opacity: '0' },
+          '100%': { transform: 'scale(1)', opacity: '1' },
+        },
+      },
+      screens: {
+        'xs': '475px',
+      },
     },
   },
   plugins: [],
 }