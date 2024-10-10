import React, { useState } from "react";
import { View, Image, Text, Share } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname, Href } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { DrawerItemComponent } from "./DrawerItem";

export const SubmenuComponent = ({
  label,
  iconName,
  items,
}: {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  items: {
    label: string;
    iconName: keyof typeof Ionicons.glyphMap;
    route: Href
  }[];
}) => {
  const [expanded, setExpanded] = useState(false);
  const { appTheme } = useTheme();

  return (
    <>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginVertical: 5,
          backgroundColor: expanded ? appTheme.colors.secondary : "transparent",
        }}
      >
        <Ionicons
          name={iconName}
          size={24}
          color={appTheme.colors.primary}
        />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            color: appTheme.colors.primary,
          }}
        >
          {label}
        </Text>
        <Ionicons
          name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color={appTheme.colors.primary}
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={{ paddingLeft: 30 }}>
          {items.map((item, index) => (
            <DrawerItemComponent
              key={index}
              label={item.label}
              iconName={item.iconName}
              route={item.route}
            />
          ))}
        </View>
      )}
      <Divider color={appTheme.colors.primary} />
    </>
  );
};
