import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "../../components/Header";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { getAllUsers, getLoggedInId } from "../../lib/appwrite";
import PlayerSelect from "../../components/PlayerSelect"; // Adjust this import if necessary
import PlayerRating from "../../components/PlayerRating";
import { createRating } from "../../lib/appwrite";

const AddRating = () => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [players, setPlayers] = useState([]);
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
  const handleValueChange = (value) => {
    console.log("Selected player:", value); // Debugging line
    setSelectedPlayer(value);
  };

  useEffect(() => {
    async function fetchData() {
      const loggedInId = await getLoggedInId();
      setLoggedInUserId(loggedInId);
      const fetchedPlayers = await getAllUsers();
      console.log(fetchedPlayers); // Check the fetched players
      setPlayers(fetchedPlayers);
    }

    fetchData();
  }, []);

  const submit = async () => {
    const rating = await createRating(
      loggedInUserId,
      selectedRating,
      selectedPlayer
    );

    if (rating) {
      navigation.navigate("players");
    }
  };

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
          returnText="Go back"
          navigation={navigation}
        />
        <View className="w-full justify-center px-4 mb-6 ">
          <View className="z-50 mb-4">
            <PlayerSelect
              players={players}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
              title={"Select Player"}
              otherStyles={"mt-7"}
            />
          </View>
          <PlayerRating
            title={"Select Rating"}
            otherStyles={"mt-7"}
            setSelectedRating={(e) => {
              setForm({ ...form, rating: e });
              setSelectedRating(e);
            }}
          />
          <CustomButton
            title="Create"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddRating;
