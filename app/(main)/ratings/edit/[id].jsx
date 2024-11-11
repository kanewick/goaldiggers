import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "../../../../components/common/Header";
import { useNavigation, useLocalSearchParams } from "expo-router";
import CustomButton from "../../../../components/common/CustomButton";
import {
  getAllRatingsForLoggedInUser,
  getUser,
  updateRating,
} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import PlayerRating from "../../../../components/players/PlayerRating";
import Loading from "../../../../components/common/Loading";

const RatingEdit = () => {
  // Declare
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  // Set state
  const [disabled, setDisabled] = useState(false);
  const [ratedPlayerIdParam, setRatedPlayerIdParam] = useState(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playerRatings, setPlayerRatings] = useState([]);
  const [ratedPlayer, setRatedPlayer] = useState(null);
  const [ratedPlayerDoc, setRatedPlayerDoc] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [form, setForm] = useState({
    ratedByPlayerId: "",
    rating: 0, // or whatever initial value you want
    ratedPlayerId: "",
    timestamp: null,
  });

  // Get all Ratings
  const { data, loading, refreshing, onRefresh } = useAppwrite(
    getAllRatingsForLoggedInUser
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data || data.length === 0) {
          console.log("No data");
          return;
        }

        setPlayerRatings(data);
        setRatedPlayerDoc(data[0]);

        const fetchedPlayer = await getUser(ratedPlayerIdParam);
        setRatedPlayer(fetchedPlayer);

        console.log("Data loaded successfully", {
          PlayerRatings: data,
          ratedPlayerDoc: data[0],
          ratedPlayer: fetchedPlayer,
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [loading, data]);

  useEffect(() => {
    if (ratedPlayerDoc && ratedPlayerDoc.rating !== undefined) {
      console.log("ratedPlayerDoc", ratedPlayerDoc);
      setSelectedRating(ratedPlayerDoc.rating);
    }
  }, [ratedPlayerDoc]);

  const submit = async () => {
    setIsSubmitting(true);
    const rating = await updateRating(ratedPlayerDoc.$id, selectedRating);

    if (rating) {
      setIsSubmitting(false);
      navigation.navigate("players");
    }
  };

  if (loading || !ratedPlayer) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Header
          subTitle="Edit"
          screenTitle="Rating"
          returnUrl="players"
          returnText="Go back"
          navigation={navigation}
        />
        <View className="flex-row justify-center">
          <Text className="color-gray-100 text-center px-10 py-5">
            Update your rating for {ratedPlayer?.name} {`\n`} (this will effect
            the overall average)
          </Text>
        </View>
        <View className="w-full justify-center px-4 mb-6 ">
          <PlayerRating
            title={"Select Rating"}
            otherStyles={"mt-7"}
            setSelectedRating={(e) => {
              setForm({ ...form, rating: e });
              setSelectedRating(e);
            }}
            disabled={disabled}
            defaultValue={selectedRating}
          />
          <CustomButton
            title="Update"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RatingEdit;
