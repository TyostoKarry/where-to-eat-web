import { LastRestaurantPageInfo } from "@components/LastRestaurantPageInfo";
import type { Meta, StoryObj } from "@storybook/react";

const Meta: Meta<typeof LastRestaurantPageInfo> = {
  title: "Components/LastRestaurantPageInfo",
  component: LastRestaurantPageInfo,
  tags: ["autodocs"],
  args: {
    onSelectLocation: () => alert("UserLocationMapModal Opened"),
  },
};

export default Meta;
type Story = StoryObj<typeof LastRestaurantPageInfo>;

export const Default: Story = {};
