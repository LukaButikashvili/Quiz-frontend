import HeadingIcon from "@/assets/icons/Heading.svg";
import QuestionIcon from "@/assets/icons/Question.svg";
import FooterIcon from "@/assets/icons/Footer.svg";
import { BlockType, type BuildingBlockConfig } from "@/types";

export const BUILDING_BLOCKS: BuildingBlockConfig[] = [
  {
    title: "Heading",
    description: "Section title",
    variant: BlockType.Header,
    icon: HeadingIcon,
  },
  {
    title: "Question",
    description: "Multiple choice question",
    variant: BlockType.Question,
    icon: QuestionIcon,
  },
  {
    title: "Footer",
    description: "Bottom section content",
    variant: BlockType.Footer,
    icon: FooterIcon,
  },
];

export const QUESTION_DEFAULT_STATE = {
  type: "text",
  options: [],
};

export const HEADER_DEFAULT_STATE = {
  type: BlockType.Header,
  order: 1,
  title: "Quiz Header!",
};

export const FOOTER_DEFAULT_STATE = {
  type: BlockType.Footer,
  order: 999,
  title: "Quiz Footer!",
};
