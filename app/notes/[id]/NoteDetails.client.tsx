"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import { useParams } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(String(id)),
    enabled: Boolean(id),
  });

  if (isLoading) return <Loader />;
  if (error || !note)
    return (
      <ErrorMessage
        message={`Could not fetch note details. ${(error as Error)?.message || ""}`}
      />
    );

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}