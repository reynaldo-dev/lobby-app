import { Actionsheet, Text } from "native-base";
import React from "react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function ConfirmAssistanceBottomSheet({
  isOpen,
  onOpen,
  onClose,
}: Props) {
  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Text>
            Inicio del proceso de inscripcion a evento y post de consumibles
          </Text>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
