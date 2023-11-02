import { keyframes, styled } from "@/styles/stitches.config";
import * as RadixDialog from "@radix-ui/react-dialog";

const dialogEntrance = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const dialogExit = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

export const Overlay = styled(RadixDialog.Overlay, {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  inset: 0,
  background: "#00000075",

  animation: `${dialogEntrance} 300ms ease-out`,
});

export const ContentContainer = styled(RadixDialog.Content, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  display: "flex",
  flexDirection: "column",
  justifyItems: "center",

  background: "$gray700",
  padding: "3.5rem 4.5rem",
  width: "516px",

  "&[data-state='open']": {
    animation: `${dialogEntrance} 300ms ease-out`,
  },

  "&[data-state='closed']": {
    animation: `${dialogExit} 300ms ease-out`,
  },
});

export const CloseButton = styled(RadixDialog.Close, {
  position: "absolute",
  top: "1rem",
  right: "1rem",

  border: "none",
  background: "transparent",
  color: "$gray400",
  fontSize: 0,

  "&:hover": {
    cursor: "pointer",
    color: "$gray300",
  },
});

export const Title = styled(RadixDialog.Title, {
  fontFamily: "$default",
  fontSize: "$4",
  fontWeight: "$bold",
  lineHeight: "$short",
  marginBottom: "$10",
  textAlign: "center",
});

export const ButtonContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});