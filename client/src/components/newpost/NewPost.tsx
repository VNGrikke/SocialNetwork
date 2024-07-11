import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import axios from 'axios';
import { Timestamp } from '../../interfaces/interface';

export default function NewPost() {
    const [image, setImage] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    const userID = parseInt(localStorage.getItem('userId') || '0');
    const [status, setStatus] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string>('');

    const pad = (num: number): string => num.toString().padStart(2, '0');
    const date = new Date();

    const timestamp: Timestamp = {
        day: pad(date.getDate()),
        month: pad(date.getMonth() + 1),
        year: date.getFullYear(),
        hours: pad(date.getHours()),
        minutes: pad(date.getMinutes())
    };

    const uploadPost = async () => {
        if (!image) {
            setErrorMessage("Hãy chọn ảnh.");
            return;
        }

        try {
            const imageRef = ref(storage, `images/${image.name}`);
            const snapshot = await uploadBytes(imageRef, image);
            const url = await getDownloadURL(snapshot.ref);
            setImageUrls(url);

            const post = {
                postImage: [imageUrls],
                title: title,
                createdAt: timestamp,
                updatedAt: timestamp,
                authorId: userID,
                amountOfInteraction: [],
                comments: [],
                status: status
            };
            await axios.post('http://localhost:8888/posts', post);
            setErrorMessage(null);
        } catch (error) {
            console.error("Error uploading post:", error);
            setErrorMessage("Xảy ra lỗi khi tải bài viết.");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueImage: any = event.target.files?.[0];
        setImage(valueImage || null);
    };

    const handleChangeTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    return (
        <div className="fixed left-[15%] top-[12%] items-center w-2/3 h-3/4 rounded-[12px] bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold text-center w-full mt-[18px] border-b border-gray-500 pb-4">New Post</h1>
            <div className="flex h-full w-full">
                <div className='w-2/3 h-2/3 gap-[20px] flex flex-col justify-center items-center'>
                    {image ? (
                        <img src={URL.createObjectURL(image)} alt="Chosen image" className='h-[200px]' />
                    ) : (
                        <i className="fa-solid fa-image text-[94px] h-[200px]"></i>
                    )}
                    <input type="file" id="file-upload" className="hidden" onChange={handleChange} />
                    <label htmlFor="file-upload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                        Chọn ảnh từ máy tính
                    </label>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>

                <div className='w-1/3'>
                    <textarea
                        className="w-full h-[100px] my-[50px] border-none rounded-lg bg-transparent resize-none focus:outline-none"
                        placeholder="What's on your mind?"
                        value={title}
                        onChange={handleChangeTitle}>
                    </textarea>
                    <select
                        className="border-none bg-transparent w-full py-2 px-3 leading-tight focus:outline-none"
                        value={status}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as "PUBLIC" | "PRIVATE")}>
                        <option className='bg-gray-900 hover:bg-gray-700' value="PUBLIC">Công khai</option>
                        <option className='bg-gray-900 hover:bg-gray-700' value="PRIVATE">Riêng tư</option>
                    </select>
                    <button className="bg-blue-500 text-white mt-4 px-4 py-2 rounded cursor-pointer" onClick={uploadPost}>
                        Đăng bài
                    </button>
                </div>
            </div>
        </div>
    );
}