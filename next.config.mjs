/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
    reactStrictMode: true,    
    swcMinify: true,          
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"    
}
}


export default withPWA({
    dest: "public",        
    disable: process.env.NODE_ENV === "development",     
    skipWaiting: true,  
        register: true,
        skipWaiting: true,
        fallbacks: {
          document: "/offline",
        },
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'CacheFirst',
            options: {
              cacheName: 'welcome-page-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
            },
          },
          {
            urlPattern: '/product-preview',
            handler: 'CacheFirst',
            options: {
              cacheName: 'product-preview-page-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
            },
          },
        ]   
})(nextConfig);

// export default {
//     async headers() {
//       return [
//         {
//           source: '/(.*)',
//           headers: [
//             {
//               key: 'X-Content-Type-Options',
//               value: 'nosniff',
//             },
//             {
//               key: 'X-Frame-Options',
//               value: 'DENY',
//             },
//             {
//               key: 'Referrer-Policy',
//               value: 'strict-origin-when-cross-origin',
//             },
//           ],
//         },
//         {
//           source: '/sw.js',
//           headers: [
//             {
//               key: 'Content-Type',
//               value: 'application/javascript; charset=utf-8',
//             },
//             {
//               key: 'Cache-Control',
//               value: 'no-cache, no-store, must-revalidate',
//             },
//             {
//               key: 'Content-Security-Policy',
//               value: "default-src 'self'; script-src 'self'",
//             },
//           ],
//         },
//       ]
//     },
//   }

