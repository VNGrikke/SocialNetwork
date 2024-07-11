import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Footer from '../../components/footer/Footer';
import PostComponent from '../../components/post/Post';
import CreateNewPost from '../../components/newpost/NewPost';

import { getPosts } from '../../services/post.service';
import { getUsers } from '../../services/user.service';
import { Post, User } from '../../interfaces/interface';
import axios from 'axios';
interface User2 extends User {
  id: number
}

export default function Home() {
  const navigate = useNavigate();
  const dispatch1 = useDispatch();
  const dispatch2 = useDispatch();
  const [userLogin, setUserLogin] = useState<User | null>(null);
  const userId = localStorage.getItem('userId');

  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);

  const { items: posts, loading: postLoading, error: postError } = useSelector((state: any) => state.posts);
  const { items: users, loading: userLoading, error: userError } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch1(getPosts());
    dispatch2(getUsers());
  }, [dispatch1, dispatch2]);

  useEffect(() => {
    if (userId) {
      const numericUserId = parseInt(userId, 10);
      setUserLogin(users.find((user: User2) => user.id === numericUserId) || null);
    }
  }, [userId, users]);

  const logOut = async () => {
    try {
      if (userId) {
        await axios.put(`http://localhost:8888/users/${userId}`, {
          ...userLogin,
          status: 'NOT-ACTIVE'
        });
      }
      localStorage.removeItem('userId');
      setUserLogin(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (postLoading || userLoading) {
    return <p>Loading...</p>;
  }

  if (postError || userError) {
    return <p>Error: {postError || userError}</p>;
  }

  return (
    <div className='w-[100%] flex text-white font-mono relative'>
      {/* Fixed sidebar */}
      <div className='left w-2/12 h-[100vh] bg-black border-r border-r-gray-500 p-6 flex flex-col fixed top-0'>
        <div>
          <h1 className='text-2xl my-2.5 cursor-pointer'>Newstagram</h1>
        </div>
        <div className='mandates flex flex-col flex-grow'>
          <div>
            <ul>
              <li className='mandate transition-all delay-100-bg'>Trang chủ</li>
              <li className='mandate transition-all delay-100-bg'>Tìm kiếm</li>
              <li className='mandate transition-all delay-100-bg'>Khám phá</li>
              <li className='mandate transition-all delay-100-bg'>Tin nhắn</li>
              <li className='mandate transition-all delay-100-bg'>Thông báo</li>
              <li className='mandate transition-all delay-100-bg' onClick={() => setShowCreatePost(true)}>Tạo bài viết</li>
              <li className='mandate transition-all delay-100-bg'>Trang cá nhân</li>
            </ul>
          </div>
          <div className='mandate mt-auto mb-20px transition-all delay-100-bg'>
            Xem thêm
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className='fixed right-0 ml-2/12 w-10/12 h-[100vh] bg-black overflow-y-scroll'>
        <div className='main'>

          <div className='main-1'>
            {/* Danh sách stories */}
            <div>
              <ul className='stories top-3'>
                <li className='story'></li>
                <li className='story'></li>
                <li className='story'></li>
              </ul>
            </div>
            {
              showCreatePost && (
                <div className='background'>
                  <i onClick={() => setShowCreatePost(false)} className="fa-solid fa-xmark text-[24px] absolute  right-[28px] top-[10px] cursor-pointer "></i>
                  <CreateNewPost showCreatePost = {setShowCreatePost} />
                </div>

              )
            }
            {/* Danh sách bài viết */}
            <div className='flex justify-center mt-9'>
              <ul className='flex flex-col posts'>
                {posts.map((post: Post) => (
                  <PostComponent key={post.id} post={post} />
                ))}
                <div className='flex justify-center my-[64px]'>Bạn đã xem hết rồi</div>
              </ul>
            </div>
            <Footer />
          </div>

          {/* Sidebar phải */}
          <div className='main-2'>
            <div className='pl-[60px]'>
              <div>
                {/* Thông tin người dùng */}
                <div className='user flex justify-between'>
                  <div className='flex gap-[10px]'>
                    {userLogin && userLogin.avatarUrl ? (
                      <img src={userLogin.avatarUrl} alt='avatar' className='h-[48px] w-[48px] rounded-[50%]' />
                    ) : (
                      <div className='h-[48px] w-[48px] avatar leading-[48px]'>
                        <i className="fa-solid fa-user"></i>
                      </div>
                    )}
                    <div className='text-[13px]'>
                      <h2>{userLogin?.userName}</h2>
                      <p>{userLogin?.name}</p>
                    </div>
                  </div>
                  <div>
                    {/* Nút đăng xuất */}
                    <div className='leading-[48px] inline-block text-xs text-blue-600 hover:text-blue-100 cursor-pointer' onClick={logOut}>
                      Đăng xuất
                    </div>
                  </div>
                </div>

                {/* Gợi ý kết bạn */}
                <div className='flex justify-between my-4 '>
                  <div>Gợi ý cho bạn</div>
                  <div>Xem tất cả</div>
                </div>
                <div className='friends-suggested text-[13px]'>
                  <ul className='flex flex-col gap-5'>

                    <li className='flex justify-between'>
                      <div className='flex'>
                        <div className='h-[48px] w-[48px] avatar leading-[48px]'>
                          <i className="fa-solid fa-user"></i>
                        </div>
                        <div>
                          <h2>Nick name</h2>
                          <p>actual name</p>
                        </div>
                      </div>
                      <div className='leading-[48px] text-xs text-blue-600 hover:text-blue-100 cursor-pointer'>Theo dõi</div>
                    </li>
                    <li className='flex justify-between'>
                      <div className='flex'>
                        <div className='h-[48px] w-[48px] avatar leading-[48px]'>
                          <i className="fa-solid fa-user"></i>
                        </div>
                        <div>
                          <h2>Nick name</h2>
                          <p>actual name</p>
                        </div>
                      </div>
                      <div className='leading-[48px] text-xs text-blue-600 hover:text-blue-100 cursor-pointer'>Theo dõi</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}