//interfaces.ts
export interface Post {
    postImage: string[];
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    amountOfInteraction: number[];
    comments: Comment[];
    status: "PUBLIC" | "PRIVATE";
}

export interface Comment {
    id: number;
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
    friends: User[];
}