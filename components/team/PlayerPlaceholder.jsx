/* eslint-disable react/prop-types */
import React from "react";
import { View, Text } from "react-native";

// eslint-disable-next-line react/prop-types
const PlayerPlaceholder = ({
  position,
  color = "bg-blue-500",
  playerNumber,
}) => (
  <View
    className={`${color} w-16 h-16 rounded-full justify-center items-center z-10`}
  >
    <Text className="text-white text-xs font-bold">{position}</Text>
    {playerNumber && (
      <Text className="text-white text-xs font-bold mt-1">{playerNumber}</Text>
    )}
  </View>
);

export default PlayerPlaceholder;
