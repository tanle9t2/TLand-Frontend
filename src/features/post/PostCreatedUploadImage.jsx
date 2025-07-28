import { useRef, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import Button from "../../ui/Button";
import { MAX_IMAGE_UPLOAD } from "../../utils/constant";

function PostCreatedUploadImage() {
    const fileInputRef = useRef();
    const [images, setImages] = useState([]);
    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            src: URL.createObjectURL(file),
            file,
        }));
        if (images.length + newImages.length <= MAX_IMAGE_UPLOAD) {
            setImages([...images, ...newImages]);

        } else {
            alert('Maximum 9 images allowed!');
        }

    };
    function handleOnRemoveImage(index) {
        setImages(images => images.filter((item, idx) => index !== idx))
    }



    if (images.length === 0)
        return <label
            className="border-2 text-2xl bg-gray-100 cursor-pointer flex py-20 flex-col border-dashed border-rose-600"
        >
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
            />
            <span className="mx-auto text-9xl"> <IoCameraOutline /></span>
            <p className="mx-auto">Đăng tin từ 3 đến 12 hình</p>
        </label>


    return (
        <div className="flex flex-col items-start">
            <input
                ref={fileInputRef}
                type="file"
                accept=""
                multiple
                onChange={handleImageUpload}
                className="hidden"
            />
            <div className="flex gap-2 flex-wrap mt-2 whitespace-nowrap pb-2 scrollbar-thin scrollbar-thumb-[#ee4d2d] scrollbar-track-[#f5f5f5]">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="relative flex-none w-[100px] h-[119px] border-2 border-dashed border-gray-300 rounded p-1.5 text-center mb-2"
                    >
                        {index === 0 && (
                            <div className="absolute top-0 left-0 z-10 bg-gray-300 text-md px-2 py-0.5">
                                Ảnh bìa
                            </div>
                        )}
                        <img
                            src={img.src}
                            alt={`Product ${index}`}
                            className="w-[100px] h-[100px] object-cover"
                        />
                        <button
                            onClick={() => handleOnRemoveImage(index)}
                            className="absolute top-[-10px] right-[-6px] bg-white cursor-pointer text-rose-600 rounded-full px-[7px] py-[4px] shadow hover:bg-red-100"
                            title="Delete video"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            <Button
                variant="primary"
                onClick={handleButtonClick}
                disabled={images.length >= MAX_IMAGE_UPLOAD}
            >
                Thêm hình ảnh ({images.length}/{MAX_IMAGE_UPLOAD})
            </Button>
        </div >
    )
}

export default PostCreatedUploadImage
