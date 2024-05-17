'use client';
import { ContextProvider } from "@/utils/contextModule";
import { Web3Modal } from "@/utils/web3Modal";
import { ThemeProvider, createTheme } from "@mui/material";
import { common } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f0b90b",
    },
    secondary: {
      main: common.black,
    },
  },
});

export default function Providers({ children }) {
  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <Web3Modal>{children}</Web3Modal>
      </ThemeProvider>
    </ContextProvider>
  );
}
