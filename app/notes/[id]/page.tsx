import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById, queryKeys } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetailsPage({ params }: { params: { id: string } }) {
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: queryKeys.noteById(params.id),
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}