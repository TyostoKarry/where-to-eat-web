import { PaginationControls } from "@components/PaginationControls";
import type { Meta, StoryObj } from "@storybook/react";

const Meta: Meta<typeof PaginationControls> = {
  title: "Components/PaginationControls",
  component: PaginationControls,
  tags: ["autodocs"],
  args: {
    currentPage: 1,
    restaurantCount: 497,
  },
};

export default Meta;
type Story = StoryObj<typeof PaginationControls>;

export const Default: Story = {};
