import { getObjectsData } from "@/actions/getObjectsData";
import DataTable from "@/components/dataTable";
import ContextModule from "@/utils/contextModule";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useContext, useEffect, useState } from "react";

const columns = [
  { id: "sensor", label: "Sensor Tag", minWidth: 150, data: true },
  { id: "date", label: "Date", minWidth: 150, data: true },
  { id: "time", label: "Time", minWidth: 150, data: true },
  { id: "name", label: "File Name", minWidth: 150, url: true },
  { id: "explorer", label: "Explorer", minWidth: 150, explorer: true },
];

export default function Data() {
  const { address } = useWeb3ModalAccount();
  const [loading, setLoading] = useState(false);
  const context = useContext(ContextModule);
  const check = async () => {
    setLoading(true);
    const data = await getObjectsData(address);
    context.setState({ data });
    setLoading(false);
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: "100%" }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" component="div">
            Sensors Data
          </Typography>
          <IconButton
            disabled={loading}
            onClick={() => check()}
            color="secondary"
            aria-label="refresh"
          >
            <CachedIcon />
          </IconButton>
        </Stack>
      </Box>
      <Divider />
      <Box>
        <div style={{ width: "100%", height: "50vh" }}>
          <DataTable rows={context.state.data} columns={columns} />
        </div>
      </Box>
    </Card>
  );
}
