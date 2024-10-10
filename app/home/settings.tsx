import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";

const SettingsScreen = () => {
  const { currentTheme, setCurrentTheme, appTheme } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: appTheme.colors.background }]}>
      <Text style={[styles.text, { color: appTheme.colors.text }]}>
        Current Theme: {currentTheme}
      </Text>
      <Button title="Set to Auto" color={appTheme.colors.primary} onPress={() => setCurrentTheme("auto")} />
      <Button title="Set to Dark" color={appTheme.colors.secondary} onPress={() => setCurrentTheme("dark")} />
      <Button title="Set to Light" color={appTheme.colors.primary} onPress={() => setCurrentTheme("light")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default SettingsScreen;
