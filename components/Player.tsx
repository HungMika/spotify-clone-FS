"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";

import PlayerContent from "./PlayerContent";

import React from "react";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !player.activeId || !songUrl) {
    return null;
  }

  return (
    <div
      className="
      fixed bottom-0 
      bg-black w-full 
      h-[80px] px-4"
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
