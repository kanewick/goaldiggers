import {
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Header from "../../../../components/common/Header";
import FormField from "../../../../components/common/FormField";
import CustomButton from "../../../../components/common/CustomButton";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import playerService from "../../../../services/playerService";

const AddPlayer = () => {
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
      await playerService.createUser(form);
      navigation.goBack();
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
          returnUrl="index"
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

export default AddPlayer;
