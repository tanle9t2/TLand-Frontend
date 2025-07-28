import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import Button from "./Button";
import useGetProvince from "../features/asset/useGetProvince";
import SyncLoader from "react-spinners/SyncLoader";
import useGetWards from "../features/asset/useGetWards";

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
function ModalSelectAddress() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [provinceCode, setProvinceCode] = useState(null)
    const [address, setAddress] = useState({
        "province": null,
        "ward": null,
        "addresDetail": "",
    });
    const { isLoading, provinces } = useGetProvince()
    const { isLoading: isLoadingWard, wards } = useGetWards(provinceCode)

    function handleUpdateProvince(e) {
        const value = e.target.value;
        const province = provinces.find(p => p.name === value);
        setAddress(prev => ({
            ...prev,
            ["province"]: value
        }));
        setProvinceCode(province.code)
    };
    function handleUpdateWard(e) {
        const value = e.target.value
        setAddress(prev => ({
            ...prev,
            ["ward"]: value
        }));
    };
    function handleUpdateDetail(e) {
        const value = e.target.value
        setAddress(prev => ({
            ...prev,
            ["addresDetail"]: value
        }));
    };


    return (
        <div>
            <div className='relative'>
                <div onClick={handleOpen} className='text-2xl px-5 py-5 rounded-md border-2 w-full border-gray-300' >
                    <p >Địa chỉ</p>
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
                            <form className="px-8 py-5 w-full">
                                <div className="my-5">
                                    <label htmlFor="province" className="block mb-2 text-2xl font-bold">
                                        Chọn tỉnh, thành phố
                                    </label>
                                    <select
                                        id="province"
                                        name="province"
                                        value={address.province}
                                        onChange={(e) => handleUpdateProvince(e)}
                                        className="w-full p-6 border border-gray-300 rounded text-2xl"
                                    >
                                        <option value="">Chọn tỉnh, thành phố</option>
                                        {provinces.map(item => (
                                            <option key={item.code} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                <div className="my-5">
                                    <label htmlFor="ward" className="block mb-2 text-2xl font-bold">
                                        Chọn phường, xã
                                    </label>
                                    <select
                                        id="ward"
                                        name="ward"
                                        value={address.ward}
                                        onChange={(e) => handleUpdateWard(e)}
                                        className="w-full p-6 border border-gray-300 rounded text-2xl"
                                    >
                                        <option value="">Chọn phường, xã</option>
                                        {wards?.map(item => <option value={`${item.type} ${item.name}`}>{`${item.type} ${item.name}`}</option>)}
                                    </select>
                                </div>
                                <div className="my-5">
                                    <label htmlFor="detail" className="block mb-2 text-2xl font-bold">
                                        Số nhà, tên đường
                                    </label>
                                    <input
                                        id="detail"
                                        name="detail"
                                        value={address.addresDetail}
                                        onChange={(e) => handleUpdateDetail(e)}
                                        className="w-full p-6 border border-gray-300 rounded text-2xl"
                                        placeholder="Số nhà, tên đường"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                >
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
