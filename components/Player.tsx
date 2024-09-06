"use client";

import usePlayer from "@/hooks/usePlayer";
import React from "react";

const Player = () => {
  const player = usePlayer();
  return <div>Player!</div>;
};

export default Player;
