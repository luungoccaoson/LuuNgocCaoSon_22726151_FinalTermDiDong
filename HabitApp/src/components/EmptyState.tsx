import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

const EmptyState = () => (
    <View className="flex-1 items-center justify-center p-8 bg-white">
        <Text className="text-xl font-extrabold text-indigo-600 text-center mb-4">
            🎉 Bắt đầu ngay!
        </Text>
        <Text className="text-gray-500 text-center mb-6">
            Chưa có thói quen nào, hãy thêm một thói quen mới!
        </Text>
        {/* Giữ nút này là placeholder để hiển thị rõ Empty State */}
        {/* <Button 
            mode="contained" 
            className="bg-indigo-500" 
            onPress={() => console.log('Mở Modal Thêm Habit')}
        >
            + Thêm Thói quen
        </Button> */}
    </View>
);

export default EmptyState