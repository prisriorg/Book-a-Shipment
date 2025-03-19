export interface ShippingRate {
  courier: string;
  price: number;
}

export interface Booking {
  bookingId: string;
  pickup: string;
  delivery: string;
  courier: string;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  estimatedDelivery: string;
}

export interface TrackingEvent {
  timestamp: string;
  location: string;
  status: string;
}

export interface TrackingInfo {
  bookingId: string;
  status: 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered';
  currentLocation: string;
  lastUpdated: string;
  events: TrackingEvent[];
}

export interface PriceBreakup {
  base: number;
  distance: number;
  weight: number;
  tax: number;
}

export interface CourierRate {
  courier: string;
  price: number;
  breakup: PriceBreakup;
}

export interface ShippingEstimate {
  distance: number;
  estimatedTime: string;
  rates: CourierRate[];
}

export interface CourierOption {
  label: string;
  value: string;
  icon: string;
}

export interface AddressInput {
  address: string;
  city: string;
  state: string;
  pincode: string;
} 