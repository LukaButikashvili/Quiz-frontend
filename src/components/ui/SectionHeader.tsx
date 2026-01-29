interface SectionHeaderProps {
  children: React.ReactNode;
}

export default function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
      {children}
    </h4>
  );
}
