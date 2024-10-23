import { Platform } from "react-native";

const baseTheme = {
  colors: {
    primary: "#16423C", // Lighter green
    secondary: "#6A9C89", // Main green
    tertiary: "#C4DAD2", // More Lighter green
    quaternary: "#E9EFEC", // quaternary color
    white: "#fff",
    grey: "#E9EFEC", // Grey color
    border: "#6A9C89", // Border color (muted greenish)
    active: "#6A9C89", // Active color
    inactive: "#AAAAAA", // Gray for inactive state
    contrast: "#FFFFFF", // White for contrast
    mutedText: "#808080", // Muted gray text
    errorText: "#D32F2F", // A dark red
    errorBackground: "#FDECEA", // Soft pale red/pink
    inputBackground: "#E9EFEC", // Input background
    placeholder: "#AAAAAA", // Placeholder gray text
    inputicon: "#16423C", // Input icon color
    darkgray: "#6d7580",
    midgray: "#aab0b7",
    lightgray: "#ebebeb",
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    extraLarge: 24,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  fontFamily: Platform.select({
    ios: "-apple-system",
    android: "Roboto",
    default: "sans-serif",
  }),
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
};

export const theme = {
  light: {
    colors: {
      ...baseTheme.colors,
      headerBackground: "#16423C", // Background color for headers
      background: "#16423C", // Light background
      secondaryBackground: "#6A9C89", // Secondary background
      text: "#16423C", // Dark text
      textPrimary: "#16423C", // Primary text color
      textSecondary: "#16423C", // Secondary text color
      activeBackground: "#F0F0F0", // Light active background
    },
    fontSizes: baseTheme.fontSizes,
    spacing: baseTheme.spacing,
    fontFamily: baseTheme.fontFamily,
    borderRadius: baseTheme.borderRadius,
  },
  dark: {
    colors: {
      ...baseTheme.colors,
      headerBackground: "#16423C", // Dark background for headers
      background: "#C4DAD2", // Dark background
      secondaryBackground: "#16423C", // Secondary background
      text: "#E9EFEC", // Light text
      textPrimary: "#E9EFEC", // Light primary text color
      textSecondary: "#C4DAD2", // Light secondary text color
      activeBackground: "#333333", // Dark active background
      inactive: "#fff", // White for inactive state
    },
    fontSizes: baseTheme.fontSizes,
    spacing: baseTheme.spacing,
    fontFamily: baseTheme.fontFamily,
    borderRadius: baseTheme.borderRadius,
  },
};
