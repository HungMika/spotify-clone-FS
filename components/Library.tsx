"use content";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const subscribeModal = useSubscribeModal();
  const { user, subscription } = useUser();
  const authmodal = useAuthModal();
  const uploadmodal = useUploadModal();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authmodal.onOpen();
    }
    //TODO: check for subscription
    if (!subscription) {
      return subscribeModal.onOpen();
    }
    return uploadmodal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div
        className="
        flex
        justify-between
        items-center
        px-5 pt-4
        "
      >
        <div
          className="
          inline-flex
          items-center
          gap-x-2
          "
        >
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 text-md font-medium">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="
          text-neutral-400
          cursor-pointer
          hover:text-white
          transition
          "
        />
      </div>
      <div
        className="
        flex flex-col
        gap-y-2
        mt-4 px-3
        "
      >
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => {
              onPlay(id);
            }}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
