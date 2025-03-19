import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: object;
  type?: 'primary' | 'secondary';
}

const CustomButton = ({ title, onPress, loading, style, type = 'primary' }: CustomButtonProps) => {
  const colors = type === 'primary' 
    ? [COLORS.primary, COLORS.secondary]
    : [COLORS.gray, COLORS.lightGray];

  return (
    <Animatable.View animation="pulse" duration={2000} iterationCount="infinite">
      <TouchableOpacity 
        onPress={onPress}
        disabled={loading}
        style={style}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.extraLarge,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default CustomButton; 