interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl shadow-lg p-10">
      <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
    </div>
  );
}

export default Header;
