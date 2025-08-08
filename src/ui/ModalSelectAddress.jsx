import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import Button from "./Button";
import useGetProvince from "../features/asset/useGetProvince";
import SyncLoader from "react-spinners/SyncLoader";
import useGetWards from "../features/asset/useGetWards";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    border: "transparent",
    bgcolor: 'background.paper',
    borderRadius: "5px",
    boxShadow: 24,
    overflow: "hidden",
    minHeight: "330px"
};
function ModalSelectAddress({ address, setAddress }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [provinceCode, setProvinceCode] = useState(null)
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            province: address?.province || "",
            ward: address?.ward || "",
            detail: address?.addresDetail || "",
        },
    });
    const { isLoading, provinces } = useGetProvince()
    const { isLoading: isLoadingWard, wards } = useGetWards(provinceCode)

    function onSubmit() {
        const address = {
            province: getValues().province,
            ward: getValues().ward,
            detail: getValues().detail
        }
        setAddress(address)
        setOpen(false)
    }

    function handleUpdateProvince(e) {
        const value = e.target.value;
        const province = provinces.find(p => `${p.type} ${p.name}` === value);
        setProvinceCode(province.code)
    };


    return (
        <div>
            <div className='relative'>
                <div onClick={handleOpen} className='text-2xl px-5 py-5 rounded-md w-full border' >
                    <p >{address?.detail ? `${address.detail}, ${address.ward}, ${address.province}` : "Địa chỉ"}</p>
                </div>
                <span className='absolute top-[30%]  right-3 text-5xl'><MdArrowDropDown /></span>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className=' p-3 mx-auto flex justify-center'>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Địa chỉ
                        </Typography>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        {isLoading || isLoadingWard ? <SyncLoader /> :
                            <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-5 w-full">
                                <div className="my-5">
                                    <label htmlFor="province" className="block mb-2 text-2xl font-bold">
                                        Chọn tỉnh, thành phố
                                    </label>
                                    <select
                                        onChange={handleUpdateProvince}
                                        id="province"
                                        {...register("province", {
                                            required: "Vui lòng chọn tỉnh",
                                            onChange: (e) => handleUpdateProvince(e),
                                        })}
                                        className="w-full p-6 border border-gray-300 rounded text-2xl"
                                    >
                                        <option value="">Chọn tỉnh, thành phố</option>
                                        {provinces.map((item) => (
                                            <option key={item.code} value={`${item.type} ${item.name}`}>
                                                {item.type} {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.province && (
                                        <ErrorMessage message={errors.province.message} />
                                    )}
                                </div>

                                <div className="my-5">
                                    <label htmlFor="ward" className="block mb-2 text-2xl font-bold">
                                        Chọn phường, xã
                                    </label>
                                    <select
                                        id="ward"
                                        {...register("ward", { required: "Vui lòng chọn phường/xã" })}
                                        className="w-full p-6 border border-gray-300 rounded text-2xl"
                                    >
                                        <option value="">Chọn phường, xã</option>
                                        {wards?.map((item, index) => (
                                            <option key={index} value={`${item.type} ${item.name}`}>
                                                {`${item.type} ${item.name}`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.ward && (
                                        <ErrorMessage message={errors.ward.message} />
                                    )}
                                </div>

                                <div className="my-5">
                                    <label htmlFor="detail" className="block mb-2 text-2xl font-bold">
                                        Số nhà, tên đường
                                    </label>
                                    <input
                                        id="detail"
                                        {...register("detail", {
                                            required: "Vui lòng nhập số nhà và tên đường",
                                        })}
                                        className="w-full p-6 border border-gray-300 rounded text-2xl"
                                        placeholder="Số nhà, tên đường"
                                    />
                                    {errors.detail && (
                                        <ErrorMessage message={errors.detail.message} />
                                    )}
                                </div>

                                <Button type="submit" variant="primary" className="w-full">
                                    Xong
                                </Button>
                            </form>
                        }


                    </div>
                </Box >

            </Modal >
        </div >

    );
}

export default ModalSelectAddress
