import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": "Instashop - Your One-Stop Shop",
    "short_name": "Instashop",
    "description": "Instashop is a simple and efficient progressive web application built with Next.js, offering a seamless shopping experience.",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "scope": "/",
    "orientation": "portrait",
    "lang": "en-US"
  }
}

