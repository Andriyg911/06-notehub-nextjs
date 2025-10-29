// --- Теги для нотаток ---
// Додав "general" як дефолтний тег
export type NoteTag = "general" | "work" | "study" | "personal";

// --- Основна модель нотатки ---
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

// --- Payload для створення ---
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

// --- Payload для оновлення ---
export interface UpdateNotePayload {
  title?: string;
  content?: string;
  tag?: NoteTag;
}

// --- Відповідь API для списку ---
export interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

// --- Відповідь API для видалення ---
export interface DeleteNoteResponse {
  deleted: Note;
}