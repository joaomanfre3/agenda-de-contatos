"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Contact } from "@/lib/contatos";

interface ContactFormProps {
  open: boolean;
  editing: Contact | null;
  onClose: () => void;
  onSave: (data: Omit<Contact, "id" | "createdAt" | "favorite">, id?: string) => void;
}

const empty = { name: "", phone: "", email: "", note: "" };

export function ContactForm({ open, editing, onClose, onSave }: ContactFormProps) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (!open) return;
    setForm(
      editing
        ? {
            name: editing.name,
            phone: editing.phone ?? "",
            email: editing.email ?? "",
            note: editing.note ?? "",
          }
        : empty,
    );
  }, [open, editing]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(
      {
        name: form.name.trim(),
        phone: form.phone.trim() || undefined,
        email: form.email.trim() || undefined,
        note: form.note.trim() || undefined,
      },
      editing?.id,
    );
  }

  const field =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg rounded-t-3xl bg-paper p-5 pb-8 shadow-2xl"
            style={{ backgroundColor: "var(--color-paper)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editing ? "Editar contato" : "Novo contato"}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 transition hover:bg-black/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                autoFocus
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nome"
                maxLength={60}
                className={field}
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Telefone (com DDD)"
                inputMode="tel"
                maxLength={20}
                className={field}
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="E-mail"
                inputMode="email"
                maxLength={80}
                className={field}
              />
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Anotação (opcional)"
                rows={2}
                maxLength={200}
                className={`${field} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={!form.name.trim()}
              className="mt-4 h-12 w-full rounded-xl text-base font-bold text-white transition hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {editing ? "Salvar" : "Adicionar contato"}
            </button>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
}
