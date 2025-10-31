// components/SearchBox/SearchBox.tsx
"use client";

import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchBox({
  value,
  onChange,
  placeholder = "Search notes...",
}: SearchBoxProps) {
  return (
    <input
      type="text"
      className={styles.search}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label="Search notes"
    />
  );
}