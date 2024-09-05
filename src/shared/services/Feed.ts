import axiosInstance from '../services/api';
import { PostTypeResponse } from '../../components/Post';
import { NewPostTypeResponse } from '../../components/UserPost';

export const getPostsFeed = async (): Promise<PostTypeResponse> =>
    axiosInstance.get('/');
export const createNewPost = async (): Promise<NewPostTypeResponse> =>
    axiosInstance.post('/');
