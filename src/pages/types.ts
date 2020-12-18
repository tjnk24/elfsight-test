import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';

export type PhotosType = {
  id: number;
  albumId: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

interface IPageMatchParams {
  userId: string;
  albumId: string;
}

interface IPageLocationState {
  photos?: PhotosType[];
}

export type AlbumPageProps = RouteComponentProps<
    IPageMatchParams,
    StaticContext,
    IPageLocationState
  >;

export type ModalHandlerType = (
  id: number,
  array: PhotosType[],
) => void;

export type PhotosPageProps = AlbumPageProps & {
  modalHandler: ModalHandlerType;
};
