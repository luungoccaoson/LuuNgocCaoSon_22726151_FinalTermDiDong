import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  return (
    <View className="flex flex-1">
      <Text>Hello</Text>
      <Text className="text-3xl">Habits</Text>
      <Text>Uống 2 lít nước</Text>
      <Text>Đi bộ 15 phút</Text>
    </View>
  );
}


