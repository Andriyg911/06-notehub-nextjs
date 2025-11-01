import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string | undefined;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface DeleteNoteResponse {
  deleted: Note;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = "" } = params;
  const res = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },
  });
  return res.data;
}

export async function createNote(
  payload: CreateNotePayload
): Promise<Note> {
  const res = await api.post<Note>("/notes", payload);
  return res.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const res = await api.delete<DeleteNoteResponse>(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}