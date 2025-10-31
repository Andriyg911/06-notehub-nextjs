"use client";

import { useState } from "react";
import type { CreateNotePayload } from "@lib/api/api";
import type { NoteTag } from "@/types/note";
import styles from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (payload: CreateNotePayload) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Personal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({ title, content, tag });

    setTitle("");
    setContent("");
    setTag("Personal");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.textarea}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <select
        className={styles.select}
        value={tag}
        onChange={(e) => setTag(e.target.value as NoteTag)}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <button type="submit" className={styles.submitBtn}>
        Add Note
      </button>
    </form>
  );
}