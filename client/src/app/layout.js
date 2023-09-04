import './globals.css'
import { Inter } from 'next/font/google'
import {MoodosProvider} from "@/util/store";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Moodo List',
  description: 'Todo List created by Saksham Gupta',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <head>
              <link rel="icon" href="static/favicon.ico" />
          </head>
          <body className={inter.className}>
              <MoodosProvider>{children}</MoodosProvider>
          </body>
      </html>
  );
}
