# 📦 React Native Shipping App

A beautiful and modern shipping application built with React Native and Expo. This app allows users to book shipments, compare courier rates, and track their packages in real-time.

## ✨ Features

### Core Features
- 📍 Smart address input with auto-complete
- 🚚 Real-time courier rate comparison
- 💰 Detailed price breakdown with taxes
- 📱 Beautiful and responsive UI
- 🎯 Live shipment tracking

### Technical Features
- ⚡ Built with React Native & Expo
- 🎨 Custom animated components
- 🔄 Real-time price calculations
- 🎯 TypeScript for type safety
- 🎬 Smooth animations and transitions

## 📱 Screenshots

[Add your screenshots here]

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shipping-app.git
cd shipping-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Scan the QR code with Expo Go app

## 🛠️ Tech Stack

- **Frontend**
  - React Native
  - Expo
  - TypeScript
  - React Navigation
  - React Native Animatable
  - React Native Vector Icons

- **State Management**
  - React Hooks
  - Context API

- **UI Components**
  - Custom Animated Components
  - Linear Gradients
  - Custom Icons

## 📱 App Structure

```
shipping-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common UI elements
│   │   └── shipping/       # Shipping-specific components
│   ├── screens/            # App screens
│   ├── services/           # API services
│   ├── types/             # TypeScript definitions
│   ├── constants/         # App constants
│   └── utils/            # Helper functions
└── assets/               # Images and icons
```

## 🔥 Key Features Explained

### 1. Smart Address Input
- Auto-complete functionality
- Input validation
- Error handling
- Beautiful animations

### 2. Courier Selection
- Real-time rate comparison
- Dynamic pricing based on distance
- Beautiful dropdown interface
- Courier-specific icons

### 3. Price Calculation
- Base rate calculation
- Distance-based pricing
- Weight considerations
- Tax calculations
- Detailed price breakdown

### 4. Shipment Tracking
- Real-time status updates
- Timeline view
- Location tracking
- Event history

## 🎯 API Integration

The app includes a dummy API service that simulates:
- Shipping rate calculations
- Booking creation
- Shipment tracking
- Price estimates

Example API response for shipping rates:
```typescript
{
  courier: "delhivery",
  price: 350,  // Base rate + distance charge
  breakup: {
    base: 250,
    distance: 100,
    weight: 0,
    tax: 63
  }
}
```

## 🎨 UI Components

### CustomInput
- Floating label animation
- Error state handling
- Icon support
- Multi-line support

### CourierDropdown
- Beautiful modal interface
- Smooth animations
- Icon support
- Error state handling

### PriceBreakdown
- Detailed cost breakdown
- Animated display
- Tax calculations
- Total amount display

## 📝 Environment Variables

Create a `.env` file in the root directory:
```env
API_URL=your_api_url
GOOGLE_MAPS_KEY=your_google_maps_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native team
- Expo team
- All contributors

## 📞 Support

For support, email support@shippingapp.com or join our Slack channel. 