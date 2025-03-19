import { ShippingRate } from '../types';

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dummy data for shipping rates
const dummyRates: { [key: string]: number } = {
  delhivery: 250,
  dtdc: 300,
  bluedart: 350,
};

// Dummy distance calculation (simplified)
const calculateDistance = (pickup: string, delivery: string): number => {
  // In a real app, you would use Google Maps API or similar
  // For demo, return random distance between 5-20 km
  return Math.floor(Math.random() * 15) + 5;
};

export const ShippingService = {
  getShippingRates: async (pickup: string, delivery: string): Promise<ShippingRate[]> => {
    // Simulate API delay
    await delay(1500);

    const distance = calculateDistance(pickup, delivery);
    
    // Calculate rates based on distance
    return Object.entries(dummyRates).map(([courier, baseRate]) => ({
      courier,
      price: baseRate + (distance * 10), // ₹10 per km
    }));
  },

  createBooking: async (bookingData: {
    pickup: string;
    delivery: string;
    courier: string;
    price: number;
  }) => {
    // Simulate API delay
    await delay(2000);

    // Simulate success with 90% probability
    if (Math.random() > 0.1) {
      return {
        success: true,
        bookingId: `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        ...bookingData,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      };
    } else {
      // Simulate random failure
      throw new Error('Booking failed. Please try again.');
    }
  },

  // Additional dummy endpoints
  trackShipment: async (bookingId: string) => {
    await delay(1000);
    const statuses = ['picked_up', 'in_transit', 'out_for_delivery', 'delivered'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      bookingId,
      status: randomStatus,
      currentLocation: 'Mumbai, Maharashtra',
      lastUpdated: new Date().toISOString(),
      events: [
        {
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          location: 'Mumbai Hub',
          status: 'Package processed',
        },
        {
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          location: 'Mumbai Local Center',
          status: 'Out for delivery',
        },
      ],
    };
  },

  calculateEstimate: async (pickup: string, delivery: string, weight: number) => {
    await delay(1000);
    const distance = calculateDistance(pickup, delivery);
    const baseRate = 100;
    const perKmRate = 10;
    const perKgRate = 20;

    return {
      distance,
      estimatedTime: '2-3 days',
      rates: Object.entries(dummyRates).map(([courier, rate]) => ({
        courier,
        price: rate + (distance * perKmRate) + (weight * perKgRate),
        breakup: {
          base: rate,
          distance: distance * perKmRate,
          weight: weight * perKgRate,
          tax: Math.floor((rate + (distance * perKmRate) + (weight * perKgRate)) * 0.18),
        },
      })),
    };
  },
}; 