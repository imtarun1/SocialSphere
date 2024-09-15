
import { Metadata } from "next";
import ReduxProvider from "@/redux/ReduxProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./ErrorBoundary";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { Urbanist } from "next/font/google"
import Head from "next/head";
import { getAuthorized } from "@/frameworks/auth/authorized";
const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' })

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const authorized = await  getAuthorized();
    return (
        <html lang="en">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <body className={`${urbanist.variable} font-sans`}>
                <ReduxProvider authorized={authorized}>
                    <ErrorBoundary>{children}</ErrorBoundary>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                    />
                </ReduxProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
