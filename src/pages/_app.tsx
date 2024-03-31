import "@/styles/globals.css";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider, cookieStorage, createStorage } from "wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

import {
	mainnet,
} from "wagmi/chains";

const chains = [
	mainnet,
] 

// 1. Get projectID at https://cloud.walletconnect.com

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
	name: "Next Starter Template",
	description: "A Next.js starter template with Web3Modal v3 + Wagmi",
	url: "https://web3modal.com",
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
})

createWeb3Modal({ wagmiConfig, projectId });

export default function App({ Component, pageProps }: AppProps) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setReady(true);
	}, []);
	return (
		<>
			{ready ? (
				<WagmiProvider config={wagmiConfig}>
					  <QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
					</QueryClientProvider>
				</WagmiProvider>
			) : null}
		</>
	);
}
