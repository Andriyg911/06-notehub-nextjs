"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById, queryKeys } from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data: note, isLoading, error } = useQuery({
    queryKey: id ? queryKeys.noteById(id) : ["notes", "unknown"],
    queryFn: () => {
      if (!id) throw new Error("Missing note id");
      return fetchNoteById(id);
    },
    enabled: Boolean(id),
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Could not fetch note details. {(error as Error)?.message}</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}