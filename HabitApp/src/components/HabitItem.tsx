import { View, Text } from 'react-native'
import React from 'react'
import { Button, Card, Divider } from 'react-native-paper';
import { Habit } from '@/types/habit';
import { useRouter } from 'expo-router';

type Props = {
    data: Habit;
    onToggleDone: (id: number, isDone: 0 | 1) => void;
  };

const HabitItem = ({data, onToggleDone} : Props) => {
    const router = useRouter();
    const onPressEdit = () => {
        router.push({ pathname: "/form", params: { id: data.id.toString() } });
      };
    const doneTodayText = data.done_today === 0 ? 'Đã hoàn thành' : 'Chưa hoàn thành';
    const doneTodayClass = data.done_today === 0 ? 'text-green-600' : 'text-red-600'; 

    return (
        <View className="px-4 my-2">
            <Card className="rounded-lg shadow-md">
                
                <Card.Title 
                    title={data.title} 
                    titleStyle={{ fontWeight: '700', fontSize: 18 }}
                    subtitle={data.done_today === 0 ? 'Đã hoàn thành' : 'Cần thực hiện'}
                />
                
                <Card.Content>
                    <Text className="text-base leading-6 mb-2 text-gray-700">
                        <Text className="font-semibold text-gray-800">Mô tả:</Text> {data.description || "Không có mô tả"}
                    </Text>
                    
                    <Divider className="my-1" /> 

                    <View className="flex-row justify-between items-center py-2">
                         <Text className={`text-base font-bold ${doneTodayClass}`}>
                             {doneTodayText}
                         </Text>
                         
                         {/* Placeholder cho nút Đánh dấu hoàn thành/Hủy */}
                         <Button 
                             mode={data.done_today === 0 ? "contained" : "outlined"}
                             buttonColor={data.done_today === 0 ? '#10B981' : undefined}
                             // Giả định onToggleDone sẽ được truyền vào từ màn hình cha
                             onPress={() => onToggleDone(data.id, data.done_today === 0 ? 1 : 0)} 
                             compact // Nút nhỏ gọn
                         >
                             {data.done_today === 1 ? 'Hoàn thành' : 'Hủy'}
                         </Button>
                    </View>
                </Card.Content>
                
                <Card.Actions>
                    <Button mode="contained" onPress={onPressEdit}>
                        Edit
                    </Button>
                    <Button mode="contained" >
                        Delete
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

export default HabitItem