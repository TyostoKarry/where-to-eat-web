# Where To Eat Web

A **React-based** web application that helps users find nearby restaurants using **OpenStreetMap (OSM)** data and **Leaflet** for interactive maps.

![Main application](https://imgur.com/HUgSEVL.jpeg)

## Technologies

- **Frontend**: React 18, TypeScript, Vite
- **Maps**: Leaflet, OpenStreetMap Overpass API
- **Styling**: CSS Modules
- **Tooling**: Storybook, ESLint, Prettier

## Features

**Location & Restaurant Discovery**

- **Automatic Geolocation Detection**: Uses the browser’s Geolocation API to detect the user's location.
- **Manual Location Selection**: Users can pick a location via an interactive map modal.
- **Nearby Restaurants**: Fetches restaurants within a 2km radius from OpenStreetMap (OSM).
- **Live Distance Calculation**: Shows how far each restaurant is from the user.

  ![UserLocationMapModal](https://imgur.com/p60wyrN.jpeg)

**Comprehensive Restaurant Information**

- **Address**: Street name, house number, postal code.
- **Cuisine Type**: Categories such as pizza, sushi, or vegan.
- **Dietary Options**: Information on vegetarian, vegan, or gluten-free availability.
- **Opening Hours**: Human-readable format parsed from OSM's structured time data.
- **Phone Number**: Contact details when available.
- **Website**: Links to restaurant websites or a Google search if no website is provided.
- **Distance**: Calculates the distance between the user and the restaurant.

  ![RestaurantCard](https://imgur.com/1dDa395.jpeg)

**User Interface**

- **Masonry Grid Layout**: Dynamically adjusts to content size.
- **Smooth UI Transitions**: Skeleton loading states ensure a smooth user experience.

  ![Main application loading](https://imgur.com/GHg0kJW.jpeg)

- **Expandable Restaurant Cards**: Click the distance button on a card to reveal an embedded map displaying restaurant location.

  ![RestaurantCard map open](https://imgur.com/rdUcLSu.jpeg)

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
