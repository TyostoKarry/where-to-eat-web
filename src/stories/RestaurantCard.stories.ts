import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantCard } from "@components/RestaurantCard";

const Meta: Meta<typeof RestaurantCard> = {
  title: "Components/RestaurantCard",
  component: RestaurantCard,
  tags: ["autodocs"],
  args: {
    restaurantName: "Restaurant Name",
    distance: "1.2 km",
  },
};

export default Meta;
type Story = StoryObj<typeof RestaurantCard>;

export const NoProps: Story = {};

export const WithProps: Story = {
  args: {
    address: "Restaurant address 12 A 3",
    cuisine: ["Italian", "Pizza"],
    dietaryOptions: ["Vegan", "Vegetarian"],
    openingHours: "Mon-Sun 12:00-22:00",
    phoneNumber: "+1234567890",
    website: "https://www.example.com",
  },
};
