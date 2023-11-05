import { Modal } from 'native-base';
import React from 'react';
import { theme } from '../../../theme';

interface Props {
     children: React.ReactNode;
     isOpen: boolean;
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
     header?: string;
}

export default function MainModal({
     children,
     isOpen,
     setIsOpen,
     header,
}: Props) {
     const [size, setSize] = React.useState('md');

     return (
          <>
               <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    size="xl"
               >
                    <Modal.Content height="100%">
                         {header && <Modal.Header>{header}</Modal.Header>}
                         <Modal.CloseButton />

                         {children}
                    </Modal.Content>
               </Modal>
          </>
     );
}
