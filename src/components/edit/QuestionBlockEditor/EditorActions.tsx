"use client";

import { Box, Button } from "@mui/material";
import { Delete as DeleteIcon, Save as SaveIcon } from "@mui/icons-material";

interface EditorActionsProps {
  onDelete: () => void;
  onSave: () => void;
}

export default function EditorActions({
  onDelete,
  onSave,
}: EditorActionsProps) {
  return (
    <Box
      p={2}
      pt={4}
      borderTop={1}
      borderColor="grey.200"
      display="flex"
      gap={2}
    >
      <Button
        fullWidth
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={onDelete}
      >
        Delete
      </Button>
      <Button
        fullWidth
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={onSave}
      >
        Save
      </Button>
    </Box>
  );
}
