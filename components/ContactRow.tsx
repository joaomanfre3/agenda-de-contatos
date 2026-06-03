"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Contact } from "@/lib/contatos";
import { Avatar } from "./Avatar";

interface ContactRowProps {
  contact: Contact;
  onOpen: () => void;
  onToggleFavorite: () => void;
}

export function ContactRow({ contact, onOpen, onToggleFavorite }: ContactRowProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12 }}
      className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-black/5"
    >
      <button onClick={onOpen} className="flex min-w-0 flex-1 items-center gap-3 text-left">
        <Avatar name={contact.name} />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold">{contact.name}</span>
          <span className="block truncate text-sm text-ink/50">
            {contact.phone || contact.email || "sem telefone"}
          </span>
        </span>
      </button>

      {/* Favorito */}
      <button
        onClick={onToggleFavorite}
        aria-label={contact.favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className="shrink-0 p-1 text-ink/25 transition hover:text-amber-400"
      >
        <Star size={20} className={contact.favorite ? "fill-amber-400 text-amber-400" : ""} />
      </button>
    </motion.li>
  );
}
