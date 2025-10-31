"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // ✅ правильний імпорт
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import type { Note, CreateNotePayload } from "@/types/note";

export default function NotesClient({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (payload: CreateNotePayload) => {
    const newNote: Note = {
      id: uuidv4(), // ✅ тепер генерує унікальний id без помилок
      title: payload.title,
      content: payload.content,
      tag: payload.tag,
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />

      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        Create note +
      </button>

      <NoteList notes={filtered} onDelete={handleDelete} />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSubmit={handleCreate} />
        </Modal>
      )}
    </div>
  );
}