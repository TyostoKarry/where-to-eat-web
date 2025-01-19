import type { Meta, StoryObj } from "@storybook/react";
import { GitHubButton } from "@components/GitHubButton";

const Meta: Meta<typeof GitHubButton> = {
  title: "Components/GitHubButton",
  component: GitHubButton,
  tags: ["autodocs"],
};

export default Meta;
type Story = StoryObj<typeof GitHubButton>;

export const Default: Story = {};
