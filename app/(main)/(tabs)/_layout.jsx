/* eslint-disable react/prop-types */
import React from "react";
import { Text, View } from "react-native";
import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabIcon = ({ color, name, focused }) => {
  const iconMapping = {
    home: <FontAwesome5 name="home" size={24} color={color} />,
    players: <FontAwesome6 name="people-line" size={24} color={color} />,
    team: (
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#161622",
          borderWidth: 2,
          borderColor: focused ? color : "#FFF", // Change border color when selected
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        }}
      >
        <Ionicons
          name="football-outline"
          size={32}
          color={focused ? color : "#FFF"} // Change icon color when selected
          style={{
            transform: [{ translateY: -1 }, { scale: 1.2 }],
          }}
        />
      </View>
    ),
    fixtures: <AntDesign name="calendar" size={24} color={color} />,
    stats: <Ionicons name="stats-chart" size={24} color={color} />,
  };

  return (
    <View
      className="flex items-center justify-center mt-5"
      style={{ width: 80, height: 80 }}
    >
      {/* Icon */}
      <View className="mt-3">{iconMapping[name]}</View>
      {/* Text */}
      <Text
        className={`mt-1 ${
          focused ? "font-psemibold" : "font-pregular"
        } text-xs uppercase`}
        style={{
          color: color,
          width: "100%",
          textAlign: "center",
        }}
        numberOfLines={1}
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
            height: 95,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} focused={focused} name="home" />
            ),
          }}
        />
        <Tabs.Screen
          name="players"
          options={{
            title: "Players",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <>
                <TabIcon color={color} focused={focused} name="players" />
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="team"
          options={{
            title: "TEAM",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <>
                <TabIcon color={color} focused={focused} name="team" />
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Stats",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                name="stats" // Use the correct name
              />
            ),
          }}
        />
        <Tabs.Screen
          name="fixtures"
          options={{
            title: "Fixtures",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} focused={focused} name="fixtures" />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
