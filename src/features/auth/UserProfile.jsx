import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button"
import useUpdateProfile from "./useUpdateProfile";
import ErrorMessage from "../../ui/ErrorMessage";
import toast from "react-hot-toast";
import useUploadMedia from "./useUploadMedia";
import { CiCamera } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";
const MEDIA_TYPE = {
    AVT: "AVT", BANNER: "BANNER"
}
function UserProfile({ user }) {
    const { avtUrl, bannerUrl, ...rest } = user
    const { register,
        handleSubmit,
        formState: { errors }, } = useForm({
            defaultValues: { ...rest }
        })
    const [avatar, setAvatar] = useState(avtUrl);
    const [banner, setBanner] = useState(bannerUrl);
    const avtRef = useRef(null)
    const bannerRef = useRef(null)
    const { isPending, updateProfile } = useUpdateProfile()
    const { isPending: uploadingAvt, uploadMedia } = useUploadMedia()
    function onSubmit(data) {
        console.log(data)
        updateProfile({ ...data }, {
            onSuccess: () => toast.success("Cập nhập thông tin thành công")
        })
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadMedia({ file, type: MEDIA_TYPE.AVT }, {
                onSuccess: (response) => {
                    toast.success("Cập nhật ảnh đại diện mới thành công")
                    setAvatar(response.data.avtUrl)
                },
                onError: (error) => toast.error(error.message)
            })
        }
    };
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadMedia({ file, type: MEDIA_TYPE.BANNER }, {
                onSuccess: (response) => {
                    toast.success("Cập nhật ảnh bìa mới thành công")
                    setBanner(response.data.bannerUrl)
                },
                onError: (error) => toast.error(error.message)
            })
        }
    };
    console.log(banner)
    return (
        <div className="mx-auto">
            <h2 className="text-3xl font-bold mb-6">Hồ sơ cá nhân</h2>
            <div className="grid grid-cols-8 gap-8">
                <div className="bg-white shadow-md pb-20 col-span-3 h-fit text-2xl rounded-lg p-6 ">
                    <div className="relative">
                        <img className="h-[125px] w-full border-tr object-cover md:rounded-t-lg"
                            src={banner || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmdMaWzjGnnRXb6cvKjMasSO5AiRNHBh1Ybg&s"} />

                        <img
                            src={avatar || "/public/default-avt.png"}
                            alt="Avatar"
                            className="w-[92px] h-[92px] left-8 bottom-0 translate-y-1/2 absolute rounded-full mb-3"
                        />
                        <div disabled={uploadingAvt} onClick={() => bannerRef.current.click()} className="top-0 right-0 absolute px-3 rounded-[50%] py-3 bg-gray-200 cursor-pointer hover:bg-gray-300">
                            <span >
                                <FaCamera />
                            </span>
                            <input
                                ref={bannerRef}
                                type="file"
                                accept="image/*"
                                onChange={handleBannerChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                    <div disabled={uploadingAvt} onClick={() => avtRef.current.click()} className="left-[17%] absolute px-3 rounded-[50%] py-3 bg-gray-200 cursor-pointer hover:bg-gray-300">
                        <span >
                            <FaCamera />
                        </span>
                        <input
                            ref={avtRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </div>

                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="col-span-5 p-6 rounded-lg shadow-lg bg-white space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-2xl font-medium">Họ</label>
                            <input
                                type="text"
                                name="name"
                                {...register("lastName", { required: "Vui lòng nhập Họ" })}
                                className="w-full text-2xl border rounded-lg px-3 py-4"
                            />
                            {errors.lastName && (
                                <ErrorMessage message={errors.lastName.message} />
                            )}
                        </div>
                        <div>
                            <label className="block text-2xl font-medium">Tên</label>
                            <input
                                type="text"
                                name="phone"
                                {...register("firstName", { required: "Vui lòng nhập Họ" })}
                                className="w-full text-2xl border rounded-lg px-3 py-4"
                            />
                            {errors.firstName && (
                                <ErrorMessage message={errors.firstName.message} />
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-2xl font-medium">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="0914xxxxxx"
                            {...register("phoneNumber")}
                            className="w-full text-2xl border rounded-lg px-3 py-4"
                        />
                    </div>
                    <div>
                        <label className="block text-2xl font-medium">Giới thiệu</label>
                        <textarea
                            type="text"
                            name="description"
                            placeholder="Viết vài dòng giới thiệu về bạn"
                            {...register("description")}
                            className="w-full h-52 text-2xl border rounded-lg px-3 py-4"
                        />
                    </div>


                    <h3 className="text-3xl font-semibold mt-6">Thông tin bảo mật</h3>
                    <div>
                        <label className="block text-2xl font-medium">Email</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                name="email"
                                {...register("email")}
                                disabled
                                className="flex-1 text-2xl border rounded-lg px-3 py-4 bg-gray-100"
                            />
                        </div>
                    </div>

                    {/* Other fields */}
                    <input
                        type="text"
                        name="idNumber"
                        {...register("cid")}
                        placeholder="CCCD / CMND / Hộ chiếu"
                        className="w-full text-2xl border rounded-lg px-3 py-4"
                    />

                    <input
                        type="text"
                        name="taxCode"
                        {...register("taxCode")}
                        placeholder="Mã số thuế"
                        className="w-full text-2xl border rounded-lg px-3 py-4"
                    />

                    {/* Gender & DOB */}
                    <div className="grid grid-cols-2 gap-4 text-2xl">
                        <select
                            name="gender"
                            {...register("sex")}
                            className="border  rounded-lg px-3 py-4"
                        >
                            <option value="">Giới tính</option>
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </select>

                        <input
                            type="date"
                            name="dob"
                            {...register("dob")}
                            className="border rounded-lg px-3 py-4 text-2xl"
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        disabled={isPending}
                        variant="primary"
                        type="submit"
                        className="w-full bg-gray-800 text-white rounded-lg py-4 text-2xl font-semibold hover:bg-gray-700"
                    >
                        LƯU THAY ĐỔI
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
