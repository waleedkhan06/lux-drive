export interface Car {
  id: string;
  name: string;
  brand: string;
  category: string;
  pricePerDay: number;
  pricePerWeek?: number;
  seats: number;
  transmission: string;
  fuelType: string;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  specs: {
    acceleration: string;
    topSpeed: string;
    engine: string;
    power: string;
  };
  features: string[];
  description: string;
  available: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  avatar?: string;
}

export interface City {
  id: string;
  name: string;
  carCount: number;
  image: string;
}

export interface BookingData {
  carId: string;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  driverAge: string;
  promoCode?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  licenseNumber?: string;
  licenseCountry?: string;
  specialRequests?: string;
}
