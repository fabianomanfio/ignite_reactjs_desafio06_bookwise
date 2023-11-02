import { styled } from "@/styles/stitches.config";

export const PageContainer = styled("div", {
  width: "100%",
  margin: "$5 6rem 0 6rem",
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

export const PageWrapper = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 22.5vw",
});

export const LeftSide = styled("section", {
  display: "flex",
  flexDirection: "column",

  marginRight: "4rem",
});

export const InputContainer = styled("form", {
  display: "flex",
  position: "relative",
  alignItems: "center",
  width: "100%",

  marginBottom: "$8",

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

export const EmptyFeedContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$6",

  marginBottom: "$5",

  "& > span": {
    color: "$gray400",
    fontFamily: "$default",
    fontWeight: "$bold",
    lineHeight: "$short",
    fontSize: "$2xl",
  },

  "& > svg": {
    color: "$purple100",
  },
});

export const RatingFeedContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$6",

  marginBottom: "$5",
});

export const RatingContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  "> span": {
    color: "$gray300",
    fontFamily: "$default",
    fontSize: "$sm",
    fontWeight: "$regular",
    lineHeight: "$base",
  },
});

export const RatingCard = styled("article", {
  display: "flex",
  flexDirection: "column",
  gap: "$6",

  padding: "$6",
  background: "$gray700",
  borderRadius: "$md",

  p: {
    color: "$gray300",
    fontFamily: "$default",
    fontSize: "$sm",
    fontWeight: "$regular",
    lineHeight: "$base",
  },
});

export const RatingHeader = styled("header", {
  display: "flex",
  gap: "$6",

  img: {
    maxHeight: "8.3rem",
    width: "auto",
  },

  "> div": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    "> div:first-child": {
      display: "flex",
      flexDirection: "column",

      "> span:first-child": {
        color: "$gray100",
        fontFamily: "$default",
        fontSize: "$lg",
        fontWeight: "$bold",
        lineHeight: "$short",
      },

      "> span:last-child": {
        color: "$gray400",
        fontFamily: "$default",
        fontSize: "$sm",
        fontWeight: "$regular",
        lineHeight: "$base",
      },
    },

    "> div:last-child": {
      display: "flex",
      gap: "$1",
      color: "$purple100",
    },
  },
});

export const RightSide = styled("section", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$8",
  borderLeft: "1px solid $gray700",
  height: "max-content",

  hr: {
    border: 0,
    width: "2rem",
    height: "0.25rem",
    background: "$gradient-horizontal",
    borderRadius: "$full",
  },
});

export const UserProfileHeader = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$5",

  "> div:first-child": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",

    borderRadius: "$full",
    border: "3px solid transparent",
    background:
      "linear-gradient($gray700, $gray700) padding-box, $gradient-vertical border-box",
  },

  "> div:last-child": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "> span:nth-child(1)": {
      color: "$gray100",
      fontFamily: "$default",
      fontSize: "$xl",
      fontWeight: "$bold",
      lineHeight: "$short",
    },

    "> span:nth-child(2)": {
      color: "$gray400",
      fontFamily: "$default",
      fontSize: "$sm",
      fontWeight: "$regular",
      lineHeight: "$base",
    },
  },
});

export const UserAnalyticsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$10",

  // Deveria 3.5rem nas laterais
  padding: "$5 0",

  "> div": {
    display: "flex",
    gap: "$5",
    alignItems: "center",

    svg: {
      color: "$green100",
    },

    "> div": {
      display: "flex",
      flexDirection: "column",

      "> span:first-child": {
        color: "$gray200",
        fontFamily: "$default",
        fontSize: "$md",
        fontWeight: "$bold",
        lineHeight: "$short",
      },

      "> span:last-child": {
        color: "$gray300",
        fontFamily: "$default",
        fontSize: "$sm",
        fontWeight: "$regular",
        lineHeight: "$base",
      },
    },
  },
});
