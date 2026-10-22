import { createTheme } from "@mui/material/styles";

export const colors = { bg: "#0B0B0D", text: "#F5F5F2", muted: "#92929A", accent: "#C6FF4D", border: "rgba(245,245,242,0.12)" };
const font = '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: colors.bg, paper: "#121215" },
    text: { primary: colors.text, secondary: colors.muted },
    primary: { main: colors.accent, contrastText: colors.bg },
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: font,
    h1: { fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.95 },
    h2: { fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 },
    h3: { fontWeight: 500, letterSpacing: "-0.015em" },
    body1: { lineHeight: 1.65, fontWeight: 300 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { padding: "12px 22px" } } },
    MuiDialog: { styleOverrides: { paper: { backgroundImage: "none", border: `1px solid ${colors.border}` } } },
  },
});
