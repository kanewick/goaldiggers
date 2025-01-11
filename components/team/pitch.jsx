/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import PlayerPlaceholder from "./PlayerPlaceholder";
import { View, Text, TouchableOpacity } from "react-native";
import Formation from "./Formation";
import FormationMaps from "./FormationMaps";
import { FlatList } from "react-native";

// eslint-disable-next-line react/prop-types
const Pitch = ({ users }) => {
  const players = users.map((user) => ({
    id: user.$id,
    value: user.name || user.username,
  }));

  // Example formations
  const formations = [
    { id: "1", value: "2-2-1" },
    { id: "2", value: "2-1-2" },
    { id: "3", value: "1-3-1" },
    { id: "4", value: "3-1-1" },
    { id: "5", value: "1-2-2" },
    { id: "6", value: "2-3" },
    { id: "7", value: "2-1-1-1" },
    { id: "8", value: "1-2-1-1" },
    { id: "9", value: "2-2-2" },
  ];

  const onPressPlayer = (name) => {
    setSelectedPlayer(name);
  };

  const onPressFormation = (formation) => {
    setSelectedFormation(formation);
  };

  const [selectedFormation, setSelectedFormation] = useState("2-2-1");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [foundFormationMapping, setFoundFormationMapping] = useState(null);

  useEffect(() => {
    if (FormationMaps[selectedFormation]) {
      setFoundFormationMapping(FormationMaps[selectedFormation]);
    }
  }, [selectedFormation]); // Only update if formation prop changes

  if (!foundFormationMapping) return null; // Return nothing if no formation mapping

  return (
    <>
      <View className="relative w-full flex-1 border-2 border-white">
        {/* Alternating Green Stripes */}
        <View className="absolute top-0 left-0 w-full h-[16.66%] bg-green-600"></View>
        <View className="absolute top-[16.66%] left-0 w-full h-[16.66%] bg-green-500"></View>
        <View className="absolute top-[33.33%] left-0 w-full h-[16.66%] bg-green-600"></View>
        <View className="absolute top-[50%] left-0 w-full h-[16.66%] bg-green-500"></View>
        <View className="absolute top-[66.66%] left-0 w-full h-[16.66%] bg-green-600"></View>
        <View className="absolute top-[83.33%] left-0 w-full h-[16.66%] bg-green-500"></View>

        {/* Top Soccer Net horizontally centered */}
        <View className="absolute top-0 left-[25%] w-[50%] h-[6%] border-2 border-t-0 border-white bg-transparent transform -translate-x-1/2"></View>
        <View className="absolute top-0 left-[15%] w-[70%] h-[20%] border-2 border-t-0 border-white bg-transparent transform -translate-x-1/2"></View>

        {/* Player Positions (below the net) */}
        <View className="absolute top-[3%] left-[45%] w-[70%] h-[20%]">
          <PlayerPlaceholder position="GK" />
        </View>

        <Formation formationData={foundFormationMapping} />

        {/* Halfway line at the bottom */}
        <View className="absolute bottom-[6%] left-0 w-[100%] h-[0.3%] bg-white transform -translate-x-1/2"></View>

        {/* Circle in the middle of the halfway line */}
        <View className="absolute bottom-[4.7%] left-1/2 w-[4%] h-[3%] bg-white rounded-full transform -translate-x-1/2"></View>

        {/* Large circle around the small circle */}
        <View className="absolute bottom-[-5%] left-[37%] w-[30%] h-[20%] bg-transparent border-2 border-white rounded-full transform -translate-x-1/2"></View>
      </View>
      {/* Player Picker and Formation Section */}
      <View className="bg-primary w-full h-[25%] p-2">
        {/* Horizontal Formation Picker */}
        <View className="mt-2 text-center items-center">
          <FlatList
            data={formations}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`p-3 mx-2 rounded-md ${
                  selectedFormation === item.value
                    ? "bg-green-600"
                    : "bg-gray-700"
                }`}
                onPress={() => onPressFormation(item.value)}
              >
                <Text
                  className={`text-white ${
                    selectedFormation === item.value ? "font-bold" : ""
                  }`}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          />
        </View>

        {/* Player List */}
        <View className="mt-5 items-center">
          <Text className="text-xl text-white mb-2">
            Choose a Player for this position
          </Text>
          <FlatList
            data={players}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                className={` p-3 mx-2 rounded-md ${
                  selectedPlayer === item.value ? "bg-green-600" : "bg-gray-700"
                }`}
                onPress={() => onPressPlayer(item.value)}
              >
                <Text className="text-white">{item.value}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          />
        </View>
      </View>
    </>
  );
};

export default Pitch;
