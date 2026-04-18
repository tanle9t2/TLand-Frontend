import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import useUpdateProfile from "./useUpdateProfile";
import ErrorMessage from "../../ui/ErrorMessage";
import toast from "react-hot-toast";
import useUploadMedia from "./useUploadMedia";
import { HiOutlineCamera } from "react-icons/hi";

const MEDIA_TYPE = {
    AVT: "AVT", BANNER: "BANNER"
};
const inputClasses = "w-full text-[1.4rem] bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 transition-all duration-200 placeholder:text-gray-400";
const labelClasses = "block text-[1.3rem] font-medium text-gray-700 mb-1.5";
function UserProfile({ user }) {
    const { avtUrl, bannerUrl, ...rest } = user;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { ...rest }
    });

    const [avatar, setAvatar] = useState(avtUrl);
    const [banner, setBanner] = useState(bannerUrl);
    const avtRef = useRef(null);
    const bannerRef = useRef(null);
    const { isPending, updateProfile } = useUpdateProfile();
    const { isPending: uploadingMedia, uploadMedia } = useUploadMedia();

    function onSubmit(data) {
        updateProfile({ ...data }, {
            onSuccess: () => toast.success("Cập nhật thông tin thành công")
        });
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadMedia({ file, type: MEDIA_TYPE.AVT }, {
                onSuccess: (response) => {
                    toast.success("Cập nhật ảnh đại diện thành công");
                    setAvatar(response.data.avtUrl);
                },
                onError: (error) => toast.error(error.message)
            });
        }
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadMedia({ file, type: MEDIA_TYPE.BANNER }, {
                onSuccess: (response) => {
                    toast.success("Cập nhật ảnh bìa thành công");
                    setBanner(response.data.bannerUrl);
                },
                onError: (error) => toast.error(error.message)
            });
        }
    };



    return (
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <h2 className="text-[2.2rem] font-bold text-gray-900 mb-6">Hồ sơ cá nhân</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="relative h-[140px] group">
                            <img
                                className="w-full h-full object-cover"
                                src={banner || "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop"}
                                alt="Banner cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                            <button
                                type="button"
                                disabled={uploadingMedia}
                                onClick={() => bannerRef.current.click()}
                                className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-rose-600 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer disabled:opacity-50"
                                title="Đổi ảnh bìa"
                            >
                                <HiOutlineCamera className="text-[1.8rem]" />
                            </button>
                            <input
                                ref={bannerRef}
                                type="file"
                                accept="image/*"
                                onChange={handleBannerChange}
                                className="hidden"
                            />
                        </div>

                        <div className="relative px-6 pb-8">
                            <div className="absolute -top-[110px] left-6 group">
                                <img
                                    src={avatar || "/default-avt.png"}
                                    alt="Avatar"
                                    className="w-[100px] h-[100px] rounded-full object-cover border-4 border-white shadow-md bg-white"
                                />
                                <button
                                    type="button"
                                    disabled={uploadingMedia}
                                    onClick={() => avtRef.current.click()}
                                    className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center text-gray-600 hover:text-rose-600 hover:bg-white shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
                                    title="Đổi ảnh đại diện"
                                >
                                    <HiOutlineCamera className="text-[1.4rem]" />
                                </button>
                                <input
                                    ref={avtRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>

                            <div className="mt-[60px]">
                                <h3 className="text-[1.8rem] font-bold text-gray-900 leading-tight">
                                    {user.firstName} {user.lastName}
                                </h3>
                                <p className="text-[1.3rem] text-gray-500 mt-1">{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="lg:col-span-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">

                        <div className="pb-4 border-b border-gray-100">
                            <h3 className="text-[1.6rem] font-semibold text-gray-900">Thông tin cơ bản</h3>
                            <p className="text-[1.3rem] text-gray-500 mt-1">Quản lý tên hiển thị và thông tin liên hệ của bạn.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className={labelClasses}>Họ</label>
                                <input
                                    type="text"
                                    {...register("lastName", { required: "Vui lòng nhập Họ" })}
                                    className={inputClasses}
                                    placeholder="Nguyễn Văn"
                                />
                                {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
                            </div>
                            <div>
                                <label className={labelClasses}>Tên</label>
                                <input
                                    type="text"
                                    {...register("firstName", { required: "Vui lòng nhập Tên" })}
                                    className={inputClasses}
                                    placeholder="A"
                                />
                                {errors.firstName && <ErrorMessage message={errors.firstName.message} />}
                            </div>
                            <div className="sm:col-span-2">
                                <label className={labelClasses}>Số điện thoại</label>
                                <input
                                    type="tel"
                                    placeholder="0914xxxxxx"
                                    {...register("phoneNumber")}
                                    className={inputClasses}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className={labelClasses}>Giới thiệu bản thân</label>
                                <textarea
                                    placeholder="Viết vài dòng giới thiệu về bạn để mọi người hiểu bạn hơn..."
                                    {...register("description")}
                                    className={`${inputClasses} h-32 resize-none`}
                                />
                            </div>
                        </div>

                        <div className="pt-4 pb-4 border-b border-gray-100">
                            <h3 className="text-[1.6rem] font-semibold text-gray-900">Thông tin cá nhân & Bảo mật</h3>
                            <p className="text-[1.3rem] text-gray-500 mt-1">Các thông tin này được giữ kín và dùng để xác minh danh tính.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="sm:col-span-2">
                                <label className={labelClasses}>Email</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    disabled
                                    className={`${inputClasses} bg-gray-100 text-gray-500 cursor-not-allowed`}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Số CCCD / Hộ chiếu</label>
                                <input
                                    type="text"
                                    placeholder="Nhập số CCCD"
                                    {...register("cid")}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Mã số thuế</label>
                                <input
                                    type="text"
                                    placeholder="Nhập mã số thuế"
                                    {...register("taxCode")}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Giới tính</label>
                                <select
                                    {...register("sex")}
                                    className={inputClasses}
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value={true}>Nam</option>
                                    <option value={false}>Nữ</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Ngày sinh</label>
                                <input
                                    type="date"
                                    {...register("dob")}
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        <div className="pt-6 mt-6 flex justify-end">
                            <Button
                                disabled={isPending || uploadingMedia}
                                variant="primary"
                                type="submit"
                                className="!py-3 !px-8 min-w-[200px]"
                            >
                                {isPending ? "Đang lưu..." : "Lưu thay đổi"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
