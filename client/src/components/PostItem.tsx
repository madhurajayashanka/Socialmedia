import React, { useState } from 'react';
import { Post } from '../types/post';
import { Button, Typography, Box, TextField } from '@mui/material';
import { Comment } from "../types/comment";
import DeletePostDialog from './DeletePostDialog';

interface PostItemProps {
    post: Post;
    onDelete: (id: string) => void;
    onAddComment: (postId: string, commentContent: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete, onAddComment }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim() === '') {
            setError('Comment cannot be empty');
            return;
        }
        onAddComment(post.id, comment);
        setComment('');
        setError('');
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    return (
        <Box>
            <Typography variant="h5" style={{ color: post.titleColor }} gutterBottom>{post.title}</Typography>
            <Typography variant="body1" gutterBottom>{post.content}</Typography>
            <Box mt={2} mb={2}>
                <Button variant="contained" color="error" onClick={handleDeleteClick} style={{ marginRight: '8px' }}>Delete</Button>
                <Button variant="contained" color="primary" onClick={() => setShowComments(!showComments)}>
                    {showComments ? 'Hide Comments' : `Show Comments (${post.comments.length})`}
                </Button>
            </Box>
            {showComments && (
                <Box mt={2}>
                    {post.comments.length === 0 ? (
                        <Typography>No comments</Typography>
                    ) : (
                        <Box mb={2}>
                            {post.comments.map((comment: Comment) => (
                                <Box key={comment.id} mb={1} p={1} style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <Typography variant="body2">{comment.content}</Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                    <form onSubmit={handleCommentSubmit}>
                        <TextField
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment"
                            fullWidth
                            error={Boolean(error)}
                            helperText={error}
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '8px' }}>Submit</Button>
                    </form>
                </Box>
            )}
            <DeletePostDialog
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                postId={post.id}
                onDelete={onDelete}
            />
        </Box>
    );
};

export default PostItem;
