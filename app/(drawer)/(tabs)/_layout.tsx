import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";

type IconName =
  | "home"
  | "home-outline"
  | "code-slash"
  | "code-slash-outline"
  | "analytics"
  | "analytics-outline";

const tabs = [
  { name: "index", title: "CortexAcademy", icon: "home" as IconName, iconOutline: "home-outline" as IconName },
  { name: "QBank", title: "Question Bank", icon: "code-slash" as IconName, iconOutline: "code-slash-outline" as IconName },
  { name: "PYQ", title: "Previous Year Questions", icon: "code-slash" as IconName, iconOutline: "code-slash-outline" as IconName },
  { name: "Analytics", title: "Performance Insights", icon: "analytics" as IconName, iconOutline: "analytics-outline" as IconName },
];

export default function TabLayout() {
  const { appTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton tintColor={appTheme.colors.text} />,
        tabBarStyle: { backgroundColor: appTheme.colors.background },
        tabBarLabelStyle: {
          padding: 0,
        },
        headerStyle: {
          backgroundColor: appTheme.colors.headerBackground,
        },
        headerTintColor: appTheme.colors.text,
      }}
    >
      {tabs.map(({ name, title, icon, iconOutline }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? icon : iconOutline}
                color={focused ? appTheme.colors.active : appTheme.colors.inactive}
                size={20}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    color: focused ? appTheme.colors.active : appTheme.colors.inactive,
                    paddingVertical: 4,
                    fontSize: focused ? 12 : 10,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  {name === "index" ? "Home" : name}
                </Text>
                {focused && (
                  <View
                    style={{
                      height: 3,
                      width: '100%',
                      backgroundColor: appTheme.colors.active,
                      position: 'absolute',
                      bottom: 0,
                      borderRadius: 1.5
                    }}
                  />
                )}
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
