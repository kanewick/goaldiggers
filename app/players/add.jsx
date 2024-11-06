import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Header from "../../components/Header";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { createUser } from "../../lib/appwrite";

const Add = () => {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setform] = useState({
    email: "",
    name: "",
    username: "",
    position: "",
    password: "goaldiggers",
    approved: false,
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields!");
    }
    setIsSubmitting(true);

    try {
      console.log("Approved " + form.approved);
      await createUser(
        form.email,
        form.password,
        form.username,
        form.name,
        form.position,
        form.approved ?? false
      );

      navigation.navigate("players");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }} // Ensure it fills the entire view
      >
        <Header
          subTitle="Add New"
          screenTitle="Player"
          returnUrl="players"
          returnText="Go back to Players"
          navigation={navigation}
          st
        />
        <ScrollView>
          <View className="w-full justify-center px-4 mb-6 ">
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setform({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder={undefined}
            />
            <FormField
              title="Full Name"
              value={form.name}
              handleChangeText={(e) => setform({ ...form, name: e })}
              otherStyles="mt-10"
              placeholder={undefined}
            />
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setform({ ...form, username: e })}
              otherStyles="mt-7"
              placeholder={undefined}
            />
            <FormField
              title="Position"
              value={form.position}
              handleChangeText={(e) => setform({ ...form, position: e })}
              otherStyles="mt-7"
              placeholder={undefined}
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setform({ ...form, password: e })}
              otherStyles="mt-7"
            />
            <FormField
              title="Approved"
              value={form.approved}
              handleChangeText={(e) => setform({ ...form, approved: e })}
              otherStyles="mt-7"
              placeholder={undefined}
            />

            <CustomButton
              title="Create"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
              textStyles={undefined}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Add;
