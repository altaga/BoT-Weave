"use client";
import React, { useCallback, useEffect } from "react";
import styles from "@/app/page.module.css";
import ConnectButton from "@/components/connectButton";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { providers } from "ethers";
import { createNewUser } from "@/actions/createNewUser";
import { getCookie, setCookie } from "@/actions/cookies";
import Image from "next/image";

export default function Home() {
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const checkAndCreateAccount = useCallback(async () => {
    try {
      const ethersProvider = new providers.Web3Provider(walletProvider);
      const wallet = ethersProvider.getSigner();
      const signature = await wallet.signMessage("Account Signature");
      const result = await createNewUser(address, signature);
      if (result === "Request Ok") {
        await setCookie("flag", "true");
        window.location.href = "/dashboard";
      } else if (result === "User Already Exist") {
        await setCookie("flag", "true");
        window.location.href = "/dashboard";
      } else {
        throw new Error(result);
      }
    } catch (err) {
      console.log({ err });
    }
  }, [address, walletProvider]);

  const decide = useCallback(async () => {
    getCookie("flag")
      .then((res) => {
        if (res === true) {
          window.location.href = "/dashboard";
        } else {
          checkAndCreateAccount();
        }
      })
      .catch(() => {
        checkAndCreateAccount();
      });
  }, [checkAndCreateAccount]);

  useEffect(() => {
    if (isConnected) {
      decide();
    }
  }, [isConnected, decide]);

  const size = 200;
  return (
    <div className={styles.container}>
      <Image
        src="/logo.webp"
        alt="logo"
        width={size}
        height={size}
        style={{
          marginBottom: "20px",
          border: "4px solid black",
          borderRadius: size / 2,
          fontFamily: "iter",
        }}
        priority
      />
      <div className={styles.title}>Access to BoT Weave Dashboard</div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}
