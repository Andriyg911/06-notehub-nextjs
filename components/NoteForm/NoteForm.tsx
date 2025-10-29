"use client";

import { useState } from "react";
import { createNote } from "@/lib/api";

interface NoteFormProps {
  onCreated?: () => void;
}

export default function NoteForm({ onCreated }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createNote({ title, content, tag: "general" });
    setTitle("");
    setContent("");
    onCreated?.(); // викликаємо refetch після створення
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button type="submit">Add Note</button>
    </form>
  );
}