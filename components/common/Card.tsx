import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({ children, onPress, containerStyle }) => {
  const { appTheme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <View
        style={[{
          backgroundColor: appTheme.colors.primary,
          borderRadius: appTheme.borderRadius.small,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 5,
          marginBottom: appTheme.spacing.medium,
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: appTheme.colors.secondary,
          borderLeftWidth: 6,
          padding: appTheme.spacing.small,
        }, containerStyle]}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};