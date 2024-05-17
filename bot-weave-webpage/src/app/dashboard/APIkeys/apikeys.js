import { getCookie, setCookie } from "@/actions/cookies";
import { createAPIkey } from "@/actions/createAPIkey";
import { Button } from "@mui/material";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { providers } from "ethers";
import React, { Fragment, useEffect } from "react";

export default function ApiKeys() {
  // States
  const [apikey, setApiKey] = React.useState(null);
  // Hooks
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const checkAndCreateApiKey = async () => {
    try {
      const ethersProvider = new providers.Web3Provider(walletProvider);
      const wallet = ethersProvider.getSigner();
      const signature = await wallet.signMessage("Account Signature");
      const result = await createAPIkey(address, signature);
      if (result === "No User Created" || result === "Bad Request") {
        throw new Error(result);
      } else if (result.length === 32) {
        await setCookie("apikey", result);
        setApiKey(result);
      } else {
        throw new Error(result);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const getApiKeys = async () => {
    getCookie("apikey")
      .then((res) => {
        setApiKey(res);
      })
      .catch(() => {
        console.log("No API key found");
      });
  };

  useEffect(() => {
    getApiKeys();
  }, []);

  return (
    <Fragment>
      {apikey ? (
        <Fragment>
          <h1>Your API Key</h1>
          <h3>API Key: {apikey}</h3>
          <Button
            variant="contained"
            color="primary"
            style={{ fontWeight: "bold", marginTop: "20px" }}
            onClick={checkAndCreateApiKey}
          >
            Rotate API Key
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <h1>No API Keys created yet</h1>
          <h3>Create a new API Key</h3>
          <Button
            variant="contained"
            color="primary"
            style={{ fontWeight: "bold", marginTop: "20px" }}
            onClick={checkAndCreateApiKey}
          >
            Create API Key
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
}
