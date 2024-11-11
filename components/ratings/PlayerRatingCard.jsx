/* eslint-disable react/prop-types */
import { View, Text } from "react-native";
import React from "react";
import Error from "../common/Error";
import { Link } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

const PlayerRatingCard = ({ rating, users }) => {
  console.log("Player Rating", rating);
  if (!rating) {
    return <Error message="Rating data is missing." />;
  }

  // Early return if users array is empty or undefined
  if (!users || users.length === 0) {
    return <Error message="Users data is not loaded yet." />;
  }

  const { ratedPlayerId, averageRating } = rating;

  // Find the rated player based on `ratedPlayerId`
  const ratedPlayer =
    users.find((player) => player.$id === ratedPlayerId) || null;

  // Early return if the rated player is not found
  if (!ratedPlayer) {
    return (
      <Error message="Could not find the player associated with this rating." />
    );
  }

  return (
    <View className="flex-row justify-between items-center px-4 py-4 border-t border-gray-300">
      <Text className=" text-left text-white" style={{ width: 150 }}>
        {ratedPlayer.name}
      </Text>
      <Text className="flex-1 text-center text-white">
        {averageRating.toFixed(2)}
      </Text>
      <Link
        className="flex-1"
        href={{
          pathname: `ratings/edit/${rating.ratedPlayerId}`,
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

export default PlayerRatingCard;
