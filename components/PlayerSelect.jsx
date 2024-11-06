import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text } from "react-native";

const PlayerSelect = ({
  players,
  title,
  otherStyles,
  selectedPlayer, // The currently selected player ID
  setSelectedPlayer, // Function to update the selected player
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  // Update items whenever players prop changes
  useEffect(() => {
    if (players) {
      const formattedItems = players.map((player) => ({
        label: player.name,
        value: player.$id,
      }));
      setItems(formattedItems);
    }
  }, [players]);

  const onchange = () => {};

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium mb-2">{title}</Text>
      <DropDownPicker
        open={open}
        value={selectedPlayer} // Bind the selected value
        items={items}
        setOpen={setOpen}
        setValue={setSelectedPlayer} // Use setSelectedPlayer to update state
        placeholder="Select a player..."
        containerStyle={{ height: 40, backgroundColor: "#1E1E2D" }}
        dropDownContainerStyle={{
          backgroundColor: "#1E1E2D",
          zIndex: 9999, // Ensure dropdown appears on top
          elevation: 10,
        }}
        labelStyle={{
          color: "#000",
          fontSize: 16,
          fontWeight: "bold",
        }}
        textStyle={{
          color: "#fff",
        }}
        selectedItemContainerStyle={{
          backgroundColor: "grey",
        }}
        placeholderStyle={{
          color: "#999", // Color of the placeholder
          fontStyle: "italic", // Optional: Make placeholder italic
        }}
      />
    </View>
  );
};

export default PlayerSelect;
