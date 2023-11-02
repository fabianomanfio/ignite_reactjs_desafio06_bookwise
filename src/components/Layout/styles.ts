import { styled } from "@/styles/stitches.config";
import Link from "next/link";
import backGroundImage from "../../assets/sidebar_background_image.svg";

export const LayoutWrapper = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  minHeight: "100vh",
});

export const MenuContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",

  height: "calc(100vh - 2.50rem)",
  width: "14.5rem",
  minWidth: "169px",

  backgroundImage: `url(${backGroundImage.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",

  borderRadius: "$md",
  margin: "$5 0 $5 $5",
  boxShadow: "0 2px 2px rgba(0,0,0,0.1)",

  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "$10",
  },
});

export const NavMenu = styled("nav", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  marginTop: "4rem",
});

export const NavLink = styled(Link, {
  display: "flex",
  justifyContent: "center",
  gap: "$3",

  marginBottom: "$6",

  textDecoration: "none",
  fontSize: "$md",
  lineHeight: "$base",

  transition: "0.1s ease-in",

  "&:hover": {
    color: "$gray100",
  },

  variants: {
    selected: {
      true: {
        fontWeight: "bold",
        position: "relative",
        color: "$gray100",

        "&::before": {
          content: "",
          position: "absolute",
          width: "0.25rem",
          height: "1.5rem",
          borderRadius: "$md",
          background: "$gradient-vertical",
          top: 0,
          bottom: 0,
          left: "-1.25rem",
        },
      },

      false: {
        color: "$gray400",
      },
    },
  },
});

export const LoginButton = styled("button", {
  display: "flex",
  justifyContent: "center",
  gap: "$3",
  marginBottom: "1.75rem",

  border: "none",
  background: "transparent",

  svg: {
    transition: "0.2s ease-in",
  },

  span: {
    color: "$gray200",
    fontFamily: "$default",
    fontSize: "$md",
    fontWeight: "$bold",
    lineHeight: "$base",
  },

  "&:hover": {
    cursor: "pointer",

    svg: {
      transform: "translateX(0.3rem)",
    },
  },
});

export const ProfileContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",

  marginBottom: "$6",
  color: "$gray100",
  fontFamily: "$default",
  fontSize: "$sm",
  fontWeight: "$regular",
  lineHeight: "$base",

  span: {
    width: "4rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  "> div": {
    width: "2rem",
    height: "2rem",

    overflow: "hidden",
    borderRadius: "$full",
    border: "1px solid transparent",
    background:
      "linear-gradient($gray700, $gray700) padding-box, $gradient-vertical border-box",

    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },

  "> button": {
    border: "none",
    background: "transparent",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    transition: "0.2s ease-in",

    "&:hover": {
      cursor: "pointer",
      transform: "TranslateX(0.3rem)",
    },
  },
});
