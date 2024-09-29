import React from "react";
import { View, Image, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export const CustomDrawerContent = (props: any) => {
  const { appTheme } = useTheme()
  const pathname = usePathname();

  // useEffect(() => {
  //   console.log(pathname);
  // }, [pathname]);

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: appTheme.colors.headerBackground, padding: 4 }}
    >
      <View style={{ position: 'relative', height: 150, alignItems: 'center' }}>
        <View style={{ width: "100%", position: 'relative', height: 80 }}>
          <View style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: 4,
            backgroundColor: appTheme.colors.primary,
            borderRadius: 1.5
          }}

          />
          <View style={{
            position: "absolute",
            top: 40,
            width: "80%",
            height: 4,
            backgroundColor: appTheme.colors.primary,
            borderRadius: 1.5
          }} />
          <View style={{
            position: "absolute",
            top: 80,
            width: "60%",
            height: 4,
            backgroundColor: appTheme.colors.primary,
            borderRadius: 1.5
          }} />
        </View>

        <View style={{ position: "absolute", top: -5, zIndex: 10 }}>
          <View
            style={{
              width: 96,
              height: 96,
              backgroundColor: 'white',
              borderRadius: 48,
              borderColor: appTheme.colors.primary,
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
            style={{ color: appTheme.colors.text, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}
          >
            Welcome, Dr. Khush
          </Text>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: appTheme.colors.border, marginVertical: 10 }} />

      <View className="flex-1">
        {/* <DrawerItem
          icon={({ color, size }) => (
            <AntDesign
              name="user"
              size={size}
              color={pathname === "/profile" ? appTheme.colors.active : appTheme.colors.inactive}
            />
          )}
          label="Profile"
          labelStyle={{
            color: pathname === "/profile" ? appTheme.colors.active : appTheme.colors.inactive,
          }}
          style={{
            backgroundColor: pathname === "/profile" ? appTheme.colors.activeBackground : appTheme.colors.background,
          }}
          onPress={() => {
            router.push("/(drawer)/(tabs)/profile");
          }}
        /> */}
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
            backgroundColor: pathname === "/home/settings" ? appTheme.colors.activeBackground : appTheme.colors.background,
          }}
          onPress={() => {
            router.push("/home/settings");
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};
