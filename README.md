# 👥 Agenda de Contatos

Sua agenda de contatos pessoal, organizada e prática. Guarde nome, telefone e e-mail, marque favoritos e ligue, mande WhatsApp ou e-mail num toque — tudo salvo no navegador, sem cadastro.

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)

## O que faz

- **Cadastrar contatos** com nome, telefone, e-mail e anotação
- **Avatar automático** com as iniciais e uma cor própria por contato
- **Favoritos** fixados no topo
- **Busca** por nome, telefone ou e-mail
- **Lista agrupada por letra**, em ordem alfabética
- **Ações rápidas**: ligar, abrir o WhatsApp ou mandar e-mail direto do contato
- **Salva sozinho** no navegador — sua agenda continua lá
- 100% **responsivo** e **offline**

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide. Sem banco — os contatos ficam no `localStorage`. Os atalhos usam links `tel:`, `wa.me` e `mailto:`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Deploy

Pronto pra Vercel — importe o repositório, build padrão (`next build`), zero variáveis de ambiente.

---

Feito por [@joaomanfre3](https://github.com/joaomanfre3).
