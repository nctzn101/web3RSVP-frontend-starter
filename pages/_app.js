import Layout from "../components/Layout";
import "../styles/globals.css";

// import RainbowKit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

// import modules for chain configuration
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";


// configure chains to be connected to the Infura project 
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const { chains, provider } = configureChains(
  [chain.polygon],
  [infuraProvider( {infuraId }), publicProvider()]
  );

const { connectors } = getDefaultWallets({
  appName: "web3rsvp",
  chains,
});

// initialize wagmiClient
const wagmiClient = createClient({
  autoConnect: true, // keeps user logged in automatically (s.t. only connect wallet once)
  connectors,
  provider,
});

// wrap application with RainbowKitProvider and WagmiConfig
export default function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
