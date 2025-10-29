import axios, { AxiosInstance, AxiosResponse } from "axios";
import type { Note, NoteTag } from "@/types/note";

// --- Axios інстанс ---
const api: AxiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string | undefined;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Типи ---
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

export interface UpdateNotePayload {
  title?: string;
  content?: string;
  tag?: NoteTag;
}

// --- API функції ---
export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = "" } = params;
  const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: { page, perPage, search },
  });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return res.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post("/notes", payload);
  return res.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const res: AxiosResponse<DeleteNoteResponse> = await api.delete(`/notes/${id}`);
  return res.data;
}

export async function updateNote(
  id: string,
  payload: UpdateNotePayload
): Promise<Note> {
  const res: AxiosResponse<Note> = await api.patch(`/notes/${id}`, payload);
  return res.data;
}

// --- Ключі для React Query ---
export const queryKeys = {
  notes: ["notes"] as const,
  noteById: (id: string) => ["notes", id] as const,
};