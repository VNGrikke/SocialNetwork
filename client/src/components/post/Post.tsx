import React, { useEffect } from 'react';
import { Post as PostInterface, User } from '../../interfaces/interface';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../services/user.service';

interface User2 extends User {
    id: number;
}

interface PostProps {
    post: PostInterface;
}

export default function Post({ post }: PostProps) {
    const dispatch = useDispatch();
    const { items: users} = useSelector((state: any) => state.users);

    useEffect(() => {
        if (users.length === 0) {
            dispatch(getUsers());
        }
    }, [dispatch, users]);

    const amountLikes = post.amountOfInteraction.length;
    
    function name(id:number) {
        const user = users.find((user: User2) => user.id === id);
        return user?.userName || 'User not found';
    }
    

    return (
        <li className='post mb-[40px]'>
            <div className='flex justify-between'>
                <div className='flex gap-[10px]'>
                    <div className='h-[44px] w-[44px] avatar border-l-orange-500 leading-[44px]'>
                        <img src={post.postImage[0]} alt='user avatar' className='rounded-full' />
                    </div>
                    <div className='leading-[44px]'>{name(post.authorId)}</div>
                    <div className='leading-[44px]'>{new Date(post.createdAt).toLocaleString()}</div>
                </div>
                <div>...</div>
            </div>
            <div className='img-post'>
                <img src={post.postImage[0]} className='w-[100%]' />
            </div>
            <div className='footer-bar'>
                <div className='flex flex-row gap-[12px]'>
                    <div>
                        <i className="fa-regular fa-heart"></i>
                    </div>
                    <div><i className="fa-regular fa-comment fa-flip-horizontal"></i></div>
                    <div><i className="fa-regular fa-paper-plane"></i></div>
                </div>
                <div>
                    <i className="fa-regular fa-bookmark"></i>
                </div>
            </div>
            
            {
                amountLikes > 0 && (
                    <div className='flex justify-between'>
                        <div>{amountLikes} lượt thích</div>
                        <div>
                            <i className="fa-solid fa-thumbs-up"></i>
                        </div>
                    </div>
                )
            }
            <div className='caption'>
                <p>{post.title}</p>
            </div>
            <div>xem tất cả bình luận</div>
            <div>
                <input className='w-[100%] focus:outline-none focus:border-none bg-transparent' type="text" placeholder='Thêm bình luận...' />
            </div>
            <hr className='border-t border-gray-500 w-full my-3' />
        </li>
    );
}
