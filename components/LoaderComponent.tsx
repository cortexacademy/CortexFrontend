import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

export const Loader = () => {
  const { appTheme } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: appTheme.colors.background }}>
      <ActivityIndicator size="large" color={appTheme.colors.text} />
      {/* <Text style={{ marginTop: 16, color: appTheme.colors.text }}>Loading...</Text> */}
    </View>
  );
};
