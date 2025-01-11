import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../../../components/common/Header";
import RatingsTable from "../../../components/ratings/RatingsTable";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PlayersTable from "../../../components/players/PlayersTable";

const PlayersScreen = () => {
  const [showPlayers, setShowPlayers] = useState(true);
  const [showRatings, setShowRatings] = useState(false);

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Header subTitle="Manage" screenTitle="Players" />
      <View className="flex-1">
        {/* Toggle for Players List */}
        <TouchableOpacity
          onPress={() => {
            setShowPlayers(!showPlayers);
            setShowRatings(false);
          }}
        >
          <View className="p-2 px-5 border-t border-gray-500 pt-4 pb-4 flex-row justify-between">
            <Text
              className={`text-lg font-pbold ${
                showPlayers ? "text-secondary-100" : "text-gray-100"
              }`}
            >
              Goal Diggers
            </Text>
            <MaterialCommunityIcons
              name="soccer-field"
              size={24}
              color={showPlayers ? "#FF9001" : "#CDCDE0"}
            />
          </View>
        </TouchableOpacity>

        {/* Players List */}
        {showPlayers && <PlayersTable />}

        {/* Toggle for Ratings List */}
        <TouchableOpacity
          onPress={() => {
            setShowRatings(!showRatings);
            setShowPlayers(false);
          }}
        >
          <View className="p-2 px-5 border-t border-gray-500 pt-4 pb-4 flex-row justify-between">
            <Text
              className={`text-lg font-pbold ${
                showRatings ? "text-secondary-100" : "text-gray-100"
              }`}
            >
              Ratings
            </Text>
            <MaterialIcons
              name="quiz"
              size={24}
              color={showRatings ? "#FF9001" : "#CDCDE0"}
            />
          </View>
        </TouchableOpacity>

        {/* Ratings List */}
        {showRatings && <RatingsTable />}
      </View>
    </SafeAreaView>
  );
};

export default PlayersScreen;
