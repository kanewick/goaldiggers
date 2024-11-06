import { View, Text } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";

const PlayerRating = ({ otherStyles, title, setSelectedRating }) => {
  const [rating, setRating] = useState(0);

  const handleValueChange = (value) => {
    setRating(value);
    setSelectedRating(value);
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
        {title} <Text>({rating})</Text>
      </Text>
      <View className="mt-2">
        <Slider
          minimumValue={1}
          maximumValue={5}
          step={0.5}
          value={rating}
          onValueChange={handleValueChange}
          minimumTrackTintColor="#068305"
          maximumTrackTintColor="#dc2626"
          dc2626
          thumbTintColor="#068305"
        />
      </View>
    </View>
  );
};

export default PlayerRating;
