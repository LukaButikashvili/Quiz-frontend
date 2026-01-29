import { Card, Chip, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";
import { RoutePaths } from "@/config/routes";
import { cn } from "@/utils/cn";

interface QuizCardProps {
  title: string;
  isPublished: boolean;
  updatedAt: string;
  createdAt: string;
  id: string;
}

function QuizCard({
  title,
  isPublished,
  updatedAt,
  createdAt,
  id,
}: QuizCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "588px",
        borderRadius: "6px",
        boxShadow: "0px 0px 2px #171a1f14, 0px 1px 2.5px #171a1f12",
      }}
    >
      <div className="pt-5 pb-4 px-5">
        <div className="flex justify-between mb-8">
          <h2 className="text-[#171A1FFF] font-bold text-[18px] leading-7">
            {title}
          </h2>
          <Chip
            label={isPublished ? "Published" : "Draft"}
            color={isPublished ? "success" : "default"}
            className={cn("font-medium")}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <HelpOutlineIcon sx={{ fontSize: 16 }} />
            <p className="text-[#565D6DFF] text-[14px] leading-5">
              {" "}
              Created: {createdAt}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <p className="text-[#565D6DFF] text-[14px] leading-5">
              Last edited: {updatedAt}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center w-full bg-[#F3F4F633] border-t border-[#DEE1E6FF] px-5 py-2">
        <div className="flex gap-2">
          <Link href={`${RoutePaths.edit}/${id}`}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>

          {isPublished && (
            <Link href={`${RoutePaths.view}/${id}`}>
              <IconButton aria-label="preview">
                <VisibilityOutlinedIcon />
              </IconButton>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}

export default QuizCard;
