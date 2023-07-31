import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '500', '700'] })

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={nunito.className}
    >
      <Component {...pageProps} />
    </div>
  );
}
