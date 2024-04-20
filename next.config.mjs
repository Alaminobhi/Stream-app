/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
    BASE_URL: process.env.DB_HOST,
    },
    };

export default nextConfig;
