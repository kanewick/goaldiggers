import { ScrollView, Text, View, Image, Animated } from "react-native";
import { React, useRef, useEffect } from "react";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { router, Link, Redirect } from "expo-router";
import images from "../constants/images"; // Ensure this path is correct based on your folder structure
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const imageFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imageFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 1600,
        useNativeDriver: true,
      }),
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          className="w-full
        items-center h-[85vh] px-4"
        >
          <Animated.View
            style={{ opacity: imageFadeAnim }}
            className="relative mt-5"
          >
            <Image
              source={images.splashpage}
              className="max-w-[380px]  h-[300px] mt-0 pt-0"
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.View
            style={{ opacity: textFadeAnim }}
            className="relative mt-5"
          >
            <Text className="text-3xl text-white font-bold text-center">
              Organize, design, and manage every detail of your football
              experience.{"\n"}
              {"\n"} Welcome to{" "}
              <Text className="text-secondary-200">Goal Diggers</Text>{" "}
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-1"
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View
            style={{ opacity: contentFadeAnim }}
            className="w-full"
          >
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Group of lads, derived from our original team 'Simp Squad', we are
              always looking for players, if you fancy it, sign up now!
            </Text>
            <CustomButton
              title="Join Goal Diggers"
              handlePress={() => router.push("/sign-up")}
              containerStyles="w-full mt-7"
            />
            <CustomButton
              title="Sign In"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7 bg-primary color-secondary-100"
            />
            <View className="mt-10 px-8 flex-row justify-between">
              <Link href="#" className="text-gray-100">
                Contact Us
              </Link>
              <Link href="#" className="text-gray-100">
                Fixtures
              </Link>
              <Link href="#" className="text-gray-100">
                Fun Stats
              </Link>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
