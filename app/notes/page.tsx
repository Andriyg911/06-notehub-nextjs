import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes, queryKeys } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = searchParams?.q ?? "";
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: queryKeys.notes,
    queryFn: () => fetchNotes(q ? { search: q } : {}),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient initialSearch={q} />
    </HydrationBoundary>
  );
}