// app/notes/page.tsx
import NotesClient from "./Notes.client";
import type { Note } from "@/types/note";

// Тут можна зробити реальний серверний фетч
async function fetchNotes(): Promise<Note[]> {
  // Наприклад, виклик API або бази даних
  return [];
}

export default async function NotesPage() {
  const notes = await fetchNotes();

  return (
    <div>
      <h1>Notes</h1>
      <NotesClient initialNotes={notes} />
    </div>
  );
}