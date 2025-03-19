import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { ShippingRate } from '../../types';

interface RateCardProps {
  rate: ShippingRate;
  selected: boolean;
  onSelect: () => void;
}

const courierIcons = {
  delhivery: 'truck-delivery',
  dtdc: 'truck-fast',
  bluedart: 'airplane',
};

const RateCard = ({ rate, selected, onSelect }: RateCardProps) => {
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      delay={200}
    >
      <TouchableOpacity onPress={onSelect} activeOpacity={0.8}>
        <LinearGradient
          colors={selected ? [COLORS.primary, COLORS.secondary] : [COLORS.white, COLORS.white]}
          style={[styles.card, selected && styles.selectedCard]}
        >
          <View style={styles.iconContainer}>
            <Icon
              name={courierIcons[rate.courier as keyof typeof courierIcons] || 'truck'}
              size={32}
              color={selected ? COLORS.white : COLORS.primary}
            />
          </View>
          <View style={styles.content}>
            <Text style={[styles.courierName, selected && styles.selectedText]}>
              {rate.courier.toUpperCase()}
            </Text>
            <Text style={[styles.price, selected && styles.selectedText]}>
              ₹{rate.price.toFixed(2)}
            </Text>
            <Text style={[styles.estimatedTime, selected && styles.selectedText]}>
              Estimated Delivery: 2-3 days
            </Text>
          </View>
          {selected && (
            <View style={styles.checkmark}>
              <Icon name="check-circle" size={24} color={COLORS.white} />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    marginHorizontal: SIZES.base,
    marginVertical: SIZES.base / 2,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  selectedCard: {
    elevation: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: selected => selected ? 'rgba(255,255,255,0.2)' : COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: SIZES.medium,
  },
  courierName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  price: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 4,
  },
  estimatedTime: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  selectedText: {
    color: COLORS.white,
  },
  checkmark: {
    position: 'absolute',
    top: SIZES.base,
    right: SIZES.base,
  },
});

export default RateCard; 