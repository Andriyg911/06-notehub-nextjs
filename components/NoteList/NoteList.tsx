"use client";

import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";

interface NoteListProps {
  notes: Note[];
  onDeleted?: () => void;
}

export default function NoteList({ notes, onDeleted }: NoteListProps) {
  async function handleDelete(id: string) {
    await deleteNote(id);
    onDeleted?.(); // викликаємо refetch після видалення
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}