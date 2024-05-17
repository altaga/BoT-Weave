"use client";
import { createNewUser } from "@/actions/createNewUser";
import styles from "@/app/dashboard/page.module.css";
import ContextModule from "@/utils/contextModule";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { providers } from "ethers";
import React, { useEffect } from "react";
import ApiKeys from "./APIkeys/apikeys";
import Account from "./Account/account";
import Data from "./Data/data";
import Devices from "./Devices/devices";
import Header from "./header";

export default function Home() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [mounted, setMounted] = React.useState(false);
  const context = React.useContext(ContextModule);

  useEffect(() => {
    if (isConnected) {
    } else if (mounted && !isConnected) {
      window.location.href = "/";
    }
  }, [isConnected, mounted]);

  useEffect(() => {
    setTimeout(() => {
      console.log("Mounted");
      setMounted(true);
    }, 2000);
  }, []);

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      {context.state.page === 0 && (
        <div className={styles.main}>
          <Account />
        </div>
      )}
      {context.state.page === 1 && (
        <div className={styles.main}>
          <Devices />
        </div>
      )}
      {context.state.page === 2 && (
        <div className={styles.main}>
          <Data />
        </div>
      )}
      {context.state.page === 3 && (
        <div className={styles.main}>
          <ApiKeys />
        </div>
      )}
    </div>
  );
}
