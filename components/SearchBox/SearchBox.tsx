"use client";

import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchBox({
  value,
  onSearch,
  placeholder = "Search notes...",
}: SearchBoxProps) {
  return (
    <input
      type="text"
      className={styles.search}
      value={value}
      onChange={(e) => onSearch(e.target.value)}
      placeholder={placeholder}
      aria-label="Search notes"
    />
  );
}