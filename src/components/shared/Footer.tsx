import type { QuizItem } from "@/types";

interface FooterProps {
  footerItem: QuizItem;
}

function Footer({ footerItem }: FooterProps) {
  return (
    <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
      <p className="text-center text-gray-600">{footerItem.title}</p>
    </div>
  );
}

export default Footer;
