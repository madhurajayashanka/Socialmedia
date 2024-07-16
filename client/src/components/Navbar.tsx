import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import PostForm from './PostForm';

const Navbar: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Social Media App
                    </Typography>
                    <Button color="inherit" onClick={handleClickOpen}>
                        Add Post
                    </Button>
                </Toolbar>
            </AppBar>
            <PostForm open={open} onClose={handleClose} />
        </>
    );
};

export default Navbar;
