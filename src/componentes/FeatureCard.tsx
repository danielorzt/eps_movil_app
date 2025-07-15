import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
  color: string;
}

export const FeatureCard = ({
  title,
  description,
  icon,
  onPress,
  color,
}: FeatureCardProps) => {
  return (
    <TouchableOpacity
      className="w-full bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
      onPress={onPress}
    >
      <View className="flex-row items-center p-4">
        <View
          className="w-12 h-12 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: color }}
        >
          <Text className="text-2xl">{icon}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
          <Text className="text-gray-600">{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
