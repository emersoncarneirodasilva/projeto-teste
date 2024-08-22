import { FaListCheck, FaWpforms } from "react-icons/fa6";
import Card from "@/components/Card";

export default function Home() {
  return (
    <main className="flex justify-center items-center gap-x-10 min-h-screen">
      <Card href="/form" icon={<FaWpforms />} title="Cadastro" />
      <Card href="/todo" icon={<FaListCheck />} title="Minha Lista" />
    </main>
  );
}
