"use client";

import React from "react";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  onClick?: (id: string) => void;
  data: Song;
}

const MediaItem: React.FC<MediaItemProps> = ({ onClick, data }) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    //TODO: Default turn on player
  };
  return (
    <div
      className="
      flex items-center 
      gap-x-3 cursor-pointer 
      hover:bg-neutral-800/50 
      w-full p-2 rounded-md"
      onClick={handleClick}
    >
      <div
        className="
        relative rounded-md 
        min-h-[48px] min-w-[48px] 
        overflow-hidden"
      >
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">By {data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;

// This component is responsible for displaying a media item (song) in a list.
// It accepts two props: onClick (a function to handle click events) and data (the song data).

// The useLoadImage hook is used to get the image URL for the song.
// If the onClick function is provided, it will be called with the song's id when the item is clicked.
// If onClick is not provided, a default action (TODO: turn on player) will be executed.

// The component returns a div that represents the media item.
// The div contains an image and the song's title and author.
// The image is displayed using the next/image component for optimized loading.
// The title and author are displayed in a flex container with truncation for overflow text.
