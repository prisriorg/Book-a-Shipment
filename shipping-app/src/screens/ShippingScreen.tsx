import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/theme';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import CourierDropdown from '../components/shipping/CourierDropdown';
import PriceBreakdown from '../components/shipping/PriceBreakdown';
import { ShippingService } from '../services/api';
import { ShippingRate } from '../types';

const ShippingScreen = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedCourier, setSelectedCourier] = useState('');
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    pickup: '',
    delivery: '',
    courier: '',
  });

  const validateInputs = () => {
    const newErrors = {
      pickup: '',
      delivery: '',
      courier: '',
    };

    if (!pickupAddress) {
      newErrors.pickup = 'Pickup address is required 📦';
    }
    if (!deliveryAddress) {
      newErrors.delivery = 'Delivery address is required 📦';
    }
    if (!selectedCourier && shippingRates.length > 0) {
      newErrors.courier = 'Please select a courier 🚀';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const fetchShippingRates = async () => {
    if (!pickupAddress || !deliveryAddress) {
      validateInputs();
      return;
    }

    try {
      setLoading(true);
      const rates = await ShippingService.getShippingRates(pickupAddress, deliveryAddress);
      setShippingRates(rates);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch shipping rates');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!validateInputs()) return;

    const selectedRate = shippingRates.find(rate => rate.courier === selectedCourier);
    if (!selectedRate) return;

    try {
      setLoading(true);
      await ShippingService.createBooking({
        pickup: pickupAddress,
        delivery: deliveryAddress,
        courier: selectedCourier,
        price: selectedRate.price,
      });
      Alert.alert('Success ✨', 'Booking confirmed successfully!');
      // Reset form
      setPickupAddress('');
      setDeliveryAddress('');
      setSelectedCourier('');
      setShippingRates([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const selectedRate = shippingRates.find(rate => rate.courier === selectedCourier);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.header}
      >
        <Animatable.Text 
          animation="fadeInDown" 
          style={styles.title}
        >
          Book a Shipment 📦
        </Animatable.Text>
      </LinearGradient>

      <Animatable.View 
        animation="fadeInUp"
        style={styles.formContainer}
      >
        <CustomInput
          label="Pickup Address 📍"
          value={pickupAddress}
          onChangeText={setPickupAddress}
          placeholder="Enter pickup address"
          icon="map-marker"
          multiline
          error={errors.pickup}
        />

        <CustomInput
          label="Delivery Address 🎯"
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
          placeholder="Enter delivery address"
          icon="map-marker-outline"
          multiline
          error={errors.delivery}
        />

        {shippingRates.length > 0 && (
          <Animatable.View animation="fadeIn">
            <CourierDropdown
              value={selectedCourier}
              onSelect={setSelectedCourier}
              error={errors.courier}
            />

            {selectedRate && (
              <PriceBreakdown
                basePrice={100}
                distance={10}
                ratePerKm={selectedRate.price / 10}
                taxes={selectedRate.price * 0.18}
              />
            )}
          </Animatable.View>
        )}

        <CustomButton
          title={shippingRates.length === 0 ? 'Check Rates 🚀' : 'Proceed to Payment 💳'}
          onPress={shippingRates.length === 0 ? fetchShippingRates : handleBooking}
          loading={loading}
          style={styles.button}
        />
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingVertical: SIZES.extraLarge * 2,
    paddingHorizontal: SIZES.large,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  formContainer: {
    marginTop: -30,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: SIZES.extraLarge,
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.medium,
  },
  button: {
    marginTop: SIZES.large,
  },
});

export default ShippingScreen; 