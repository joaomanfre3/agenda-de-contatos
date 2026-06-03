"use client";

import { avatarColor, initials } from "@/lib/contatos";

interface AvatarProps {
  name: string;
  size?: number;
}

/** Avatar circular com as iniciais e uma cor estável pelo nome. */
export function Avatar({ name, size = 44 }: AvatarProps) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: avatarColor(name),
        fontSize: size * 0.36,
      }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
