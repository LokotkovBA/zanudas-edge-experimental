import { type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { Menu } from "~/components/server/Menu";

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <body className="bg-slate-900 text-slate-50">
            <header
                id="top"
                className="border-b border-b-slate-500 bg-slate-950 px-2 py-4 xl:px-40"
            >
                {/* @ts-expect-error Async Server Component */}
                <Menu />
            </header>
            <main className="flex h-full flex-col items-center gap-2 bg-slate-900 py-2 sm:px-20">
                {children}
            </main>
            <Toaster
                toastOptions={{
                    className:
                        "bg-slate-950 text-slate-50 border border-slate-500",
                }}
            />
        </body>
    );
}
