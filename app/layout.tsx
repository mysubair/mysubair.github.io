import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
export const metadata: Metadata = { title: 'Muhammed Yousuf — Atmospheric Research', description: 'PhD Research Scholar at IIT Delhi advancing atmospheric science and environmental intelligence.', keywords: ['Atmospheric Science', 'Aerosols', 'IIT Delhi', 'Environmental Engineering'] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning className={`${inter.variable} ${space.variable}`}><head><script dangerouslySetInnerHTML={{ __html: "try { var theme = localStorage.getItem('theme'); if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme; } catch (e) {}" }} /></head><body>{children}</body></html>; }
