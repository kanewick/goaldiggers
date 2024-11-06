import { View, Text } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";

const PlayerCard = ({ player }) => {
  return (
    <View className="flex-row justify-between items-center px-4 py-4 border-t border-gray-300">
      <View className="flex-1 text-left">
        <Octicons name="person" size={24} color="white" />
      </View>
      <Text className="flex-1 text-left text-white">{player.username}</Text>
      <Text className="flex-1 text-center  text-white">{player.goals}</Text>
      <Text className="flex-1 text-center relative text-white">
        {player.assists}
      </Text>
      <Text className="flex-1 text-center text-white">{player.played}</Text>
      <Text className="flex-1 text-center text-white">
        {player.clean_sheets}
      </Text>
      {/* <Text className="flex-1 text-center text-white">
        {player.approved ? "true" : "false"}
      </Text> */}
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

export default PlayerCard;
