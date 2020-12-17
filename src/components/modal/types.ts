import { Dispatch, SetStateAction } from 'react';

export type ModalProps = {
  closeHandler: Dispatch<SetStateAction<boolean>>;
}
