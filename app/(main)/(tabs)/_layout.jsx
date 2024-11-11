/* eslint-disable react/prop-types */
import React from "react";
import { Image, Text, View } from "react-native";
import { Tabs } from "expo-router";
import icons from "../../../constants/icons";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232523",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home} // Use icons.home directly
                color={color}
                focused={focused}
                name="dashboard"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="players"
          options={{
            title: "Squad",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <>
                <TabIcon
                  icon={icons.bookmark} // Use icons.home directly
                  color={color}
                  focused={focused}
                  name="Team"
                />
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="fixtures"
          options={{
            title: "Fixtures",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus} // Use icons.home directly
                color={color}
                focused={focused}
                name="plus"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile} // Use icons.home directly
                color={color}
                focused={focused}
                name="profile"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
