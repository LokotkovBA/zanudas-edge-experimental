import { Suspense } from "react";
import { HydrateClient } from "~/client/HydrateClient";
import { FileUploader } from "~/components/client/songlist/FileUploader";
import { SearchableSongList } from "~/components/client/songlist/SearchableSongList";
import { Spinner } from "~/components/utils/Spinner";
import { serverAPI } from "~/server/api";
import { isAdmin } from "~/utils/privileges";

export const runtime = "edge";

export const metadata = {
    title: "Zanuda's song list",
};

export default async function SongList() {
    const userData = await serverAPI.getAuth.fetch();

    return (
        <>
            {isAdmin(userData?.privileges) && <FileUploader />}
            <Suspense fallback={<Spinner />}>
                <List privileges={userData?.privileges} />
            </Suspense>
        </>
    );
}

async function List({ privileges = 0 }: { privileges?: number }) {
    await serverAPI.songlist.getAll.fetch();
    const dehydratatedState = await serverAPI.dehydrate();

    return (
        <HydrateClient state={dehydratatedState}>
            <SearchableSongList privileges={privileges} type="kalny" />
        </HydrateClient>
    );
}
