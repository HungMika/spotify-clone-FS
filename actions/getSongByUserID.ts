import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongByUserID = async ():Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })
    const {data: sessionData, error: sessionError} = await supabase.auth.getSession()
    if (sessionError) {
        console.log(sessionError)
        return [];
    }
    const {data, error} = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', {ascending: false})

    if (error) {
        console.log(error.message)
    }
    return (data as any) || [];
}

export default getSongByUserID;

// This function, getSongByUserID, retrieves songs from a database for a specific user.
// It first creates a Supabase client using server-side cookies for authentication.
// Then, it attempts to get the current session data to identify the user.
// If there is an error in retrieving the session, it logs the error and returns an empty array.
// If the session is successfully retrieved, it queries the 'songs' table in the database,
// selecting all songs that match the user ID from the session data.
// The results are ordered by the 'created_at' field in descending order (newest first).
// If there is an error in the query, it logs the error.
// Finally, it returns the retrieved data or an empty array if no data is found.
