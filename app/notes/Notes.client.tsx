"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes, queryKeys } from "@/lib/api";
import { useState } from "react";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient({ initialSearch }: { initialSearch: string }) {
  const [search, setSearch] = useState(initialSearch);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.notes,
    queryFn: () => fetchNotes(search ? { search } : {}),
  });

  return (
    <main>
      <section>
        <div>
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="keyword"
          />
          <button onClick={() => refetch()}>Apply</button>
        </div>

        <NoteForm onCreated={refetch} />

        {isLoading && <p>Loading, please wait...</p>}
        {error && <p>Could not fetch the list of notes. {(error as Error).message}</p>}
        {!isLoading && !error && <NoteList notes={data?.notes ?? []} onDeleted={refetch} />}
      </section>
    </main>
  );
}