"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, Star, UserPlus, Users } from "lucide-react";
import {
  type Contact,
  groupContacts,
  searchContacts,
} from "@/lib/contatos";
import { ContactRow } from "@/components/ContactRow";
import { ContactForm } from "@/components/ContactForm";
import { ContactDetail } from "@/components/ContactDetail";

const STORAGE_KEY = "agenda-de-contatos:v1";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);

  // Carrega os contatos salvos.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setContacts(JSON.parse(raw));
    } catch {
      /* localStorage indisponível */
    }
    setHydrated(true);
  }, []);

  // Persiste a cada mudança.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch {
      /* cota cheia / modo privado */
    }
  }, [contacts, hydrated]);

  const filtered = useMemo(() => searchContacts(contacts, query), [contacts, query]);
  const grouped = useMemo(() => groupContacts(filtered), [filtered]);
  const detailContact = contacts.find((c) => c.id === detailId) ?? null;

  function openNew() {
    setEditing(null);
    setFormOpen(true);
  }

  function saveContact(
    data: Omit<Contact, "id" | "createdAt" | "favorite">,
    id?: string,
  ) {
    setContacts((prev) =>
      id
        ? prev.map((c) => (c.id === id ? { ...c, ...data } : c))
        : [
            ...prev,
            { ...data, id: crypto.randomUUID(), favorite: false, createdAt: Date.now() },
          ],
    );
    setFormOpen(false);
  }

  function toggleFavorite(id: string) {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)),
    );
  }

  function deleteContact(id: string) {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setDetailId(null);
  }

  function editFromDetail() {
    setEditing(detailContact);
    setDetailId(null);
    setFormOpen(true);
  }

  if (!hydrated) return null;

  const hasResults = grouped.favorites.length > 0 || grouped.letters.length > 0;

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-4 px-4 py-8 pb-28">
      <header className="flex items-center gap-2 px-1">
        <Users size={26} style={{ color: "var(--color-accent)" }} />
        <h1 className="text-2xl font-extrabold tracking-tight">Contatos</h1>
        <span className="ml-auto text-sm font-medium text-ink/40">{contacts.length}</span>
      </header>

      {/* Busca */}
      {contacts.length > 0 && (
        <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4">
          <Search size={18} className="text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar contato..."
            className="w-full bg-transparent py-3 text-base outline-none placeholder:text-ink/40"
          />
        </div>
      )}

      {/* Lista */}
      {!hasResults ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center text-ink/40">
          <Users size={30} strokeWidth={1.5} />
          <p className="text-sm">
            {contacts.length === 0
              ? "Nenhum contato ainda. Adicione o primeiro!"
              : "Nenhum contato encontrado."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Favoritos */}
          {grouped.favorites.length > 0 && (
            <section>
              <h2 className="mb-2 flex items-center gap-1.5 px-1 text-xs font-bold uppercase tracking-wider text-amber-500">
                <Star size={13} className="fill-amber-400 text-amber-400" /> Favoritos
              </h2>
              <ul className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {grouped.favorites.map((c) => (
                    <ContactRow
                      key={c.id}
                      contact={c}
                      onOpen={() => setDetailId(c.id)}
                      onToggleFavorite={() => toggleFavorite(c.id)}
                    />
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          )}

          {/* Por letra */}
          {grouped.letters.map((group) => (
            <section key={group.letter}>
              <h2 className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-ink/40">
                {group.letter}
              </h2>
              <ul className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {group.items.map((c) => (
                    <ContactRow
                      key={c.id}
                      contact={c}
                      onOpen={() => setDetailId(c.id)}
                      onToggleFavorite={() => toggleFavorite(c.id)}
                    />
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          ))}
        </div>
      )}

      {/* Botão flutuante */}
      <button
        onClick={openNew}
        aria-label="Novo contato"
        className="fixed bottom-6 left-1/2 z-30 flex h-14 -translate-x-1/2 items-center gap-2 rounded-full px-6 font-bold text-white shadow-xl shadow-rose-600/25 transition active:scale-95"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        <UserPlus size={20} /> Novo contato
      </button>

      <ContactForm
        open={formOpen}
        editing={editing}
        onClose={() => setFormOpen(false)}
        onSave={saveContact}
      />

      <ContactDetail
        contact={detailContact}
        onClose={() => setDetailId(null)}
        onEdit={editFromDetail}
        onDelete={() => detailContact && deleteContact(detailContact.id)}
      />
    </main>
  );
}
