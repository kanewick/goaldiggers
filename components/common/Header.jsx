/* eslint-disable react/prop-types */
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import images from "../../constants/images"; // Ensure this path is correct based on your folder structure

const Header = ({ subTitle, screenTitle, returnUrl, navigation }) => {
  const { user } = useGlobalContext();
  return (
    <View className="px-5 flex-row justify-between">
      <View className="mt-5">
        {screenTitle ? (
          <Text className="text-lg text-white font-pregular">
            {subTitle}
            {`\n`}
            <Text className="text-2xl font-pbold">{screenTitle}</Text>
          </Text>
        ) : (
          <Text className="text-lg text-white font-pregular">
            Welcome Back {"\n"}
            <Text className="text-2xl font-pbold">{user.username}</Text>
          </Text>
        )}

        {/* Check if returnUrl is defined */}
        {returnUrl && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-secondary-100 underline my-4">Go Back</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Image source={images.logo} className="w-[50px] h-[100px]" />
      </View>
    </View>
  );
};

export default Header;
