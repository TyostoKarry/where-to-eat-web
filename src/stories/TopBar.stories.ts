import { TopBar } from "@components/TopBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TopBar> = {
  title: "Components/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  args: {
    openUserLocationMapModal: () => alert("UserLocationMapModal Opened"),
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
