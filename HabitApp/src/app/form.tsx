import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite';
import { useNavigation, useRouter } from 'expo-router';
import { Habit } from '@/types/habit';
import { createHabit } from '@/db/db';
import { Button, RadioButton, TextInput } from 'react-native-paper';

const HabitFormScreen = () => {
    const db = useSQLiteContext();
  const navigation = useNavigation();
  const router = useRouter();

  const [formData, setFormData] = useState<Habit>({} as Habit);

  const handleSave = async () => {
    if (!formData.title || !formData.description) return;

    // if (id) await updateTransaction(db, formData);
    await createHabit(db, formData);

    setFormData({} as Habit);
    // titleRef.current?.clear();
    // amountRef.current?.clear();
    router.replace("/");
  };
  return (
    <View className="flex flex-1 justify-center items-center">
      <View className="w-full px-4 gap-4">
        <Text className="text-lg">New Habits</Text>
        <TextInput
          label={"Title"}
          value={formData.title ?? ""}
          onChangeText={(value) => setFormData({ ...formData, title: value })}
        />
        <TextInput
          label={"Description"}
          value={formData.description ?? ""}
          onChangeText={(value) =>
            setFormData({ ...formData, description: value })
          }
        />
        {/* <RadioButton.Group
          value={formData.active ? "1" : "0"}
          onValueChange={(value) =>
            setFormData({ ...formData, active : value === "1" ? true : false })
          }
        >
            <Text className="text-lg">Active</Text>
          <RadioButton.Item label="Đang theo dõi" value="1" />
          <RadioButton.Item label="Hoàn thành" value="0" />
        </RadioButton.Group> */}

        <TextInput
          label={"CreateAt"}
          keyboardType="number-pad"
          value={formData.created_at ? formData.created_at.toString() : ""}
          onChangeText={(value) =>
            setFormData({ ...formData, created_at: Number(value) })
          }
        ></TextInput>
        
        <Button mode="contained" onPress={handleSave}>
          Save
        </Button>
        
      </View>
    </View>
  )
}

export default HabitFormScreen