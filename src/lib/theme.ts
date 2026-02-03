import { createTheme } from "@mui/material/styles";

// Consistent color palette
export const colors = {
  // Primary - Indigo
  primary: {
    main: "#4f46e5",
    light: "#6366f1",
    dark: "#4338ca",
    contrastText: "#ffffff",
  },
  // Success/Published - Emerald (consistent green palette)
  success: {
    main: "#10b981",
    light: "#34d399",
    dark: "#059669",
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    contrastText: "#ffffff",
  },
  // Error - Red
  error: {
    main: "#ef4444",
    light: "#f87171",
    dark: "#dc2626",
  },
  // Warning - Amber
  warning: {
    main: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706",
  },
  // Grey
  grey: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
};

// Shared button styles
const buttonStyles = {
  borderRadius: 8,
  textTransform: "none" as const,
  fontWeight: 500,
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
  },
};

export const theme = createTheme({
  palette: {
    primary: colors.primary,
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
      contrastText: colors.success.contrastText,
    },
    error: colors.error,
    warning: colors.warning,
    grey: colors.grey,
  },
  typography: {
    fontFamily: "inherit",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ...buttonStyles,
          padding: "8px 16px",
        },
        contained: {
          "&:hover": {
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          },
        },
        outlined: {
          borderColor: colors.grey[300],
          color: colors.grey[700],
          "&:hover": {
            backgroundColor: colors.grey[50],
            borderColor: colors.grey[400],
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary.main,
          "&:hover": {
            backgroundColor: colors.primary.dark,
          },
        },
        containedSuccess: {
          backgroundColor: colors.success.main,
          "&:hover": {
            backgroundColor: colors.success.dark,
          },
        },
        outlinedError: {
          borderColor: colors.error.main,
          color: colors.error.main,
          "&:hover": {
            backgroundColor: "rgba(239, 68, 68, 0.04)",
            borderColor: colors.error.dark,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorSuccess: {
          backgroundColor: colors.success[50],
          borderColor: colors.success[200],
          color: colors.success.dark,
          "& .MuiChip-icon": {
            color: colors.success.main,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover": {
            backgroundColor: colors.grey[100],
          },
        },
      },
    },
  },
});
