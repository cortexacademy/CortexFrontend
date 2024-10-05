import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname, Href } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";

export const DrawerItemComponent = ({
  label,
  iconName,
  route,
  onPress,
}: {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  route?: Href;
  onPress?: () => void;
}) => {
  const { appTheme } = useTheme();
  const pathname = usePathname();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (route) {
      router.push(route);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginVertical: 5,
          backgroundColor:
            pathname === route ? appTheme.colors.secondary : "transparent",
        }}
      >
        <Ionicons name={iconName} size={24} color={appTheme.colors.primary} />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            color: appTheme.colors.primary,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
      <Divider color={appTheme.colors.primary} />
    </>
  );
};