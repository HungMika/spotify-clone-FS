import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content
          className="
        fixed
        drop-shadow-md border 
        border-neutral-700 
        top-[50%] left-[50%] 
        max-h-full h-full 
        md:h-auto 
        md:max-h-[85vh]
        w-[95vw]
        md:w-[90vw]
        md:max-w-[450px]
        translate-x-[-50%]
        translate-y-[-50%]
        rounded-md
        bg-neutral-800
        p-[25px]
        focus:outline-none
        "
        >
          <Dialog.Title
            className="
            text-xl text-center
            font-bold mb-4
          "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
            mb-5 text-sm
            leading-normal
            text-center
          "
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="
            text-neutral-400 hover:text-white
            absolute top-[10px] right-[10px]
            inline-flex h-[25px] w-[25px]
            appearance-none items-center
            justify-center rounded-full
            focus:outline-none
            "
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

// This component renders a modal dialog using the Radix UI library
// The modal includes a title, description, and children elements
// The modal can be closed by clicking a close button in the top-right corner
// The `title` prop is used to set the modal's title
// The `description` prop is used to set the modal's description
// The `children` prop is used to render any additional content inside the modal
// The `Dialog.Close` component is used to render the close button
// The `IoMdClose` icon is used for the close button
// The modal's styles are defined using Tailwind CSS classes
// The modal is centered on the screen and has a maximum width of 450px on medium screens
// The modal has a dark background and rounded corners
// The modal's content is padded and the focus outline is removed
// The close button changes color when hovered
