/* eslint-disable react/prop-types */
import React from "react";
import PlayerPosition from "./PlayerPosition"; // Assuming you have this component

const Formation = ({ formationData }) => {
  if (!formationData) {
    throw new Error("No formation Data passed");
  }

  const getDisplayKey = (key) => key.replace(/\d+$/, ""); // Remove trailing digits

  return (
    <>
      {/* Dynamically render positions based on the formationData keys */}
      {Object.keys(formationData).map((positionKey) => {
        const positionData = formationData[positionKey];
        const displayKey = getDisplayKey(positionKey); // Map key for display

        return (
          <PlayerPosition
            key={positionKey}
            position={displayKey}
            positionData={positionData}
          />
        );
      })}
    </>
  );
};

export default Formation;
