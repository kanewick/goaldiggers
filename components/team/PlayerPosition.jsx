/* eslint-disable react/prop-types */
// PlayerPosition.js
import React from "react";
import { View } from "react-native";
import PlayerPlaceholder from "./PlayerPlaceholder";

const PlayerPosition = ({ position, positionData }) => {
  console.log("position ", position);
  console.log("positionData ", positionData);

  if (!positionData) {
    throw new Error(
      "Position Data must be passed into the Player Position Component"
    );
  }

  return (
    <View
      style={{
        position: "absolute",
        top: positionData.top ? `${positionData.top}%` : undefined,
        left: positionData.left ? `${positionData.left}%` : undefined,
        right: positionData.right ? `${positionData.right}%` : undefined,
        bottom: positionData.bottom ? `${positionData.bottom}%` : undefined,
      }}
    >
      <PlayerPlaceholder position={position} />
    </View>
  );
};

export default PlayerPosition;
