import { Comment } from './comment';

export interface Post {
    id: string;
    title: string;
    content: string;
    titleColor: string;
    comments: Comment[];
}
