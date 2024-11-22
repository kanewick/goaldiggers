/* eslint-disable react/prop-types */
import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Error from "../common/Error";
import { Link } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import ratingService from "../../services/ratingsService";
import Feather from "@expo/vector-icons/Feather";

const RatingRow = ({ rating, users }) => {
  const [showEdit, setShowEdit] = useState(true);

  useEffect(() => {
    const fetchFilteredPlayers = async () => {
      try {
        const players = await ratingService.filterPlayersWithRating();

        // Find the player with the matching $id
        const ratedPlayer = players.find(
          (player) => player.$id === rating.ratedPlayerId
        );

        // If a matching player is found, set showEdit to false
        if (ratedPlayer) {
          setShowEdit(false);
        }
      } catch (error) {
        console.error("Error fetching filtered players", error);
      }
    };

    if (rating && users) {
      fetchFilteredPlayers();
    }
  }, [rating, users]);

  // Early return if users array is empty or undefined
  if (!users || users.length === 0) {
    return <Error message="Users data is not loaded yet." />;
  }

  const { ratedPlayerId, averageRating } = rating;
  // Find the rated player based on `ratedPlayerId`
  const ratedPlayer = ratingService.getUserByRatedPlayerId(
    users,
    ratedPlayerId
  );

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
          pathname: showEdit
            ? `ratings/edit/${rating.ratedPlayerId}` // Use edit path if showEdit is true
            : `ratings/add/${rating.ratedPlayerId}`, // Use view path if showEdit is false
        }}
      >
        {showEdit ? (
          <FontAwesome6
            name="edit"
            size={20}
            color="white"
            className="text-right"
          />
        ) : (
          <Feather
            size={20}
            color="white"
            className="text-right"
            name="plus-square"
          />
        )}
      </Link>
    </View>
  );
};

export default RatingRow;
