import EmptyState from "@/components/EmptyState";
import HabitItem from "@/components/HabitItem";
import { deleteHabit, getAllHabits, updateDoneToday } from "@/db/db";
import { Habit } from "@/types/habit";
import { Link, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
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

const handleToggleDone = (id: number, isDone: 0 | 1) => {
  console.log(`Toggle Habit ${id}: ${isDone}`);
  updateDoneToday(db, id, isDone).then(() => handleFetchDb())
};

const handleDelete = (id: number, title: string) => {
  Alert.alert(
    "Xác nhận Xóa",
    `Bạn có chắc chắn muốn xóa thói quen "${title}" không? Hành động này không thể hoàn tác.`,
    [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteHabit(db, id);
            // Cập nhật danh sách sau khi xóa thành công
            handleFetchDb(); 
            console.log(`Habit ${id} (${title}) deleted.`);
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa thói quen.");
            console.error("Delete failed:", error);
          }
        },
      },
    ],
    { cancelable: true }
  );
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
                    <HabitItem onDelete={handleDelete} onToggleDone={handleToggleDone} data={item} /> 
                )}
                ListEmptyComponent={EmptyState}
                contentContainerStyle={habits.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : {}}
            />
    </View>
  );
}


