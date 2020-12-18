import { Dispatch, SetStateAction } from 'react';
import { PhotosType } from '@pages/types';

export type ModalProps = {
  photos: PhotosType[];
  currentId: number;
  closeHandler: Dispatch<SetStateAction<boolean>>;
}
