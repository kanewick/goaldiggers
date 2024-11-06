import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import Header from "../../../components/Header";
import FormField from "../../../components/FormField";
import CustomButton from "../../../components/CustomButton";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { updateUser, getUser, getLoggedInId } from "@/lib/appwrite";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";

const PlayerEdit = () => {
  const { id } = useLocalSearchParams();
  const [form, setForm] = useState({
    email: "",
    name: "",
    username: "",
    position: "",
    approved: false,
  });
  const [statForm, setStatForm] = useState({
    goals: 0,
    assists: 0,
    played: 0,
  });

  const navigation = useNavigation();
  const [editableField, setEditableField] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      const loggedInId = await getLoggedInId();
      try {
        const userDoc = await getUser(id);
        setUser(userDoc);
        if (userDoc) {
          setForm({
            email: userDoc.email ?? "",
            username: userDoc.username ?? "",
            name: userDoc.name ?? "",
            position: userDoc.position ?? "",
            approved: userDoc.approved ?? "",
          });
          setStatForm({
            goals: userDoc.goals,
            assists: userDoc.assists,
            clean_sheets: userDoc.clean_sheets,
            played: userDoc.played,
          });

          setEditableField(userDoc.accountId === loggedInId);
          setIsSubmitting(userDoc.accountId !== loggedInId);
        }
      } catch (error) {
        console.error("Error fetching player:", error);
        setError("Failed to fetch player data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  const submit = async () => {
    if (form.username === "" || form.email === "") {
      Alert.alert("Error", "Please fill in all the fields!");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateUser(user.$id, user.accountId, form, statForm);
      navigation.navigate("players");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <SafeAreaView className="bg-primary h-full">
        <View className="flex align-middle text-center">
          <Text className="text-red font-pblack text-3x;">{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full">
        <View className="flex align-middle text-center">
          <Text className="text-secondary-100 font-pblack text-3x;">
            Loading..
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Header
          subTitle="Edit"
          screenTitle={user?.name ?? "Player"}
          returnUrl="players"
          returnText="Go back to Players"
          navigation={navigation}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <View className="w-full justify-center mb-6 ">
              <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                <View className="p-2 px-5 border-t border-gray-500 pt-4 pb-4 flex-row justify-between">
                  <Text className="text-lg font-pbold text-gray-100">
                    Player Details
                  </Text>
                  <Fontisto name="player-settings" size={24} color="#CDCDE0" />
                </View>
              </TouchableOpacity>
              {showDetails && (
                <View className="mb-3 px-5">
                  <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e) => setForm({ ...form, email: e })}
                    otherStyles="mt-1"
                    keyboardType="email-address"
                    editable={false}
                  />
                  <FormField
                    title="Full Name"
                    value={form.name}
                    handleChangeText={(e) => setForm({ ...form, name: e })}
                    otherStyles="mt-7"
                    editable={editableField}
                  />
                  <FormField
                    title="Username"
                    value={form.username}
                    handleChangeText={(e) => setForm({ ...form, username: e })}
                    otherStyles="mt-7"
                    editable={editableField}
                  />
                  <FormField
                    title="Position"
                    value={form.position}
                    handleChangeText={(e) => setForm({ ...form, position: e })}
                    otherStyles="mt-7"
                    editable={editableField}
                  />
                  <FormField
                    title="Approved"
                    value={form.approved}
                    handleChangeText={(e) => setForm({ ...form, approved: e })}
                    otherStyles="mt-7 mb-3"
                    placeholder={undefined}
                    editable={editableField}
                  />
                </View>
              )}
              <TouchableOpacity onPress={() => setShowStats(!showStats)}>
                <View className="px-5 border-t border-gray-300 pt-4 pb-4 flex-row justify-between">
                  <Text className="text-lg font-pbold text-gray-100">
                    Player Stats
                  </Text>
                  <Ionicons name="stats-chart" size={24} color="#CDCDE0" />
                </View>
              </TouchableOpacity>

              {showStats && (
                <View className="px-5">
                  <FormField
                    title="Goals"
                    value={statForm.goals}
                    handleChangeText={(e) =>
                      setStatForm({ ...statForm, goals: Number(e) })
                    }
                    otherStyles="mt-1"
                    keyboardType="numeric"
                    editable={editableField}
                  />
                  <FormField
                    title="Assists"
                    value={statForm.assists}
                    handleChangeText={(e) =>
                      setStatForm({ ...statForm, assists: Number(e) })
                    }
                    otherStyles="mt-7"
                    keyboardType="numeric"
                    editable={editableField}
                  />
                  <FormField
                    title="Clean Sheets"
                    value={statForm.clean_sheets}
                    handleChangeText={(e) =>
                      setStatForm({ ...statForm, clean_sheets: Number(e) })
                    }
                    otherStyles="mt-7"
                    keyboardType="numeric"
                    editable={editableField}
                  />
                  <FormField
                    title="Games Played"
                    value={statForm.played}
                    handleChangeText={(e) =>
                      setStatForm({ ...statForm, played: Number(e) })
                    }
                    otherStyles="mt-7"
                    keyboardType="numeric"
                    editable={editableField}
                  />
                </View>
              )}
            </View>
          </ScrollView>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 10,
            }}
          >
            <CustomButton
              title="Update"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            {!editableField && (
              <Text className="text-red-500 text-center mt-2">
                You cannot update players.
              </Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PlayerEdit;
