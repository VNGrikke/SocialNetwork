import React, { useState } from 'react';

export default function NewPost() {
    const [caption, setCaption] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    
    const [post, setPost] = useState<any>(null);


    return (
        <div className="flex flex-col items-center justify-center w-2/3 h-3/4 rounded-[12px] bg-gray-900 text-white relative">
            <h1 className="text-3xl font-bold mb-4 absolute top-4 border-b-gray-500">New Post</h1>

            <div className="flex flex-col items-center justify-center h-full w-full">
                <textarea
                    className=" border-none rounded-lg w-full bg-transparent resize-none focus:outline-none"
                    placeholder="What's on your mind?"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}>
                </textarea>
                <i className="fa-regular fa-images text-[94px]"></i>
                <input type="file" id="file-upload" className="hidden" />
                <label htmlFor="file-upload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                    Select from computer
                </label>
            </div>
        </div>
    );
}

