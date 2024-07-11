import React, { useEffect, useState } from 'react';
import { Post as PostInterface, User } from '../../interfaces/interface';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../services/user.service';
import axios from 'axios';

interface User2 extends User {
    id: number;
}

interface PostProps {
    post: PostInterface;
}

const Post: React.FC<PostProps> = ({ post }) => {
    const dispatch = useDispatch();
    const { items: users } = useSelector((state: any) => state.users);
    const [user, setUser] = useState<User2 | null>(null);
    const [showOption, setOption] = useState<boolean>(false);
    const [showPostStatus, setShowPostStatus] = useState<boolean>(false);
    const [statusChanged, setStatusChanged] = useState<boolean>(false);

    useEffect(() => {
        if (users.length === 0) {
            dispatch(getUsers());
        }
    }, [dispatch, users]);

    useEffect(() => {
        const foundUser = users.find((user: User2) => user.id === post.authorId);
        if (foundUser) {
            setUser(foundUser);
        }
    }, [users, post.authorId]);

    useEffect(() => {
        if (statusChanged) {
            dispatch(getUsers());
            setStatusChanged(false);
        }
    }, [statusChanged, dispatch]);

    const amountLikes = post.amountOfInteraction.length;

    const option = () => {
        setOption(!showOption);
        setShowPostStatus(false);
    };

    const changeStatus = () => {
        setShowPostStatus(!showPostStatus);
        setOption(false);
    };


    const handleStatusChange = async (newStatus: 'PUBLIC' | 'PRIVATE', id: number, authorId: number) => {
        const userID = localStorage.getItem("userId");

        if (userID !== null && authorId === parseInt(userID)) {
            try {
                const response = await axios.get(`http://localhost:8888/posts?id=${id}`);

                if (response.data.length > 0) {
                    const post = response.data[0];
                    post.status = newStatus;

                    await axios.put(`http://localhost:8888/posts/${post.id}`, post);
                    setStatusChanged(true);
                } else {
                    console.error("Bài viết không tồn tại");
                }
            } catch (error) {
                console.error("Lỗi khi cập nhật trạng thái bài viết:", error);
            }
        } else {
            console.error("Bạn không có quyền chỉnh sửa bài viết này");
        }
        setShowPostStatus(false);
    };

    return (
        <li className='post mb-[40px]'>
            <div className='flex justify-between'>
                <div className='flex gap-[10px] text-[16px]'>
                    <div className='h-[44px] w-[44px] avatar border-l-orange-500 leading-[44px]'>
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt='avatar' className='h-[44px] w-[44px] rounded-[50%]' />
                        ) : (
                            <div className='h-[44px] w-[44px] avatar leading-[44px]'>
                                <i className="fa-solid fa-user"></i>
                            </div>
                        )}
                    </div>
                    <div className='leading-[44px]'>{user?.userName}</div>
                    <div className='leading-[44px]'>{`${post.createdAt}`}</div>
                    {post.status === 'PUBLIC' ? (
                        <span className="material-symbols-outlined text-[13px] leading-[44px]">public</span>
                    ) : (
                        <span className="material-symbols-outlined text-[13px] leading-[44px]">lock</span>
                    )}
                </div>
                <div className='cursor-pointer' onClick={option}>...</div>

                {showOption && (
                    <div className='background'>
                        <ul className='dropdown-menu'>
                            <li onClick={changeStatus}>Trạng thái</li>
                            <li>Chia sẻ</li>
                            <li>Xóa bài đăng</li>
                        </ul>
                    </div>
                )}

                {showPostStatus && (
                    <div className='background'>
                        <ul className='dropdown-menu'>
                            <li onClick={() => handleStatusChange('PUBLIC', post.id, post.authorId)}>Công khai</li>
                            <li onClick={() => handleStatusChange('PRIVATE', post.id, post.authorId)}>Riêng tư</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className='img-post'>
                <img src={post.postImage[0]} className='w-[100%]' alt='post' />
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

            {amountLikes > 0 && (
                <div className='flex justify-between'>
                    <div>{amountLikes} lượt thích</div>
                </div>
            )}
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
};

export default Post;
