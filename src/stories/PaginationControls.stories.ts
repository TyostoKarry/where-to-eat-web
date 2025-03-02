import { PaginationControls } from "@components/PaginationControls";
import type { Meta, StoryObj } from "@storybook/react";

const Meta: Meta<typeof PaginationControls> = {
  title: "Components/PaginationControls",
  component: PaginationControls,
  tags: ["autodocs"],
  args: {
    currentPage: 1,
    restaurantCount: 497,
    itemsPerPage: 50,
    totalPages: 10,
    setCurrentPage: setCurrentPage,
  },
  parameters: {
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

function setCurrentPage() {
  alert("Current Page Updated");
}

export default Meta;
type Story = StoryObj<typeof PaginationControls>;

export const Default: Story = {};

export const SmallScreen: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
