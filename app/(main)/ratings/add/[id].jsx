import React from "react";
import AddRating from "../add/index";
import { useLocalSearchParams } from "expo-router";

const AddRatingFromId = () => {
  const { id } = useLocalSearchParams(); // Access the 'id' from the URL parameters
  return <AddRating id={id} />;
};

export default AddRatingFromId;
