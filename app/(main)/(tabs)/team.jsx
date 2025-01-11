/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";
import Header from "../../../components/common/Header";
import Pitch from "../../../components/team/pitch";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  Animated,
} from "react-native";
import useAppwrite from "../../../lib/useAppwrite";
import { getAllUsers } from "../../../lib/appwrite";
import Loading from "../../../components/common/Loading";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const TeamScreen = () => {
  const {
    data: users,
    loading,
    refreshing,
    onRefresh,
  } = useAppwrite(getAllUsers);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const translateY = new Animated.Value(0);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = useCallback(() => {
    if (translateY._value > 100 && !isRefreshing) {
      setIsRefreshing(true);
      onRefresh().finally(() => {
        setIsRefreshing(false);
        // Reset the translateY position after refresh is complete
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Just reset the translateY if no refresh action is needed
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [translateY, onRefresh, isRefreshing]);

  if (loading) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Wrap the whole view here */}
      <SafeAreaView className="bg-primary h-full flex-col">
        {/* Header Section */}
        <Header screenTitle={"Team!"} subTitle={"Pick your"} />
        {/* Main Content Section */}
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleGestureEnd}
        >
          {/* Main Content Section */}
          <Animated.View
            style={{
              flex: 1,
              transform: [{ translateY }],
              position: "relative", // Ensure it behaves like other elements in the layout
            }}
          >
            {/* Pitch */}
            <Pitch users={users} />

            {/* Loader during refresh */}
            {isRefreshing && (
              <View
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: [{ translateX: -50 }, { translateY: -50 }],
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                <ActivityIndicator
                  size="large" // This is the default size, but we're controlling it via width/height
                  color="#000"
                  style={{ width: 150, height: 150 }} // Set a large width and height
                />
                <Text style={{ color: "white", marginTop: 10, fontSize: 18 }}>
                  Refreshing...
                </Text>
              </View>
            )}
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default TeamScreen;
