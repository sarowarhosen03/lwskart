import AppContextProvider from "@/context";
import { runCleaner } from "@/lib/cron/releaseCartItems";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SessionProvider } from "next-auth/react";
import { Poppins, Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Lwskart - Online Shopping",
  description: "Discover the best products online",
  image: "public/assets/images/logo.svg",
};

export default async function RootLayout({ children }) {
  await runCleaner();
  return (
    <html lang="en">
      <body className="selection:bg-primary selection:text-white">
        <SessionProvider>
          <AppContextProvider>{children}</AppContextProvider>
        </SessionProvider>
        <ToastContainer position="bottom-center" limit={2} />
      </body>
    </html>
  );
}
