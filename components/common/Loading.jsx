import React from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";

const Loading = () => {
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="flex-1 justify-center items-center">
            <Text className="text-3xl text-green-50">Loading...</Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Loading;
