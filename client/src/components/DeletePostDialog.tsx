import React from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { deletePostThunk } from '../redux/postsSlice';

interface DeletePostDialogProps {
    open: boolean;
    onClose: () => void;
    postId: string;
    onDelete: (id: string) => void;
}

const DeletePostDialog: React.FC<DeletePostDialogProps> = ({ open, onClose, postId, onDelete }) => {
    const dispatch:any = useDispatch();

    const handleDeletePost = () => {
        dispatch(deletePostThunk(postId));
        onDelete(postId);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this post? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="error" onClick={handleDeletePost} >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletePostDialog;
