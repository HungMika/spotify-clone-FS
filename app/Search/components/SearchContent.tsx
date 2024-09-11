"use client";

import React from "react";

import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
interface SearchContentProps {
  songs: Song[];
}

const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
        <div className="flex-1 min-w-0">
          <MediaItem
            data={song}
            onClick={(id: string) => {
              onPlay(id);
            }}
          />
        </div>
        <div className="shrink-0">
          <LikeButton songId={song.id} />
        </div>
      </div>
      
      ))}
    </div>
  );
};

export default SearchContent;
