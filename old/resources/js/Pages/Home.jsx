import Card from "@/Components/Card";
import { Head } from "@inertiajs/react";

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <main className="grid min-h-screen bg-zinc-400 place-content-center">
                <section className="flex text-white gap-x-7">
                    <Card href="form" text="Fomulário" />
                    <Card href="todo" text="Lista" />
                </section>
            </main>
        </>
    );
}
