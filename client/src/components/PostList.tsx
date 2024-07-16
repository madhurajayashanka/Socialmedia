import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchPostsThunk, deletePostThunk, addCommentThunk } from '../redux/postsSlice';
import PostItem from './PostItem';
import { Box, CircularProgress, Typography, Container, Grid, Paper } from '@mui/material';

const PostsList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error } = useSelector((state: RootState) => state.posts);

    useEffect(() => {
        dispatch(fetchPostsThunk());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        dispatch(deletePostThunk(id));
    };

    const handleAddComment = (postId: string, commentContent: string) => {
        dispatch(addCommentThunk({ postId, comment: { content: commentContent } }));
    };

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    );

    if (error) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography color="error">Error: {error}</Typography>
        </Box>
    );

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Posts</Typography>
            <Grid container spacing={3}>
                {posts.length === 0 ? (
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{ padding: '16px' }}>
                            <Typography>No posts available</Typography>
                        </Paper>
                    </Grid>
                ) : (
                    posts.map((post) => (
                        <Grid item xs={12} md={6} lg={4} key={post.id}>
                            <Paper elevation={3} style={{ padding: '16px' }}>
                                <PostItem
                                    post={post}
                                    onDelete={handleDelete}
                                    onAddComment={handleAddComment}
                                />
                            </Paper>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default PostsList;
