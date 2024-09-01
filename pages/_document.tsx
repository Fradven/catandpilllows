import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <title>Cat & Pillows</title>
                <link rel="icon" href="/images/logo/favicon.png" />
            </Head>
            <body className="min-h-screen bg-background font-sans antialiased">
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
