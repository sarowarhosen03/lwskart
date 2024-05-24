import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout(props) {
    const { child, homePage } = props;
    return (
        <html lang="en">
            <body className="selection:bg-primary selection:text-white">
                <SessionProvider>
                    <Header />
                    <NavBar />


                    {child}

                    <Footer />
                </SessionProvider>
            </body>
        </html>
    )
}
