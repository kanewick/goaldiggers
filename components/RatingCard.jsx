import { View, Text } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";

const PlayerRatingCard = ({ rating }) => {
  return (
    <View className="flex-row justify-between items-center px-4 py-4 border-t border-gray-300">
      <Text className="flex-1 text-left text-white">Name</Text>
      <Text className="flex-1 text-center  text-white">0</Text>
      <Text className="flex-1 text-center relative text-white">rated by</Text>
      <Text className="flex-1 text-center text-white">timestamp</Text>
    </View>
  );
};

export default PlayerRatingCard;
