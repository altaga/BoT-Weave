import ConnectButton from "@/components/connectButton";
import ContextModule from "@/utils/contextModule";
import { Button, ButtonGroup } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Header({ className }) {
  const context = React.useContext(ContextModule);
  return (
    <div className={className}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <Image
          src="/logo.webp"
          alt="logo"
          width={50}
          height={50}
          style={{
            border: "4px solid black",
            borderRadius: "100px",
            fontFamily: "iter",
          }}
          priority
        />
        <h1>BoT Weave</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <ButtonGroup variant="contained" aria-label="Button group">
          <Button
            disabled={context.state.page === 0}
            onClick={() => context.setState({ page: 0 })}
            style={{ fontWeight: "bold" }}
          >
            Account
          </Button>
          <Button
            disabled={context.state.page === 1}
            onClick={() => context.setState({ page: 1 })}
            style={{ fontWeight: "bold" }}
          >
            Devices
          </Button>
          <Button
            disabled={context.state.page === 2}
            onClick={() => context.setState({ page: 2 })}
            style={{ fontWeight: "bold" }}
          >
            Data
          </Button>
          <Button
            disabled={context.state.page === 3}
            onClick={() => context.setState({ page: 3 })}
            style={{ fontWeight: "bold" }}
          >
            API Keys
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}
