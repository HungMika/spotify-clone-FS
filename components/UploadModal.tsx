import uniqid from "uniqid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import slugify from "slugify"; // Add this import at the top of your file

import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
  const { user } = useUser();
  const router = useRouter();
  const uploadmodal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadmodal.onClose();
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      if (!values.title) {
        toast.error("Title is missing");
        setIsLoading(false);
        return;
      }

      const uniqueID = uniqid();

      // Sanitize the title
      const sanitizedTitle = slugify(values.title, {
        lower: true,
        strict: true,
      });

      //--- UPLOAD SONGS ---
      const songPath = `song-${sanitizedTitle}-${uniqueID}`;
      console.log(songPath); // Debugging line
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(songPath, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        console.error("Song upload error:", songError); // Log the error
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      //--- UPLOAD IMAGE ---
      const imagePath = `image-${sanitizedTitle}-${uniqueID}`;
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(imagePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        console.error("Image upload error:", imageError); // Log the error
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      //--- INSERT INTO DATABASE ---
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        console.error("Database insert error:", supabaseError); // Log the error
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      uploadmodal.onClose();
    } catch (error) {
      console.error("Unexpected error:", error); // Log unexpected errors
      toast.error("Oops! Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadmodal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;

// This component renders a modal for uploading a song
// The modal includes a form with several input fields:
// - A text input for the song title
// - A text input for the song author
// - A file input for selecting an mp3 file
// - A file input for selecting an image
// The form uses the `handleSubmit` function to handle form submission
// The `isLoading` state is used to disable inputs and the submit button while the form is being submitted
// The `uploadmodal.isOpen` state determines whether the modal is open or closed

// The component imports several dependencies:
// - `Modal` component to display the modal
// - `Input` component for rendering input fields
// - `Button` component for rendering the submit button
// - `useForm` hook for managing form state and validation
// - `uploadmodal` state to control the modal's visibility
// - `handleSubmit` function to handle form submission
// - `onSubmit` function to process the form data
// - `onChange` function to handle changes in the modal's state

