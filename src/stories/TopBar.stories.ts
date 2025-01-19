import type { Meta, StoryObj } from "@storybook/react";
import { TopBar } from "@components/TopBar";

const meta: Meta<typeof TopBar> = {
  title: "Components/TopBar",
  component: TopBar,
  tags: ["autodocs"],
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
