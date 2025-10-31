// components/NoteList/NoteList.tsx
"use client";

import Link from "next/link";
import type { Note } from "@/types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[] | undefined | null;
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (!notes || notes.length === 0) {
    return <p className={styles.empty}>No notes found.</p>;
  }

  return (
    <div className={styles.list}>
      {notes.map((note) => (
        <div key={note.id} className={styles.card}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div className={styles.meta}>
            <span className={styles.tag}>{note.tag}</span>
            <small>
              {new Date(note.createdAt).toLocaleDateString()}{" "}
              {new Date(note.createdAt).toLocaleTimeString()}
            </small>
          </div>

          <div className={styles.actions}>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}