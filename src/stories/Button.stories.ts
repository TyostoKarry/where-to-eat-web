import { Button } from "@components/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    label: "Click Me",
    width: "auto",
    onClick: () => alert("Button clicked"),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const LightTheme: Story = {
  args: {
    useLightTheme: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledLightTheme: Story = {
  args: {
    disabled: true,
    useLightTheme: true,
  },
};
