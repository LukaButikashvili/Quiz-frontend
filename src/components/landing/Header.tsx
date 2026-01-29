import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

function Header() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Link
            href={"/"}
            className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
          >
            <span className="text-white font-bold text-lg">Q</span>
          </Link>
        </div>
        <Link href={"/quizzes/edit"}>
          <Button variant="contained" startIcon={<Add />}>
            Create Quiz
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
