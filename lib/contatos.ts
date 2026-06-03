// Tipos e utilidades da agenda de contatos — lógica pura, sem React.

export interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  note?: string;
  favorite: boolean;
  createdAt: number;
}

/** Paleta dos avatares — escolhida de forma estável pelo nome. */
const AVATAR_COLORS = [
  "#e11d48", "#db2777", "#9333ea", "#7c3aed", "#2563eb",
  "#0891b2", "#059669", "#65a30d", "#d97706", "#ea580c",
];

/** Iniciais do contato (até duas letras). */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}

/** Cor estável do avatar a partir do nome (mesmo nome, mesma cor). */
export function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

/** Só os dígitos do telefone (pra montar links de ligação e WhatsApp). */
export function onlyDigits(phone?: string): string {
  return (phone ?? "").replace(/\D/g, "");
}

export function telLink(phone?: string): string {
  return `tel:${onlyDigits(phone)}`;
}

export function whatsappLink(phone?: string): string {
  return `https://wa.me/${onlyDigits(phone)}`;
}

export function mailLink(email?: string): string {
  return `mailto:${email ?? ""}`;
}

function normalize(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Filtra contatos por nome, telefone ou e-mail. */
export function searchContacts(contacts: Contact[], term: string): Contact[] {
  const q = normalize(term.trim());
  if (!q) return contacts;
  return contacts.filter((c) =>
    normalize(`${c.name} ${c.phone ?? ""} ${c.email ?? ""}`).includes(q),
  );
}

export interface LetterGroup {
  letter: string;
  items: Contact[];
}

export interface GroupedContacts {
  favorites: Contact[];
  letters: LetterGroup[];
}

/**
 * Organiza os contatos: favoritos numa seção própria e o restante
 * agrupado pela letra inicial, tudo em ordem alfabética.
 */
export function groupContacts(contacts: Contact[]): GroupedContacts {
  const byName = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }),
  );

  const favorites = byName.filter((c) => c.favorite);

  const map = new Map<string, Contact[]>();
  for (const c of byName) {
    const first = normalize(c.name.trim()[0] ?? "#").toUpperCase();
    const letter = /[A-Z]/.test(first) ? first : "#";
    const bucket = map.get(letter) ?? [];
    if (bucket.length === 0) map.set(letter, bucket);
    bucket.push(c);
  }

  const letters = [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, items]) => ({ letter, items }));

  return { favorites, letters };
}
