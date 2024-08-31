import type { AppProps } from "next/app";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

type NextPageWithLayout = AppProps & {
    Component: AppProps["Component"] & {
        getLayout?: (page: ReactNode) => ReactNode;
    };
};

function App({ Component, pageProps }: NextPageWithLayout) {
    const getLayout = Component.getLayout || ((page: ReactNode) => page);
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider
                defaultTheme="light"
            >
                {getLayout(<Component {...pageProps} />)}
            </NextThemesProvider>
        </NextUIProvider>
    );
}

export const fonts = {
    sans: fontSans.style.fontFamily,
    mono: fontMono.style.fontFamily
};

export default appWithTranslation(App);
