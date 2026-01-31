/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  basePath: '/CrochetPixel', 

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig