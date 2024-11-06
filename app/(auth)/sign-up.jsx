import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import images from "../../constants/images"; // Ensure this path is correct based on your folder structure
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createAndSignInUser } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setform] = useState({
    position: "",
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields!");
    }
    setIsSubmitting(true);

    try {
      const result = await createAndSignInUser(
        form.email,
        form.password,
        form.username,
        form.name,
        form.position,
        false
      );
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
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
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 mb-6 ">
            <Image source={images.logo} className="w-[50px] h-[100px]" />
            <Text className="text-2xl text-white text-semibold mt-1 font-psemibold">
              Join Goal Diggers now!
            </Text>
            <FormField
              title="Position"
              value={form.position}
              handleChangeText={(e) => setform({ ...form, position: e })}
              otherStyles="mt-10"
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
              otherStyles="mt-10"
              placeholder={undefined}
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setform({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder={undefined}
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setform({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Register"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
              textStyles={undefined}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Already a player?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg font-psemibold text-secondary"
              >
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
