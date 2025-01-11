import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Header from "../../../components/common/Header";

const StatsScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header screenTitle={"Stats"} subTitle={"Manage"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatsScreen;
