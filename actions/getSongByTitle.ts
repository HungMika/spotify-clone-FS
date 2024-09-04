import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongByTitle = async (title: string):Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })
    if (!title) {
        const allSongs = await getSongs();
        return allSongs;
    }
    const {data, error} = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', {ascending: false})

    console.log('Data:', data);
    console.log('Error:', error?.message);

    if (error) {
        console.log(error.message);
      }
    return (data as any) || [];
}

export default getSongByTitle;