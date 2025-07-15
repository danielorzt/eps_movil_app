import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";

interface MaterialCardProps {
  title?: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevation?: number;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  title,
  children,
  onPress,
  style,
  elevation = 2,
}) => {
  const { colors, isDark } = useTheme();

  const cardStyle = {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    ...(elevation > 0 && {
      shadowColor: isDark ? "#000" : "#000",
      shadowOffset: { width: 0, height: elevation },
      shadowOpacity: 0.25,
      shadowRadius: elevation,
      elevation: elevation,
    }),
  };

  const content = (
    <>
      {title && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: colors.text.primary,
            marginBottom: 8,
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[cardStyle, style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={[cardStyle, style]}>{content}</View>;
};
