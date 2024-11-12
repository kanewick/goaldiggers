/* eslint-disable react/prop-types */
import { View, Text } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";
import React from "react";

const PlayerTableRow = ({ player }) => {
  return (
    <View className="flex-row justify-between items-center px-4 py-4 border-t border-gray-300">
      <Text
        style={{ width: 150 }}
        className="text-left text-white"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {player.name}
      </Text>
      <Text className="flex-1 text-center  text-white">{player.goals}</Text>
      <Text className="flex-1 text-center relative text-white">
        {player.assists}
      </Text>
      <Text className="flex-1 text-center text-white">{player.played}</Text>
      <Text className="flex-1 text-center text-white">
        {player.clean_sheets}
      </Text>
      <Link
        className="flex-1"
        href={{
          pathname: `players/edit/${player.$id}`,
        }}
      >
        <FontAwesome6
          name="edit"
          size={20}
          color="white"
          className="text-right"
        />
      </Link>
    </View>
  );
};

export default PlayerTableRow;
