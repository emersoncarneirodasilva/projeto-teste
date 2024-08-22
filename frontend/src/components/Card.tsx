import Link from "next/link";
import { ReactElement } from "react";

interface CardProps {
  href: string;
  icon: ReactElement;
  title: string;
}

const cardStyles =
  "flex flex-col justify-center items-center w-64 h-56 gap-y-7 group text-slate-100 bg-white/10 backdrop-blur-lg rounded-lg border border-gray-100/30 shadow-lg transition-all duration-300";

const iconStyles =
  "text-7xl group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-500";

const titleStyles =
  "text-2xl group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-500";

export default function Card({ href, icon, title }: CardProps) {
  return (
    <Link href={href}>
      <div
        className={`${cardStyles} ${
          title === "Cadastro"
            ? "hover:bg-green-500/10"
            : "hover:bg-cyan-500/10"
        }`}
      >
        <div className={iconStyles}>{icon}</div>
        <p className={titleStyles}>{title}</p>
      </div>
    </Link>
  );
}
