import axiosInstance from '../services/api';
import { PostTypeResponse } from '../../components/Post';
import { NewPostType, NewPostTypeResponse } from '../../components/UserPost';

export const getPostsFeed = async (): Promise<PostTypeResponse> =>
    axiosInstance.get('/posts');
export const createNewPost = async (
    data: NewPostType
): Promise<NewPostTypeResponse> => axiosInstance.post('/post', data);
