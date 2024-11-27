import axiosInstance, { uri } from '../services/api';
import { PostTypeResponse } from '../../components/Post';
import { NewPostType, NewPostTypeResponse } from '../../components/UserPost';
import { NewComment, NewCommentResponse } from '../../components/Comment';

const local = localStorage.getItem('socialMedia:dev:auth');
const token = local ? JSON.parse(local) : null;

export const getPostsFeed = async (): Promise<PostTypeResponse> =>
    axiosInstance.get(`${uri}/publish`);

export const createNewPost = async (
    data: NewPostType
): Promise<NewPostTypeResponse> => axiosInstance.post(`${uri}/publish`, data);

export const createNewComment = async (
    data: NewComment
): Promise<NewCommentResponse> => axiosInstance.post(`${uri}/comment`, data);
