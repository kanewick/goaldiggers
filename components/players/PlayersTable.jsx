import {
  SafeAreaView,
  VirtualizedList,
  View,
  Text,
  RefreshControl,
} from "react-native";
import React from "react";
import PlayerTableRow from "./PlayerTableRow";
import CustomButton from "../common/CustomButton";
import Loading from "../common/Loading";
import { router } from "expo-router";
import { getItem, getItemCount } from "../../utils/virtualisedListHelper";
import { getAllUsers } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const PlayersTable = () => {
  const {
    data: users,
    loading,
    refreshing,
    onRefresh,
  } = useAppwrite(getAllUsers);

  console.log("Loading players table");
  if (loading) {
    return <Loading />;
  }

  console.log("Players table loaded");

  console.log("Loading:", loading);
  console.log("Users:", users);

  return (
    <SafeAreaView className="bg-primary flex-1">
      <VirtualizedList
        data={users}
        keyExtractor={(player) => player.$id}
        getItem={getItem}
        getItemCount={getItemCount}
        renderItem={({ item: player }) => <PlayerTableRow player={player} />}
        ListHeaderComponent={() => (
          <View className="flex-row justify-between items-center px-4 py-2 bg-gray-200 border-t-0 font-pregular">
            <Text className="text-left font-bold" style={{ width: 150 }}>
              Name
            </Text>
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
    </SafeAreaView>
  );
};
export default PlayersTable;
