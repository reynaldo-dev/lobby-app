import { View, Text } from "react-native";
import React from "react";
import { Button, Center, Modal, ScrollView, VStack } from "native-base";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainModal({ children, isOpen, setIsOpen }: Props) {
  const [size, setSize] = React.useState("md");

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
        <Modal.Content height="100%">
          <Modal.CloseButton />
          {children}
        </Modal.Content>
      </Modal>
    </>
  );
}
