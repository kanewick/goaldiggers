import React, { useState, useEffect } from "react";
import { VirtualizedList, View, Text, RefreshControl } from "react-native";
import RatingRow from "./RatingRow";
import CustomButton from "../common/CustomButton";
import { router } from "expo-router";
import Loading from "../common/Loading";
import useAppwrite from "../../lib/useAppwrite";
import { getItem, getItemCount } from "../../utils/virtualisedListHelper";
import ratingService from "../../services/ratingsService";
import playerService from "../../services/playerService";

const RatingsTable = () => {
  const [averages, setAverages] = useState([]);
  const [users, setUsers] = useState([]);

  const {
    data: ratingsData,
    loading,
    refreshing,
    onRefresh,
  } = useAppwrite(ratingService.getAllRatings);

  const { data: userData, loading: usersLoading } = useAppwrite(
    playerService.getAllUsers
  );

  useEffect(() => {
    if (ratingsData && ratingsData.documents) {
      setAverages(
        ratingService.calculateMappedPlayerRatingsAverages(ratingsData)
      );
    }
  }, [ratingsData]);

  useEffect(() => {
    if (userData) {
      setUsers(userData);
    }
  }, [userData]);

  if (loading || usersLoading) {
    return <Loading />;
  }

  return (
    <VirtualizedList
      data={averages}
      keyExtractor={(item) => item.ratedPlayerId}
      getItem={getItem}
      getItemCount={getItemCount}
      renderItem={({ item }) => <RatingRow rating={item} users={users} />}
      ListHeaderComponent={() => (
        <>
          <View className="flex-row justify-between items-center px-5 py-2 bg-gray-200 font-pregular">
            <Text className="text-left font-bold" style={{ width: 150 }}>
              Name
            </Text>
            <Text className="flex-1 text-center font-bold">Avg Rating</Text>
            <Text className="flex-1 text-left font-bold"></Text>
          </View>
        </>
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
            title="New Rating"
            handlePress={() => router.push("/ratings/add/index")}
            containerStyles="w-1/2-10 mb-5 min-h-[42px] px-3"
          />
        </View>
      )}
    />
  );
};

export default RatingsTable;
