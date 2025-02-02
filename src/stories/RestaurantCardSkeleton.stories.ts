import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantCardSkeleton } from "@components/RestaurantCardSkeleton";

const Meta: Meta<typeof RestaurantCardSkeleton> = {
  title: "Components/RestaurantCardSkeleton",
  component: RestaurantCardSkeleton,
  tags: ["autodocs"],
};

export default Meta;
type Story = StoryObj<typeof RestaurantCardSkeleton>;

export const Default: Story = {};

export const oneInfo: Story = {
  args: {
    infoCount: 1,
  },
};

export const twoInfo: Story = {
  args: {
    infoCount: 2,
  },
};

export const threeInfo: Story = {
  args: {
    infoCount: 3,
  },
};

export const fourInfo: Story = {
  args: {
    infoCount: 4,
  },
};

export const fiveInfo: Story = {
  args: {
    infoCount: 5,
  },
};
