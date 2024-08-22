import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen">
            <nav className="flex items-center justify-between px-5 py-2 text-white bg-blue-500">
                <Link href={route("home")}>
                    <p>Logo</p>
                </Link>

                <div className="flex items-center gap-x-3">
                    <Link
                        href={route("form")}
                        className="hover:text-slate-700 hover:transition-colors"
                    >
                        <p>Fomulário</p>
                    </Link>
                    <Link
                        href={route("todo")}
                        className="hover:text-slate-700 hover:transition-colors"
                    >
                        <p>Lista</p>
                    </Link>
                </div>
            </nav>

            <main className="grid min-h-[calc(100vh_-_5rem)] bg-zinc-50 place-content-center">
                {children}
            </main>

            <footer className="grid py-2 text-white bg-blue-500 place-content-center">
                Rodapé
            </footer>
        </div>
    );
}
