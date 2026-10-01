import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Caveat, Inter } from "next/font/google";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { localeDirection, routing, type Locale } from "@/i18n/routing";
import { ParallaxBackdrop } from "@/components/parallax-backdrop";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatWidget } from "@/components/chat-widget";
import "../globals.css";

// The single site font, used for all text except the handwritten notes.
// Variable weight plus the optical-size axis, which tightens letterforms at
// display sizes for the compact headline style.
const inter = Inter({
  variable: "--font-sans-latin",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Handwritten face for the hero's small editorial notes.
const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
});

const GA_MEASUREMENT_ID = "G-HWKPE0QMPT";
const CLARITY_PROJECT_ID = "y262v7mceu";

export const metadata: Metadata = {
  title: "Bidhra",
  description:
    "Funding for Palestinian project owners. Verified ideas, global supporters.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const dir = localeDirection[locale as Locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ParallaxBackdrop />
        <NextIntlClientProvider>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `}
      </Script>
    </html>
  );
}
