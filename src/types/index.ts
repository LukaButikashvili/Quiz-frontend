import type { FC, SVGProps } from "react";

export enum BlockType {
  Header = "header",
  Question = "question",
  Footer = "footer",
}

export enum QuestionType {
  Single = "single",
  Multi = "multi",
  Text = "text",
}

export interface BuildingBlockConfig {
  title: string;
  description: string;
  variant: BlockType;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export interface QuizOption {
  id: string;
  label: string;
  isCorrectAnswer: boolean;
}

export interface QuizItem {
  id: string;
  type: BlockType;
  order: number;
  title: string;
  questionType?: QuestionType;
  options?: QuizOption[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks?: QuizItem[];
}
