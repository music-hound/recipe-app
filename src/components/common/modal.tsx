"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const CustomModal = ({
  isOpen,
  onClose,
  title,
  size = "xs",
  children,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader className="border-b">
          <h3 className="text-xl text-background font-semibold">{title}</h3>
        </ModalHeader>
        <ModalBody className="space-y-4 py-6">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
