# Card House - Credit Card Customization App

A modern, interactive web application for designing custom credit cards with real-time 3D preview. Built with React, TypeScript, and Three.js.

![Card House Logo](https://img.shields.io/badge/Card%20House-Credit%20Card%20Designer-blue)

## 🎨 Features

- **3D Card Preview** - Interactive 3D model that updates in real-time as you customize
- **Color Customization** - Choose from 6 premium color options:
  - Pale Blue
  - Blue
  - Green
  - Orange
  - Magenta
  - Metal
- **Pattern Selection** - Apply different patterns to your card:
  - Clear (no pattern)
  - Squares
  - Stripes
  - Circles
- **Personalization** - Add your name and card number with live preview
- **Responsive Design** - Clean, modern dark-themed interface
- **Reset Functionality** - Quickly reset all customizations to default

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/card-house.git
cd card-house
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to the port shown in your terminal.

## 🛠️ Built With

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Three.js** - 3D graphics and rendering
- **React Context API** - State management
- **CSS Modules** - Component-scoped styling
- **Vite** - Build tool and development server

## 📁 Project Structure

```
src/
├── components/
│   ├── ActionButton/        # CTA buttons (Reset, Apply)
│   ├── CardModel/           # 3D card rendering with Three.js
│   ├── ColorChoiceButton/   # Individual color selection button
│   ├── ColorChoiceButtons/  # Color selection container
│   ├── CustomizationPanel/  # Main customization controls
│   ├── Header/              # App navigation header
│   ├── HeroHeader/          # Hero section with title
│   ├── InputField/          # Text input for name/number
│   ├── PatternChoiceButton/ # Individual pattern button
│   ├── PatternChoiceButtons/# Pattern selection container
│   ├── TextField/           # Info text display
│   └── TextContainer/       # Reusable text container
├── context/
│   └── CardDataContext.tsx  # Global state management
├── fonts/                   # SF Pro font files
├── App.tsx                  # Main app component
├── App.css                  # Global styles and variables
└── index.css                # Base styles
```

## 🎮 Usage

1. **Select a Color**: Click on any of the color swatches in the Color section.
2. **Choose a Pattern**: Select from the available pattern options.
3. **Add Personalization**:
   - Enter your name (maximum 25 characters).
   - Enter the card number (maximum 16 digits; formatting is applied automatically).
4. **Preview**: View your customizations in real time on the 3D card model.
5. **Reset**: Click the **Reset** button to clear all customizations.
6. **Apply**: Click **"Apply for Card"** when you’re satisfied with your design.  
   _(This button is included for demonstration purposes only and is currently non-functional.)_

## 🎨 Customization Options

### Colors

The app includes 6 professionally designed gradient colors:

- Each color uses a two-tone gradient effect

### Patterns

Pattern overlays are rendered on top of the base color:

- Patterns use semi-transparent overlays for subtle effect
- Each pattern is SVG-based for crisp rendering

### 3D Model

- Uses GLTF format for optimized loading
- Includes orbit controls for interactive viewing
- Real-time texture updates based on color selection
- Dynamic text rendering for name and card number

## 🔧 Development

### Key Components

- **CardDataContext**: Manages global state for all customization options
- **CardModelScene**: Handles Three.js scene setup and 3D rendering
- **InputField**: Validates and formats user input with error handling
- **ColorChoiceButton/PatternChoiceButton**: Reusable button components with visual feedback

### Styling Approach

- CSS Modules for component isolation
- CSS custom properties for theme consistency
- SF Pro font family for Apple-inspired design
- Dark theme with careful contrast ratios

## 📝 Input Validation

- **Name Field**:
  - Accepts letters and spaces only
  - Swedish characters (å, ä, ö) supported
  - Maximum 25 characters
- **Card Number Field**:
  - Accepts numbers only
  - Auto-formats with spaces every 4 digits
  - Maximum 16 digits
  - Real-time validation feedback

## 🚦 Browser Support

- Chrome (recommended for best Three.js performance)
- Firefox
- Safari
- Edge

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Three.js community for excellent 3D rendering capabilities
- SF Pro font by Apple Inc.
- React team for the amazing framework

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a demo application for educational purposes. Terms and conditions mentioned in the app are placeholder text.
