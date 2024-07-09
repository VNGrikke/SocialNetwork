export interface Post {
    postImage: string[];
    PostId: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    amountOfInteraction: number[];
    comments: Comment[];
}

export interface Comment {
    CommentId: number;
    content: string;
    createdAt: Date;
    authorId: number;
    postId: number;
    replies: Comment[];
    likes: number;
}


export interface User {
    userName: string;
    avatarUrl: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    rePassword: string;
    role: string;
    status: "ACTIVE" | "NOT-ACTIVE" | "BANNED";
    posts: Post[];
}