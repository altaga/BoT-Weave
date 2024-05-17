import { getObjectsData } from "@/actions/getObjectsData";
import ContextModule from "@/utils/contextModule";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { providers, utils } from "ethers";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";

function convertInJSON(data) {
  let tempJson = {};
  data.reverse().forEach((obj) => {
    tempJson[obj.sensor] = obj;
  });
  return tempJson;
}

export default function Account() {
  const { address } = useWeb3ModalAccount();
  const [balance, setBalance] = useState(0);
  const { walletProvider } = useWeb3ModalProvider();
  const [loading, setLoading] = useState(false);
  const context = useContext(ContextModule);

  const checkBalance = useCallback(
    async () => {
      const ethersProvider = new providers.Web3Provider(walletProvider);
      const balance = await ethersProvider.getBalance(address);
      setBalance(utils.formatEther(balance));
    },
    [walletProvider]
  );

  const check = useCallback(async () => {
    setLoading(true);
    const data = await getObjectsData(address);
    context.setState({ data });
    setLoading(false);
  }, [address, context, getObjectsData]);

  useEffect(() => {
    checkBalance();
    check();
  }, []);

  return (
    <Card variant="outlined" sx={{ width: "50%", margin: "20px" }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" component="div">
            BNB Greenfield Account
          </Typography>
          <IconButton
            disabled={loading}
            onClick={() => {
              checkBalance(address);
              check();
            }}
            color="secondary"
            aria-label="refresh"
          >
            <CachedIcon />
          </IconButton>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography gutterBottom variant="h6" component="div">
              <Link href={`https://greenfieldscan.com/address/${address}`} target="_blank" rel="noopener noreferrer" >
                {address}
              </Link>
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h5" component="div">
              {balance} BNB
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography gutterBottom variant="h5" component="div">
              Sensors Counter
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Data Counter
            </Typography>
          </Stack>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Typography gutterBottom variant="h5" component="div">
              {Object.keys(convertInJSON(context.state.data)).length}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {context.state.data.length}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
