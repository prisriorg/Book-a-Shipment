import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SIZES } from '../../constants/theme';

interface PriceBreakdownProps {
  basePrice: number;
  distance: number;
  ratePerKm: number;
  taxes: number;
}

const PriceBreakdown = ({ basePrice, distance, ratePerKm, taxes }: PriceBreakdownProps) => {
  const deliveryCharge = distance * ratePerKm;
  const subtotal = basePrice + deliveryCharge;
  const totalAmount = subtotal + taxes;

  return (
    <Animatable.View 
      animation="fadeInUp" 
      style={styles.container}
    >
      <Text style={styles.title}>Price Breakdown 💰</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Base Price:</Text>
        <Text style={styles.value}>₹{basePrice.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Distance ({distance} km):</Text>
        <Text style={styles.value}>₹{deliveryCharge.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Taxes & Fees:</Text>
        <Text style={styles.value}>₹{taxes.toFixed(2)}</Text>
      </View>
      
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalValue}>₹{totalAmount.toFixed(2)}</Text>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SIZES.medium,
    marginVertical: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.base,
  },
  label: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  value: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: SIZES.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: SIZES.medium,
  },
  totalLabel: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  totalValue: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default PriceBreakdown; 