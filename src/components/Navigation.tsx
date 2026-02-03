"use client";

import { useQuizStore } from "@/store";
import {
  useCreateQuiz,
  useUpdateQuiz,
  usePublishQuiz,
  useUnpublishQuiz,
} from "@/hooks";
import { Button, Chip, Box, TextField } from "@mui/material";
import {
  Save as SaveIcon,
  CloudUpload as UploadIcon,
  CloudOff as CloudOffIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Navigation() {
  const { id } = useParams();
  const { quizId, quizTitle, blocks, isPublished, setQuizTitle } =
    useQuizStore();

  const createQuiz = useCreateQuiz();
  const updateQuiz = useUpdateQuiz();
  const publishQuiz = usePublishQuiz();
  const unpublishQuiz = useUnpublishQuiz();

  const isSaving = createQuiz.isPending || updateQuiz.isPending;
  const isPublishing = publishQuiz.isPending || unpublishQuiz.isPending;

  const handleSave = () => {
    if (!quizTitle.trim()) {
      toast.error("Quiz title is required.");
      return;
    }

    const data = { title: quizTitle, blocks };

    if (id) {
      updateQuiz.mutate({ id: id as string, data });
    } else {
      createQuiz.mutate(data);
    }
  };

  const handlePublish = () => {
    if (!quizId) return;
    publishQuiz.mutate(quizId);
  };

  const handleUnpublish = () => {
    if (!quizId) return;
    unpublishQuiz.mutate(quizId);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Link
              href={"/"}
              className="size-9 bg-indigo-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">Q</span>
            </Link>
            <TextField
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              size="medium"
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
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>

          <Button
            variant="contained"
            color={isPublished ? "warning" : "primary"}
            startIcon={isPublished ? <CloudOffIcon /> : <UploadIcon />}
            onClick={isPublished ? handleUnpublish : handlePublish}
            disabled={isPublishing || !quizId}
          >
            {isPublishing
              ? isPublished
                ? "Unpublishing..."
                : "Publishing..."
              : isPublished
                ? "Unpublish"
                : "Publish"}
          </Button>
        </Box>
      </div>
    </nav>
  );
}
