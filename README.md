# Shipping App

A React Native/Expo application for booking shipments with real-time shipping rate calculations.

## Features

- Input fields for pickup & delivery addresses
- Courier selection (Delhivery, DTDC, Bluedart)
- Real-time shipping rate calculations
- Simple and intuitive UI
- Backend API with MySQL integration

## Prerequisites

- Node.js (v14 or later)
- MySQL Server
- Expo CLI
- Expo Go app (for mobile testing)

## Setup Instructions

### Frontend (React Native/Expo)

1. Install dependencies:
   ```bash
   cd shipping-app
   npm install
   ```

2. Start the Expo development server:
   ```bash
   npm start
   ```

3. Use the Expo Go app to scan the QR code and run the app on your device

### Backend (Express/MySQL)

1. Install MySQL and create a database:
   ```sql
   CREATE DATABASE shipping_db;
   ```

2. Navigate to the backend directory and install dependencies:
   ```bash
   cd shipping-backend
   npm install
   ```

3. Create a `.env` file in the backend directory with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=shipping_db
   PORT=3000
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```

## API Endpoints

- GET `/api/shipping-rates`: Get shipping rates based on pickup and delivery addresses
  - Query parameters:
    - `pickup`: Pickup address
    - `delivery`: Delivery address

## Technologies Used

- React Native/Expo
- TypeScript
- Express.js
- MySQL
- React Navigation
- React Native Elements

## Project Structure

```
shipping-app/
├── src/
│   └── screens/
│       └── ShippingScreen.tsx
├── App.tsx
└── shipping-backend/
    └── server.js
```

## Notes

- The shipping rate calculation in this demo uses a fixed distance of 10km. In a production environment, you would want to implement proper distance calculation between addresses.
- The MySQL connection uses default credentials. Make sure to update them with your actual MySQL credentials in the backend server. 