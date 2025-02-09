import { TopBar } from "@components/TopBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TopBar> = {
  title: "Components/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  args: {
    userLocation: { lat: 12.345, lon: 12.345 },
  },
  parameters: {
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const Default: Story = {};

export const SmallScreen: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
