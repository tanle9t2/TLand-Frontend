import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button"
import useUpdateProfile from "./useUpdateProfile";
import ErrorMessage from "../../ui/ErrorMessage";
import toast from "react-hot-toast";
import useUploadAvt from "./useUploadAvt";

function UserProfile({ user }) {
    const { avtUrl, ...rest } = user
    const { register,
        handleSubmit,
        formState: { errors }, } = useForm({
            defaultValues: { ...rest }
        })
    const [avatar, setAvatar] = useState(avtUrl);
    const fileRef = useRef(null)
    const { isPending, updateProfile } = useUpdateProfile()
    const { isPending: uploadingAvt, uploadAvt } = useUploadAvt()
    function onSubmit(data) {
        updateProfile({ ...data }, {
            onSuccess: () => toast.success("Cập nhập thông tin thành công")
        })
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadAvt({ file }, {
                onSuccess: (response) => {
                    toast.success("Cập nhật ảnh đại diện mới thành công")
                    setAvatar(response.data.avtUrl)
                },
                onError: (error) => toast.error(error.message)
            })
        }
    };
    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Hồ sơ cá nhân</h2>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="bg-white shadow-md w-1/3 h-fit text-2xl rounded-lg p-6 ">
                    <div className="flex items-center flex-col">
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="w-40 h-40 rounded-full object-cover border mb-4"
                        />
                        <Button disabled={uploadingAvt} onClick={() => fileRef.current.click()} className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300">
                            Đổi ảnh
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </Button>
                    </div>

                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-6 rounded-lg shadow-lg bg-white space-y-4 md:w-2/3">
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
