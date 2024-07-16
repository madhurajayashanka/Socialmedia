import axios from 'axios';
import { Post } from '../types/post';
import { Comment } from '../types/comment';

const api = axios.create({
    baseURL:'http://localhost:5000/api',
});

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await api.get('/posts');
    return response.data;
};

export const createPost = async (post: Omit<Post, 'id' | 'comments'>): Promise<Post> => {
    const response = await api.post('/posts', post);
    return response.data;
};

export const updatePost = async (id: string, post: Omit<Post, 'id' | 'comments'>): Promise<Post> => {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
};

export const addComment = async (postId: string, comment: Omit<Comment, 'id' | 'postId'>): Promise<Comment> => {
    const response = await api.post(`/posts/${postId}/comments`, comment);
    return response.data;
};
