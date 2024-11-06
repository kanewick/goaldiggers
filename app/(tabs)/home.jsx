import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Header";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
