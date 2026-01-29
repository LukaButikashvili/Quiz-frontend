/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import { useQuizStore } from "@/store";
import { Button, Chip, Box, TextField } from "@mui/material";
import {
  Save as SaveIcon,
  CloudUpload as UploadIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback } from "react";

export default function Navigation() {
  const { id } = useParams();
  const router = useRouter();
  const {
    quizTitle,
    isPublished,
    isSaving,
    isPublishing,
    setQuizTitle,
    createQuiz,
    updateQuiz,
    publishQuiz,
  } = useQuizStore();

  const handleClick = useCallback(() => {
    return id ? updateQuiz(id as string) : createQuiz();
  }, [createQuiz, id, updateQuiz]);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Link
              href={"/"}
              className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">Q</span>
            </Link>
            <TextField
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              size="small"
              variant="outlined"
              placeholder="Quiz title"
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "1.25rem",
                  padding: "4px 8px",
                  width: "200px",
                },
              }}
            />
          </div>

          {isPublished && (
            <Chip
              icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
              label="Published"
              size="small"
              color="success"
              variant="outlined"
              sx={{
                bgcolor: "success.50",
                borderColor: "success.200",
                "& .MuiChip-label": {
                  fontWeight: 500,
                },
              }}
            />
          )}
        </div>

        <Box display="flex" alignItems="center" gap={1.5}>
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={() => handleClick()}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>

          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={async () => {
              const success = await publishQuiz();
              if (success) {
                router.push("/");
              }
            }}
            disabled={isPublishing || isPublished}
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </Box>
      </div>
    </nav>
  );
}
