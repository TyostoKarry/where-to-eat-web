import { GitHubButton } from "@components/GitHubButton";
import type { Meta, StoryObj } from "@storybook/react";

const Meta: Meta<typeof GitHubButton> = {
  title: "Components/GitHubButton",
  component: GitHubButton,
  tags: ["autodocs"],
};

export default Meta;
type Story = StoryObj<typeof GitHubButton>;

export const Default: Story = {};
