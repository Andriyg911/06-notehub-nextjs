"use client";

import * as React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function ModalContent({ children, onClose }: ModalProps) {
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onMouseDown={onBackdrop}
    >
      <div className={css.modal}>{children}</div>
    </div>
  );
}

export default function Modal({ children, onClose }: ModalProps) {
  const [portalElement] = useState<HTMLElement | null>(
    typeof document !== "undefined" ? document.body : null
  );

  if (!portalElement) return null;

  return createPortal(
    <ModalContent onClose={onClose}>{children}</ModalContent>,
    portalElement
  );
}