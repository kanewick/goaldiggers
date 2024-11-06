import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons"; // Ensure this path is correct based on your folder structure
import { Picker } from "@react-native-picker/picker";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  editable = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium mb-2">{title}</Text>

      <View
        className={`${
          typeof value === "boolean"
            ? "h-10"
            : "w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center"
        }`}
      >
        {typeof value === "boolean" ? (
          // Render a Switch component for boolean values
          <Switch
            value={value}
            onValueChange={handleChangeText}
            thumbColor={value ? "#4CAF50" : "#f4f3f4"} // Adjust colors as needed
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            disabled={!editable}
          />
        ) : (
          // Render TextInput for other values
          <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value?.toString()}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
            editable={editable}
            {...props}
          />
        )}

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
