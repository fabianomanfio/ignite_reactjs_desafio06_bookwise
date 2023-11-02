import { styled } from "../../styles/stitches.config";

export const PageContainer = styled("div", {
  margin: "$5 6rem 0 6rem",

  "@media(max-width: 1102px)": {
    margin: "0 4rem",
  },
});

export const TitleContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",

  margin: "$10 0",

  h1: {
    fontFamily: "$default",
    fontSize: "2xl",
    fontWeight: "$bold",
    lineHeight: "$short",
    color: "$gray100",
  },

  svg: {
    color: "$green100",
  },
});

export const PageWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 22.5vw",

  "@media(max-width: 1102px)": {
    display: "flex",
    flexDirection: "column-reverse",
  },
});

export const LeftSide = styled("main", {
  display: "flex",
  flexDirection: "column",

  marginRight: "4rem",

  "> span, > div:first-child > span": {
    fontFamily: "$default",
    fontSize: "$sm",
    fontWeight: "$regular",
    lineHeight: "$base",
    color: "$gray100",
  },

  "> span": {
    marginBottom: "$4",
  },

  "> div:first-child": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "$4",

    "> a": {
      display: "flex",
      alignItems: "center",
      gap: "$2",

      textDecoration: "none",
      fontFamily: "$default",
      color: "$purple100",
      fontWeight: "$bold",
      fontSize: "$sm",
      lineHeight: "$base",

      padding: "$1 $2",
      borderRadius: "$sm",
      transition: "0.1s ease-in",

      "&:hover": {
        background: "rgba(131, 129, 217, 0.1)",
      },
    },
  },

  "@media(max-width: 1102px)": {
    marginRight: 0,
    width: "calc(100vw - 8rem - 169px)",
  },
});

export const LastActivityContainer = styled("div", {
  display: "flex",
  gap: "$6",

  background: "$gray600",
  padding: "$5 $6",
  borderRadius: "$md",

  marginBottom: "$10",
});

export const LastActivityContent = styled("div", {
  display: "flex",
  flexDirection: "column",

  "> div:nth-child(1)": {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "$3",

    span: {
      fontFamily: "$default",
      color: "$gray300",
      fontSize: "$sm",
      fontWeight: "$regular",
      lineHeight: "$base",
    },

    "> div": {
      display: "flex",
      gap: "$1",
      color: "$purple100",
    },
  },

  "> div:nth-child(2)": {
    display: "flex",
    flexDirection: "column",
    marginBottom: "$6",

    "> span:first-child": {
      fontFamily: "$default",
      color: "$gray100",
      fontSize: "$md",
      fontWeight: "$bold",
      lineHeight: "$short",
    },

    "> span:last-child": {
      fontFamily: "$default",
      color: "$gray400",
      fontSize: "$sm",
      fontWeight: "$regular",
      lineHeight: "$base",
    },
  },

  "> span": {
    fontFamily: "$default",
    color: "$gray300",
    fontSize: "$sm",
    fontWeight: "$regular",
    lineHeight: "$base",

    display: "-webkit-box",
    overflow: "hidden",
    whiteSpace: "pre-wrap",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",

    maxHeight: "calc(1.4rem * 2)",
  },
});

export const RigthSide = styled("aside", {
  display: "flex",
  flexDirection: "column",

  "> div:nth-child(1)": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    fontFamily: "$default",
    fontSize: "$sm",
    lineHeight: "$base",

    marginBottom: "$5",

    "> span": {
      color: "$gray100",
    },

    a: {
      display: "flex",
      alignItems: "center",
      gap: "$2",

      textDecoration: "none",
      color: "$purple100",
      fontWeight: "$bold",
      fontSize: "$sm",
      lineHeight: "$base",

      padding: "$1 $2",
      borderRadius: "$sm",
      transition: "0.1s ease-in",

      "&:hover": {
        background: "rgba(131, 129, 217, 0.1)",
      },
    },
  },

  "> div:nth-child(2)": {
    display: "flex",
    flexDirection: "column",
  },

  "@media(max-width: 1102px)": {
    marginRight: "4rem",
    marginBottom: "$10",
    width: "calc(100vw - 8rem - 169px)",

    "> div:nth-child(2)": {
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: "$2",
      overflow: "auto",
    },
  },
});
