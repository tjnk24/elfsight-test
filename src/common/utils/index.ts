import Axios, { AxiosResponse } from 'axios';

const usersUrl = 'https://jsonplaceholder.typicode.com/users?&_limit=4';
const albumsUrl = 'https://jsonplaceholder.typicode.com/albums?&userId=';
const photosUrl = 'https://jsonplaceholder.typicode.com/photos?albumId=';

export const getUsers = (): Promise<AxiosResponse<[]>> => Axios.get(usersUrl);

export const getAlbums = (userId: string): Promise<AxiosResponse<[]>> => Axios.get(`${albumsUrl}${userId}`);

export const getPhotos = (albumId: string): Promise<AxiosResponse<[]>> => Axios.get(`${photosUrl}${albumId}`);
