export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/user/^",
    },
    sitemap: "https://lwskart-g879.onrender.com/sitemap.xml",
  };
}
