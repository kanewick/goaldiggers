import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import Header from "../../../../components/common/Header";
import CustomButton from "../../../../components/common/CustomButton";
import { useNavigation } from "@react-navigation/native";
import PlayerSelect from "../../../../components/players/PlayerSelect"; // Adjust this import if necessary
import RatingSlider from "../../../../components/ratings/RatingSlider";
import Loading from "../../../../components/common/Loading";
import ratingService from "../../../../services/ratingsService";
import playerService from "../../../../services/playerService";

const AddRating = ({ id }) => {
  const [disabled, setDisabled] = useState(false);
  const [emptyUsersMessage, setEmptyUsersMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const navigation = useNavigation();

  const [form, setForm] = useState({
    ratedByPlayerId: "",
    rating: 0, // or whatever initial value you want
    ratedPlayerId: "",
    timestamp: null,
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const filteredPlayersWithRating =
        await ratingService.filterPlayersWithRating();

      if (filteredPlayersWithRating.length === 0) {
        setEmptyUsersMessage(
          "You have assigned ratings to all players in Goal Diggers. If you want to amend your ratings, go to the ratings and edit the player you wish to update."
        );

        setDisabled(true);
      }

      setSelectedPlayer(id);

      setFilteredPlayers(filteredPlayersWithRating); // Store the filtered players
      setLoading(false);
    }

    fetchData();
  }, []);

  const submit = async () => {
    setIsSubmitting(true);
    const rating = await ratingService.createRating(
      selectedRating,
      selectedPlayer
    );

    if (rating) {
      setIsSubmitting(false);
      navigation.navigate("players");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Header
          subTitle="Add New"
          screenTitle="Rating"
          returnUrl="players"
          navigation={navigation}
        />
        <View className="flex-row justify-center">
          {emptyUsersMessage ? (
            <Text className="color-red-500 text-center px-10 py-5">
              {emptyUsersMessage}
            </Text>
          ) : (
            <Text className="color-gray-100 text-center px-10 py-5">
              Add a rating to a fellow teammate, you can only add one rating to
              one player, then you can adjust that rating anytime.
            </Text>
          )}
        </View>
        <View className="w-full justify-center px-4 mb-6 ">
          <View className="z-50 mb-4">
            <PlayerSelect
              players={filteredPlayers}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
              title={"Select Player"}
              otherStyles={"mt-7"}
              disabled={disabled}
            />
          </View>
          <RatingSlider
            title={"Select Rating"}
            otherStyles={"mt-7"}
            setSelectedRating={(e) => {
              setForm({ ...form, rating: e });
              setSelectedRating(e);
            }}
            disabled={disabled}
          />
          <CustomButton
            title="Create"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={disabled}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddRating;
