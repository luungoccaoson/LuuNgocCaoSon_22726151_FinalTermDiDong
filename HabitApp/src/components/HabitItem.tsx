import { View, Text } from 'react-native'
import React from 'react'
import { Button, Card, Divider } from 'react-native-paper';
import { Habit } from '@/types/habit';

type Props = {
    data: Habit;
  };

const HabitItem = ({data} : Props) => {
    const doneTodayText = data.done_today === true ? '✅ Đã hoàn thành' : '❌ Chưa hoàn thành';
    const doneTodayClass = data.done_today === true ? 'text-green-600' : 'text-red-600'; 

    return (
        <View className="px-4 my-2">
            <Card className="rounded-lg shadow-md">
                
                {/* HIỂN THỊ TITLE */}
                <Card.Title 
                    title={data.title} 
                    titleStyle={{ fontWeight: '700', fontSize: 18 }}
                    // Có thể dùng subtitle để làm nổi bật trạng thái
                    subtitle={data.done_today === true ? 'Đã hoàn thành' : 'Cần thực hiện'}
                />
                
                <Card.Content>
                    {/* HIỂN THỊ DESCRIPTION */}
                    <Text className="text-base leading-6 mb-2 text-gray-700">
                        <Text className="font-semibold text-gray-800">Mô tả:</Text> {data.description || "Không có mô tả"}
                    </Text>
                    
                    <Divider className="my-1" /> 

                    {/* HIỂN THỊ TRẠNG THÁI DONE_TODAY (Nổi bật) */}
                    <View className="py-2">
                         <Text className={`text-base font-bold ${doneTodayClass}`}>
                             Trạng thái hôm nay: {doneTodayText}
                         </Text>
                    </View>
                </Card.Content>
                
                <Card.Actions>
                    <Button mode="contained" >
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