import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/post';
import { Comment } from '../types/comment';
import { fetchPosts, createPost, updatePost, deletePost, addComment } from '../api/api';
import {nanoid} from "nanoid";

interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
};

export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async () => {
    console.log('fetchPostsThunk')
    const response = await fetchPosts();
    return response;
});

export const createPostThunk = createAsyncThunk('posts/createPost', async (post: Omit<Post, 'id' | 'comments'>) => {
    const response = await createPost(post);
    return response;
});

export const updatePostThunk = createAsyncThunk('posts/updatePost', async (post: Post) => {
    const response = await updatePost(post.id, post);
    return response;
});

export const deletePostThunk = createAsyncThunk('posts/deletePost', async (id: string) => {
    await deletePost(id);
    return id;
});


export const addCommentThunk = createAsyncThunk(
    'posts/addComment',
    async ({ postId, comment }: { postId: string; comment: Omit<Comment, 'id' | 'postId'> }) => {
        const newComment = { ...comment, id: nanoid(), postId };
        const response = await addComment(postId, newComment);
        return response;
    }
);




const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPostsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts';
            })
            .addCase(createPostThunk.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePostThunk.fulfilled, (state, action) => {
                const index = state.posts.findIndex((post) => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePostThunk.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post.id !== action.payload);
            })
            .addCase(addCommentThunk.fulfilled, (state, action) => {
                const post = state.posts.find((p) => p.id === action.payload.postId);
                if (post) {
                    post.comments.push(action.payload);
                }
            });
    },
});

export default postsSlice.reducer;
