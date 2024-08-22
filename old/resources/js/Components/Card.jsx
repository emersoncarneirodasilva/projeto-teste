import { Link } from "@inertiajs/react";

export default function Card({ href, text }) {
    return (
        <Link href={route(href)}>
            <div className="flex items-center justify-center px-3 py-6 bg-blue-500 border border-blue-600 rounded-lg w-60 h-52 group">
                <p className="text-xl transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    {text}
                </p>
            </div>
        </Link>
    );
}
