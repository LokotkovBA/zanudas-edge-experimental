"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import superjson from "superjson";
import type { AppRouter } from "~/server/routers/root";

export const clientAPI = createTRPCReact<AppRouter>({
    unstable_overrides: {
        useMutation: {
            async onSuccess(opts) {
                await opts.originalFn();
                await opts.queryClient.invalidateQueries();
            },
        },
    },
});

function getBaseUrl() {
    if (typeof window !== "undefined") {
        // browser should use relative path
        return "";
    }
    if (process.env.VERCEL_URL) {
        // reference for vercel.com
        return `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.RENDER_INTERNAL_HOSTNAME) {
        // reference for render.com
        const port = process.env.PORT;
        if (!port)
            throw new Error(
                "PORT is not set but RENDER_INTERNAL_HOSTNAME is set",
            );
        return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${port}`;
    }
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function ClientProvider(props: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        cacheTime: Infinity,
                        staleTime: Infinity,
                    },
                },
            }),
    );
    const [trpcClient] = useState(() =>
        clientAPI.createClient({
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === "development" ||
                        (opts.direction === "down" &&
                            opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                }),
            ],
            transformer: superjson,
        }),
    );
    return (
        <clientAPI.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </clientAPI.Provider>
    );
}
