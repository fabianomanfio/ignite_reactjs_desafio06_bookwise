import { Layout } from '@/components/Layout';
import { queryClient } from "@/lib/react-query";
import { globalStyles } from "@/styles/globals";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { useRouter } from 'next/router';

globalStyles();
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  // preload: true,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <div className={nunito.className}>
        <QueryClientProvider client={queryClient}>
          {router.pathname === "/" ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </QueryClientProvider>
      </div>
    </SessionProvider>
  );
}

