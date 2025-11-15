import EmptyState from "@/components/EmptyState";
import HabitItem from "@/components/HabitItem";
import { getAllHabits } from "@/db/db";
import { Habit } from "@/types/habit";
import { Link, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const db = useSQLiteContext();

  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchDb = async () => {
    setIsLoading(true);
    try {
        const res = await getAllHabits(db); 
        setHabits(res);
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu Habit:", error);
    } finally {
        setIsLoading(false);
    }
};

  useFocusEffect(
    useCallback(() => {
      handleFetchDb();
    }, [db])
  );

  if (isLoading) {
    return (
        <View 
            className="flex-1 items-center justify-center bg-gray-50"
        >
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text className="mt-2 text-base text-gray-600">Đang tải dữ liệu...</Text>
        </View>
    );
}

  return (
    <View className="flex flex-1">
      <View 
                className="p-4 border-b border-gray-200 bg-white shadow-sm"
            >
                 <Text className="text-2xl font-extrabold text-gray-800">
                     Theo dõi Thói quen
                 </Text>
             </View>
             
            <FlatList 
                data={habits}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    // Chỉ truyền data theo yêu cầu hiện tại
                    <HabitItem data={item} /> 
                )}
                // Thiết lập Empty State
                ListEmptyComponent={EmptyState}
                // Đảm bảo Empty State nằm giữa màn hình khi không có data
                contentContainerStyle={habits.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : {}}
            />
    </View>
  );
}


