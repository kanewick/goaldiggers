import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      Alert("Error Occured: " + error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchFunction]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
  };

  return { data, loading, refreshing, onRefresh };
};

export default useAppwrite;
