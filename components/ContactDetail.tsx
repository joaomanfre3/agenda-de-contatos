"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Pencil, Phone, Trash2, X } from "lucide-react";
import {
  type Contact,
  mailLink,
  telLink,
  whatsappLink,
} from "@/lib/contatos";
import { Avatar } from "./Avatar";

interface ContactDetailProps {
  contact: Contact | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContactDetail({ contact, onClose, onEdit, onDelete }: ContactDetailProps) {
  return (
    <AnimatePresence>
      {contact && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg rounded-t-3xl bg-paper p-5 pb-8 shadow-2xl"
            style={{ backgroundColor: "var(--color-paper)" }}
          >
            <div className="mb-2 flex justify-end">
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 transition hover:bg-black/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cabeçalho */}
            <div className="flex flex-col items-center text-center">
              <Avatar name={contact.name} size={72} />
              <h3 className="mt-3 text-xl font-bold">{contact.name}</h3>
              {contact.phone && <p className="text-ink/60">{contact.phone}</p>}
              {contact.email && <p className="text-sm text-ink/50">{contact.email}</p>}
            </div>

            {/* Ações rápidas */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Action
                href={contact.phone ? telLink(contact.phone) : undefined}
                icon={<Phone size={20} />}
                label="Ligar"
                color="#2563eb"
              />
              <Action
                href={contact.phone ? whatsappLink(contact.phone) : undefined}
                icon={<MessageCircle size={20} />}
                label="WhatsApp"
                color="#16a34a"
                external
              />
              <Action
                href={contact.email ? mailLink(contact.email) : undefined}
                icon={<Mail size={20} />}
                label="E-mail"
                color="#ea580c"
              />
            </div>

            {/* Anotação */}
            {contact.note && (
              <p className="mt-4 rounded-xl bg-black/[0.03] px-4 py-3 text-sm text-ink/70">
                {contact.note}
              </p>
            )}

            {/* Editar / Excluir */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={onEdit}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-black/5 font-semibold transition hover:bg-black/10"
              >
                <Pencil size={16} /> Editar
              </button>
              <button
                onClick={onDelete}
                aria-label="Excluir contato"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Action({
  href,
  icon,
  label,
  color,
  external,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  external?: boolean;
}) {
  // Sem o dado correspondente (telefone/e-mail), a ação fica desativada.
  if (!href) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-2xl bg-black/[0.03] py-3 text-ink/30">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex flex-col items-center gap-1 rounded-2xl py-3 text-white transition active:scale-95"
      style={{ backgroundColor: color }}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
}
