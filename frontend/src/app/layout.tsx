import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import AuthContextContainer from '@/context/AuthContextContainer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import localfont from 'next/font/local';
import ReactQueryProvider from '../Provider/ReactQueryProvider';

const fontPrimary = localfont({
  src: [
    {
      path: './../../public/fonts/grifterbold.otf',
      weight: '400,500,600,700',
    },
  ],
  variable: '--font-fontPrimary',
});

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Note Nestle',
  description:
    "NoteNestle is a web application stack-based college notes website. It serves as a centralized platform for students to access branch-wise study materials, including notes, PowerPoint presentations (PPTs), and previous years' question papers (PYQs).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <AuthContextContainer>
          <body className={`${jakarta.className} ${fontPrimary.variable} `}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </body>
        </AuthContextContainer>
      </ReactQueryProvider>
    </html>
  );
}
