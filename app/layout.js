import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from "@/components/ScrollToTop";
import HeroNavBar from "@/components/HeroNavBar";

export const metadata = {
  title: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/bdogrotesk"
          rel="stylesheet"
        />
      </head>
      <body>
        <HeroNavBar />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
