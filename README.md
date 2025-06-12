# Where To Eat Web

A **React-based** web application that helps users find nearby restaurants using **OpenStreetMap (OSM)** data and **Leaflet** for interactive maps.

<div align="center">
  <a href="https://tyostokarry.github.io/where-to-eat-web/">
    <img src="https://img.shields.io/badge/APP LIVE-Visit Site-4e9af1?style=for-the-badge" alt="App Live" />
  </a>
</div>

</br>

<div align="center">
  <img src="https://i.imgur.com/Hl1GoxM.gif" alt="Main application" />
</div>

## Technologies

- **Frontend**: React 18, TypeScript, Vite
- **Maps**: Leaflet, OpenStreetMap Overpass API
- **Styling**: CSS Modules
- **Tooling**: Storybook, ESLint, Prettier

## Features

### **Location & Restaurant Discovery**

- **Automatic Geolocation Detection**: Uses the browser’s Geolocation API to detect the user's location.
- **Manual Location Selection**: Users can pick a location via an interactive map modal.
- **Nearby Restaurants**: Fetches restaurants within a 10km radius from OpenStreetMap (OSM).
- **Live Distance Calculation**: Shows how far each restaurant is from the user.

<div align="center">
  <img src="https://imgur.com/bmsgiv6.png" alt="UserLocationMapModal" />
</div>

### **Comprehensive Restaurant Information**

- **Address**: Street name, house number, postal code.
- **Cuisine Type**: Categories such as pizza, sushi, or pasta.
- **Dietary Options**: Information on vegetarian, vegan, or gluten-free availability.
- **Opening Hours**: Human-readable format parsed from OSM's structured time data.
- **Phone Number**: Contact details when available.
- **Website**: Links to restaurant websites or a Google search if no website is provided.
- **Distance**: Calculates the distance between the user and the restaurant.
- **Interactive Map**: Each restaurant card includes an interactive embedded map that can be revealed by clicking the card, displaying the restaurant's location.

<div align="left">
  <img src="https://i.imgur.com/QdacTXB.gif" alt="RestaurantCard" width="300" />
</div>

### **Filtering Options**

- **Place Type**: Filter restaurants by type, such as Restaurant or Fast Food.
- **Cuisine Type**: Choose from a wide range of cuisines, including Italian, Indian, Mexican, and more.
- **Dietary Options**: Narrow down results based on dietary preferences, such as Vegan, Gluten-Free, or Lactose-Free.
- **Dynamic Filtering**: Filter options are dynamically generated based on the available data for nearby restaurants, ensuring relevant filters for each location. Selecting filters instantly updates the restaurant list to match your preferences.

<div align="left">
  <img src="https://imgur.com/EenYKHf.png" alt="FilterModal" width="300" />
</div>

### **User Interface**

- **Masonry Grid Layout**: Dynamically adjusts to content size.
- **Smooth UI Transitions**: Skeleton loading states ensure a smooth user experience.

<div align="center">
  <img src="https://i.imgur.com/bzCZ54z.gif" alt="Main application loading" />
</div>

## Installation

1. Prerequisites

- Node.js 20.x
- npm

2. Clone the repository:

```bash
git clone https://github.com/TyostoKarry/where-to-eat-web.git
```

3. Navigate to the project directory:

```bash
cd where-to-eat-web
```

4. Install the dependencies:

```bash
npm install
```

5. Run the Development Server:

```bash
npm run dev
```

## License

This project is open-source and available under the [MIT License](./LICENSE).
