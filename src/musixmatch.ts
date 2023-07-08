import { MusixmatchSearch } from "./types/index.ts";

export namespace Musixmatch {

    export async function search(terms: string) {
        const searchResponse = await (await fetch(`https://www.musixmatch.com/search/${encodeURIComponent(terms)}`)).text();
        return [...searchResponse.matchAll(/attributes":(.*),"id":/g)].map(x => JSON.parse(x[1])) as MusixmatchSearch[];
    }

    export async function getLyricsFromUrl(url: string) {
        const trackResponse = await (await fetch(url)).text();
        return trackResponse.match(/"body":"(.*)","language":/)![1].split("\\n");
    }

    export async function searchLyrics(terms: string) {
        const searchResponse = await (await fetch(`https://www.musixmatch.com/search/${encodeURIComponent(terms)}`)).text();
        const topResultUrl = JSON.parse(`"${searchResponse.match(/track_share_url":"(.*)","track_edit/)![1]}"`);
        const trackResponse = await (await fetch(topResultUrl)).text();
        return trackResponse.match(/"body":"(.*)","language":/)![1].split("\\n");
    }

}