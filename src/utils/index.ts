import Axios, { AxiosResponse } from 'axios';

const usersUrl = 'https://jsonplaceholder.typicode.com/users?&_limit=4';
const photosUrl = 'https://jsonplaceholder.typicode.com/photos?albumId=';
const albumsUrl = 'https://jsonplaceholder.typicode.com/albums?&userId=';

export const getUsers = (): Promise<AxiosResponse<[]>> => Axios.get(usersUrl);

export const getAlbums = (userId: string): Promise<AxiosResponse<[]>> => Axios.get(`${albumsUrl}${userId}`);

export const getPhotos = (albumId: number): Promise<AxiosResponse<[]>> => Axios.get(`${photosUrl}${albumId}`);
