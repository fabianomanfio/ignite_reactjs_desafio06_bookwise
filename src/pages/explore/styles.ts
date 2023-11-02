import { styled } from "@/styles/stitches.config";

export const PageContainer = styled("div", {
  width: "100%",
  margin: "$5 6rem 0 6rem",
});

export const PageHeader = styled("header", {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",

  margin: "$10 0",

  "> div": {
    display: "flex",
    alignItems: "center",
    gap: "$3",

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
  },
});

export const InputContainer = styled("form", {
  display: "flex",
  position: "relative",
  alignItems: "center",
  maxWidth: "24rem",
  minWidth: "40%",

  input: {
    outline: 0,
    background: "transparent",
    color: "$gray200",
    border: "1px solid $gray500",
    borderRadius: "$sm",
    width: "100%",

    padding: "$3 2.5rem $3 $5",

    "&::placeholder": {
      color: "$gray400",
    },

    "&:focus": {
      border: "1px solid $green200",
      caretColor: "$green200",

      "~ svg": {
        color: "$green200",
      },
    },
  },

  svg: {
    position: "absolute",
    right: "-0.5rem",

    marginRight: "$5",
    color: "$gray500",
  },
});

export const CategoryContainer = styled("nav", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "$3",

  marginBottom: "3rem",
});

export const CategoryButton = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  padding: "0 $4",
  border: "1px solid $purple100",
  background: "transparent",
  borderRadius: "$full",

  color: "$purple100",
  fontFamily: "$default",
  fontSize: "$md",
  fontWeight: "$regular",
  lineHeight: "$base",

  "&:hover": {
    cursor: "pointer",
    background: "$purple200",

    color: "$gray100",
  },

  variants: {
    selected: {
      true: {
        background: "$purple200",
        borderColor: "transparent",
        color: "$gray100",

        "&:hover": {
          borderColor: "$purple100",
        },
      },
    },
  },
});

export const BookListContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "$5",
  marginBottom: "$5",

  width: "100%",
});

export const BookCard = styled("button", {
  display: "flex",
  gap: "$5",

  padding: "$5 $5",
  background: "$gray700",
  borderRadius: "$md",
  border: "2px solid transparent",

  "&:hover": {
    cursor: "pointer",
    borderColor: "$gray600",
  },

  variants: {
    readed: {
      true: {
        position: "relative",
        overflow: "hidden",

        "&::before": {
          content: "LIDO",

          position: "absolute",
          top: 0,
          right: 0,

          background: "$green300",
          padding: "$1 $3",
          borderRadius: "0 0 0 0.25rem",

          color: "$green100",
          fontFamily: "$default",
          fontSize: "$xs",
          fontWeight: "$bold",
          lineHeight: "$shorter",
        },
      },
    },
  },
});

export const BookCardInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",

  height: "100%",
  textAlign: "start",

  "& > div:first-child": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    "& > span:first-child": {
      color: "$gray100",
      fontFamily: "$default",
      fontSize: "$md",
      fontWeight: "$bold",
      lineHeight: "$short",

      display: "-webkit-box",
      overflow: "hidden",
      whiteSpace: "pre-wrap",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
    },

    "& > span:last-child": {
      color: "$gray400",
      fontFamily: "$default",
      fontSize: "$sm",
      fontWeight: "$regular",
      lineHeight: "$base",
    },
  },

  "& > div:last-child": {
    display: "flex",
    gap: "$1",

    color: "$purple100",
  },
});
