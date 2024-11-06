import {
  SafeAreaView,
  VirtualizedList,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import { getAllUsers } from "@/lib/appwrite";
import { getAllRatings } from "@/lib/appwrite";
import PlayerCard from "../../components/PlayerCard";
import useAppwrite from "../../lib/useAppwrite";
import CustomButton from "../../components/CustomButton";
import PlayerRatingCard from "../../components/RatingCard";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Players = () => {
  const { data: players = [], refetch } = useAppwrite(getAllUsers);
  const { data: ratings = [] } = useAppwrite(getAllRatings);
  const [refreshing, setRefreshing] = useState(false);
  const [showPlayers, setShowPlayers] = useState(true);
  const [showRatings, setShowRatings] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Helper function for `VirtualizedList`
  const getItem = (data, index) => data[index];
  const getItemCount = (data) => data.length;

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Header subTitle="Manage" screenTitle="Players" />

      {/* Toggle for Players List */}
      <TouchableOpacity
        onPress={() => {
          setShowPlayers(!showPlayers);
          setShowRatings(false);
        }}
      >
        <View className="p-2 px-5 border-t border-gray-500 pt-4 pb-4 flex-row justify-between">
          <Text className="text-lg font-pbold text-gray-100">Goal Diggers</Text>
          <MaterialCommunityIcons
            name="soccer-field"
            size={24}
            color="#CDCDE0"
          />
        </View>
      </TouchableOpacity>

      {/* Players List */}
      {showPlayers && (
        <VirtualizedList
          data={players}
          keyExtractor={(player) => player.$id}
          getItem={getItem}
          getItemCount={getItemCount}
          renderItem={({ item: player }) => <PlayerCard player={player} />}
          ListHeaderComponent={() => (
            <View className="flex-row justify-between items-center px-4 py-2 bg-gray-200 border-t-0 font-pregular">
              <Text className="flex-1 text-left font-bold"></Text>
              <Text className="flex-1 text-left font-bold">Name</Text>
              <Text className="flex-1 text-center font-bold">G</Text>
              <Text className="flex-1 text-center font-bold">A</Text>
              <Text className="flex-1 text-center font-bold">P</Text>
              <Text className="flex-1 text-center font-bold">CS</Text>
              <Text className="flex-1 text-left font-bold"></Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex justify-center items-center h-full">
              <Text className="text-gray-300 text-lg">No players found</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => (
            <View className="mt-7 px-3">
              <CustomButton
                title="New Player"
                handlePress={() => router.push("/players/add")}
                containerStyles="w-1/2-10 mb-5 min-h-[42px]  px-3"
              />
            </View>
          )}
        />
      )}

      {/* Toggle for Ratings List */}
      <TouchableOpacity
        onPress={() => {
          setShowRatings(!showRatings);
          setShowPlayers(false);
        }}
      >
        <View className="p-2 px-5  border-t border-gray-500 pt-4 pb-4 flex-row justify-between">
          <Text className="text-lg font-pbold text-gray-100">Ratings</Text>
          <MaterialIcons name="quiz" size={24} color="#CDCDE0" />
        </View>
      </TouchableOpacity>

      {/* Ratings List */}
      {showRatings && (
        <VirtualizedList
          data={ratings}
          keyExtractor={(rating) => rating.$id}
          getItem={getItem}
          getItemCount={getItemCount}
          renderItem={({ item: rating }) => (
            <PlayerRatingCard rating={rating} />
          )}
          ListHeaderComponent={() => (
            <View className="flex-row justify-between items-center px-5 py-2 bg-gray-200 font-pregular">
              <Text className="flex-1 text-left font-bold">Name</Text>
              <Text className="flex-1 text-left font-bold">Ratingsssss</Text>
              <Text className="flex-1 text-left font-bold">Rated By</Text>
              <Text className="flex-1 text-left font-bold">Timestamp</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex justify-center items-center h-full">
              <Text className="text-gray-300 text-lg">No ratings found</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => (
            <View className="mt-7 px-3">
              <CustomButton
                title="Add Rating"
                handlePress={() => router.push("/ratings/add")}
                containerStyles="w-1/2-10 mb-5 min-h-[42px]  px-3"
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Players;
