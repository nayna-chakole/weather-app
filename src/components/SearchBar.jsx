import { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (text.trim()) onSearch(text.trim());
  };

  return (
    <Paper
      component="form"
      onSubmit={submit}
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 0.5,
        mb: 2,
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.35)",
      }}
    >
      <InputBase
        sx={{
          flex: 1,
          color: "white",
          fontSize: "1rem",
          "& input::placeholder": { color: "rgba(255,255,255,0.8)", opacity: 1 },
        }}
        placeholder="Search city..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        inputProps={{ "aria-label": "Search city" }}
      />
      <IconButton type="submit" aria-label="Search" sx={{ color: "white" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}