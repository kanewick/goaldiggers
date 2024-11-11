import React from "react";
import { View, Text } from "react-native";

// eslint-disable-next-line react/prop-types
const Error = ({ message }) => {
  return (
    <>
      <View>
        <Text className="color-red-600 font-pblack text-3xl">{message}</Text>
      </View>
    </>
  );
};

export default Error;
