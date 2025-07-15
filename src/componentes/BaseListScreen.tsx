import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type BaseListScreenProps<T> = {
  title: string;
  data: T[];
  isLoading: boolean;
  renderItem: (item: T) => React.ReactNode;
  onAddPress: () => void;
  onItemPress: (item: T) => void;
  navigation: NativeStackScreenProps<RootStackParamList, any>["navigation"];
};

export function BaseListScreen<T>({
  title,
  data,
  isLoading,
  renderItem,
  onAddPress,
  onItemPress,
  navigation,
}: BaseListScreenProps<T>) {
  return (
    <View className="flex-1 bg-white">
      <View className="p-4 flex-row justify-between items-center border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">{title}</Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={onAddPress}
        >
          <Text className="text-white font-semibold">Agregar</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : (
        <ScrollView className="flex-1 p-4">
          {data.length === 0 ? (
            <View className="flex-1 justify-center items-center py-8">
              <Text className="text-gray-500 text-lg">
                No hay elementos para mostrar
              </Text>
            </View>
          ) : (
            <View className="space-y-4">
              {data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                  onPress={() => onItemPress(item)}
                >
                  {renderItem(item)}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
