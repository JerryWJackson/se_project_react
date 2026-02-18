# WTWR (What to Wear?)

A React application that recommends clothing items based on the current weather conditions.

## 🌟 Features

-   **Weather Integration**: Fetches real-time weather data to provide accurate recommendations.
-   **Smart Recommendations**: Filters your wardrobe to show items suitable for the current temperature (Hot, Warm, Cold).
-   **User Accounts**: 
    -   Register and Log In securely.
    -   Manage your personal profile and avatar.
-   **Wardrobe Management**: Add new clothing items with images and delete unwanted items.
-   **Customization**:
    -   **Unit Conversion**: Toggle between Fahrenheit and Celsius.
    -   **Dark Mode**: A sleek dark theme that persists based on user preference.
-   **Responsive Design**: Optimized for desktop and mobile devices.

## 🛠️ Technologies

This project is built with a modern React stack:

-   **Core**: [React 18](https://reactjs.org/)
-   **Build Tool**: [Vite v5](https://vitejs.dev/) for fast development and optimized builds.
-   **State Management**: 
    -   **Context API**: `CurrentUserContext`, `ModalContext`, `UserPreferencesContext` (Theme/Units).
    -   **Custom Hooks**: `useAuth`, `useWeather`, `useClothingItems`, `useForm`.
-   **Styling**: Pure CSS with BEM methodology and CSS variables for theming.
-   **Routing**: [React Router v6](https://reactrouter.com/).
-   **Testing**: [Vitest v4](https://vitest.dev/) and [Testing Library](https://testing-library.com/).

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/JerryWJackson/se_project_react.git
    cd se_project_react
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory with the following keys:
    ```env
    VITE_WEATHER_API_KEY=your_api_key_here
    VITE_API_BASE_URL=http://localhost:3001
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` directory.

## 🧪 Testing

This project uses **Vitest** for unit and integration testing.

To run the tests:

```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## 🔗 Links

- [Live Site](https://jerrywjackson.github.io/se_project_react/)
- [Backend Repository](https://github.com/JerryWJackson/se_project_express)
