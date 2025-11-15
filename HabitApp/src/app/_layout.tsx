import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { Slot, Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Text } from "react-native";
import { Icon } from "react-native-paper";
import { initTable } from "@/db/db";

export default function Layout() {
  return <SQLiteProvider databaseName="app500.db" onInit={(db) => initTable(db)}>
  <SafeAreaProvider>
    <SafeAreaView className="flex flex-1">
      <Text className="text-3xl text-center font-bold">
        Habits Tracker
      </Text>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "purple",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Icon
                source={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              ></Icon>
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="form"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Icon source={"form-select"} size={24} color={color}></Icon>
            ),
          }}
        ></Tabs.Screen>

      </Tabs>
    </SafeAreaView>
  </SafeAreaProvider>
</SQLiteProvider>
}
