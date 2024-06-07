/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },
  i18n: {
    locales: ["en", "ru",'bn', "hin"],
    defaultLocale: "en",
  },
};

export default nextConfig;
