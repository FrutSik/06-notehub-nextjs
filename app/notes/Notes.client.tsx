"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import { fetchNotes } from "@/lib/api/note";
import css from "./NotesPage.module.css";
import Modal from "@/components/Modal/Modal";

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { data } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        search: debouncedSearch || undefined,
      }),
    placeholderData: (previousData) => previousData,
  });

  const handleCreateNote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBar value={searchTerm} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <button className={css.button} onClick={handleCreateNote}>
          Create note +
        </button>
      </header>

      <NoteList notes={notes} />

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
