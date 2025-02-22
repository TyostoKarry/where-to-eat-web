import { ErrorCard } from "@components/ErrorCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ErrorCard> = {
  title: "Components/ErrorCard",
  component: ErrorCard,
  tags: ["autodocs"],
  args: {
    errorTitle: "Error Title",
    errorMessage:
      "Error Message To Display To User (e.g. 'Geolocation is not supported by your browser')",
  },
};

export default meta;
type Story = StoryObj<typeof ErrorCard>;

export const Default: Story = {};

export const WithChildren: Story = {
  args: {
    children: "Additional content to display via children prop e.g. a button",
  },
};
