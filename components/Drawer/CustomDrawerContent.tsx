import React from "react";
import { View, Image, Text, Share } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Href } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { DrawerItemComponent } from "./DrawerItem";


const handleShareApp = async () => {
  try {
    const result = await Share.share({
      message: "Check out this amazing app: CortexAcademy! Download it here: [App URL]",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("Shared with activity type:", result.activityType);
      } else {
        console.log("App shared successfully.");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("Share dismissed.");
    }
  } catch (error: any) {
    console.error("Error sharing app:", error.message);
  }
};


export const CustomDrawerContent = (props: any) => {
  const { appTheme } = useTheme();

  return (
    <View className="flex-1 pt-16" style={{ backgroundColor: appTheme.colors.primary }}>
      <View style={{ height: 170, alignItems: "center", padding: 4 }}>
        <View style={{ width: "100%", position: "relative", height: 80 }}>
          <View
            style={{
              position: "absolute",
              top: 10,
              width: "100%",
              height: 6,
              backgroundColor: appTheme.colors.tertiary,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 40,
              width: "85%",
              height: 6,
              backgroundColor: appTheme.colors.tertiary,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 70,
              width: "70%",
              height: 6,
              backgroundColor: appTheme.colors.tertiary,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ position: "absolute", top: -5, zIndex: 10 }}>
          <View
            style={{
              width: 96,
              height: 96,
              backgroundColor: "white",
              borderRadius: 48,
              borderColor: appTheme.colors.tertiary,
              borderWidth: 4,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              color: appTheme.colors.tertiary,
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Welcome, Dr. Khush
          </Text>
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ margin: 0, padding: 0, paddingTop: 4 }}
        style={{ flex: 1, backgroundColor: appTheme.colors.tertiary }}
      >
        <DrawerItemComponent
          label="Profile"
          iconName="person-outline"
          route={"/home/profile" as Href}
        />
        <DrawerItemComponent
          label="Upcoming Plan"
          iconName="calendar-outline"
          route={"/home/upcoming-plan" as Href}
        />
        <DrawerItemComponent
          label="Privacy Policy"
          iconName="document-outline"
          route={"/home/privacy-policy" as Href}
        />
        <DrawerItemComponent
          label="Terms & Conditions"
          iconName="document-text-outline"
          route={"/home/terms-and-conditions" as Href}
        />
        <DrawerItemComponent
          label="About Us"
          iconName="information-circle-outline"
          route={"/home/about" as Href}
        />
        {/* <SubmenuComponent
          items={[
            { label: "Contact", iconName: "mail-outline", route: "/home/contact" as Href },
            { label: "Founder Vision", iconName: "eye-outline", route: "/home/founder-vision" as Href },
          ]}
        /> */}
        <DrawerItemComponent
          label="Settings"
          iconName="settings-outline"
          route={"/home/settings" as Href}
        />
        <DrawerItemComponent
          label="Share App"
          iconName="share-outline"
          onPress={handleShareApp}
        />
      </DrawerContentScrollView>
    </View>
  );
};
