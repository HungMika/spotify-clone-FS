"use content";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

const Library = () => {
  const { user } = useUser();
  const authmodal = useAuthModal();
  const uploadmodal = useUploadModal();

  const onClick = () => {
    if (!user) {
      return authmodal.onOpen();
    }
    //TODO: check for subscription
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
        List of Songs
      </div>
    </div>
  );
};

export default Library;
