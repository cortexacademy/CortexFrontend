import React from "react";
import { View, Image, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export const CustomDrawerContent = (props: any) => {
  const { appTheme } = useTheme();
  const pathname = usePathname();

  return (
    <View style={{ flex: 1, backgroundColor: appTheme.colors.primary, paddingTop: 50 }}>
      <View style={{ height: 180, alignItems: 'center', padding: 4 }}>
        <View style={{ width: "100%", position: 'relative', height: 80 }}>
          <View style={{
            position: "absolute",
            top: 10,
            width: "100%",
            height: 6,
            backgroundColor: appTheme.colors.tertiary,
            borderRadius: 5
          }} />
          <View style={{
            position: "absolute",
            top: 40,
            width: "85%",
            height: 6,
            backgroundColor: appTheme.colors.tertiary,
            borderRadius: 5
          }} />
          <View style={{
            position: "absolute",
            top: 70,
            width: "70%",
            height: 6,
            backgroundColor: appTheme.colors.tertiary,
            borderRadius: 5
          }} />
        </View>

        <View style={{ position: "absolute", top: -5, zIndex: 10 }}>
          <View
            style={{
              width: 96,
              height: 96,
              backgroundColor: 'white',
              borderRadius: 48,
              borderColor: appTheme.colors.tertiary,
              borderWidth: 4,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{ color: appTheme.colors.tertiary, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}
          >
            Welcome, Dr. Khush
          </Text>
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        style={{ flex: 1, backgroundColor: appTheme.colors.tertiary }}
      >
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={pathname === "/home/settings" ? appTheme.colors.active : appTheme.colors.inactive}
            />
          )}
          label="Settings"
          labelStyle={{
            color: pathname === "/home/settings" ? appTheme.colors.active : appTheme.colors.inactive,
          }}
          style={{
            backgroundColor: pathname === "/home/settings" ? appTheme.colors.secondary : appTheme.colors.primary,
          }}
          onPress={() => {
            router.push("/home/settings");
          }}
        />

        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={pathname === "/home/settings" ? appTheme.colors.active : appTheme.colors.inactive}
            />
          )}
          label="Settings"
          labelStyle={{
            color: pathname === "/home/settings" ? appTheme.colors.active : appTheme.colors.inactive,
          }}
          style={{
            backgroundColor: pathname === "/home/settings" ? appTheme.colors.secondary : appTheme.colors.primary,
          }}
          onPress={() => {
            router.push("/home/settings");
          }}
        />

      </DrawerContentScrollView>
    </View>
  );
};
