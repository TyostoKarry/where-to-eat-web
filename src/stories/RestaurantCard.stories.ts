import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantCard } from "@components/RestaurantCard";

const Meta: Meta<typeof RestaurantCard> = {
  title: "Components/RestaurantCard",
  component: RestaurantCard,
  tags: ["autodocs"],
  args: {
    restaurantName: "Restaurant Name",
    distance: 123,
    latitude: 12.345,
    longitude: 12.345,
  },
};

export default Meta;
type Story = StoryObj<typeof RestaurantCard>;

export const NoProps: Story = {};

export const WithProps: Story = {
  args: {
    address: "Restaurant address 12 A 3",
    postalCode: "12345",
    cuisine: ["Italian", "Pizza"],
    dietaryOptions: ["Vegan", "Vegetarian"],
    openingHours: "Mo-Fr 12:00-22:00;Sa-Su 12:00-23:00",
    phoneNumber: "+1234567890",
    website: "https://www.example.com",
  },
};
