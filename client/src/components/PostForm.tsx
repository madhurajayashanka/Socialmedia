import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputLabel, MenuItem, FormControl, Select, Box } from '@mui/material';
import { updatePostThunk, createPostThunk } from '../redux/postsSlice';
import { nanoid } from 'nanoid';
import { Post } from '../types/post';

interface PostFormProps {
    open: boolean;
    onClose: () => void;
    post?: Post;
}

const PostForm: React.FC<PostFormProps> = ({ open, onClose, post }) => {
    const [title, setTitle] = useState(post?.title || '');
    const [content, setContent] = useState(post?.content || '');
    const [titleColor, setTitleColor] = useState(post?.titleColor || '');
    const [error, setError] = useState('');
    const dispatch:any = useDispatch();

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
            setTitleColor(post.titleColor);
        } else {
            setTitle('');
            setContent('');
            setTitleColor('');
        }
        setError('');
    }, [post]);

    const handleSubmit = () => {
        if (title.trim() === '' || content.trim() === '') {
            setError('Title and content cannot be empty');
            return;
        }

        const newPost = { id: post?.id || nanoid(), title, content, titleColor, comments: post?.comments || [] };
        if (post) {
            dispatch(updatePostThunk(newPost));
        } else {
            dispatch(createPostThunk(newPost));
        }
        setTitle('');
        setContent('');
        setTitleColor('');
        setError('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{post ? 'Edit Post' : 'Create Post'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={Boolean(error)}
                    helperText={error}
                />
                <TextField
                    margin="dense"
                    label="Content"
                    type="text"
                    fullWidth
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    error={Boolean(error)}
                    helperText={error}
                />
                <Box sx={{ minWidth: 120, mt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="title-color-label">Title Color</InputLabel>
                        <Select
                            labelId="title-color-label"
                            value={titleColor}
                            label="Title Color"
                            onChange={(e) => setTitleColor(e.target.value)}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="red">Red</MenuItem>
                            <MenuItem value="green">Green</MenuItem>
                            <MenuItem value="blue">Blue</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>{post ? 'Update' : 'Create'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PostForm;
