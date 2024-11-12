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
import useAppwrite from "@/lib/useAppwrite";
import RatingSlider from "../../../../components/ratings/RatingSlider";
import Loading from "../../../../components/common/Loading";
import ratingService from "../../../../services/ratingsService";
import playerService from "../../../../services/playerService";

const RatingEdit = () => {
  // Declare
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  // Set state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratedPlayer, setRatedPlayer] = useState(null);
  const [ratingObj, setRatingObj] = useState(null);

  // Get all Ratings
  const { data: userRatings, loading } = useAppwrite(
    ratingService.getAllRatingsForLoggedInUser
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userRatings || userRatings.length === 0) {
          console.warn("No data");
          return;
        }

        setRatedPlayer(await playerService.getUser(id));
        setRatingObj(ratingService.getRatingByUserId(userRatings, id));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [loading, userRatings, id]);

  useEffect(() => {
    if (ratingObj?.rating !== undefined) {
      setSelectedRating(ratingObj.rating);
    }
  }, [ratingObj]);

  const submit = async () => {
    setIsSubmitting(true);
    const rating = await ratingService.updateRating(
      ratingObj.$id,
      selectedRating
    );
    setIsSubmitting(false);

    if (rating) {
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
            Update your rating for {ratedPlayer?.name} {`\n`} (this will affect
            the overall average)
          </Text>
        </View>
        <View className="w-full justify-center px-4 mb-6">
          <RatingSlider
            title="Select Rating"
            otherStyles="mt-7"
            setSelectedRating={(rating) => setSelectedRating(rating)}
            disabled={false}
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
