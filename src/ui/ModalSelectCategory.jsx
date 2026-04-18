import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { MdArrowDropDown } from "react-icons/md";
import { HiOutlineTag, HiOutlineCheck } from "react-icons/hi";
import useGetCategories from '../features/asset/useGetCategories';
import SyncLoader from 'react-spinners/SyncLoader';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 520,
    border: "none",
    outline: "none",
    bgcolor: 'background.paper',
    borderRadius: "16px",
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    overflow: "hidden",
};

function ModalSelectCategory({ category, setCategory }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { isLoading, categories } = useGetCategories();

    function handleOnSelect(item) {
        setOpen(false);
        setCategory(item);
    }

    return (
        <div>
            {/* Trigger Button */}
            <div
                onClick={handleOpen}
                className="group relative flex items-center justify-between w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white cursor-pointer transition-all duration-200 hover:border-rose-300 hover:shadow-sm outline-none"
            >
                <div className="flex flex-col">
                    <span className="text-[1.15rem] text-gray-400 font-medium leading-tight">Danh mục bất động sản</span>
                    <span className={`text-[1.4rem] mt-0.5 font-medium leading-tight ${category?.name ? 'text-gray-800' : 'text-gray-400'}`}>
                        {category?.name || "Chọn danh mục"}
                    </span>
                </div>
                <MdArrowDropDown className="text-[2.4rem] text-gray-400 group-hover:text-rose-400 transition-colors" />
            </div>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                                <HiOutlineTag className="text-[1.8rem]" />
                            </div>
                            <div>
                                <h2 className="text-[1.7rem] font-semibold text-gray-900">Chọn danh mục</h2>
                                <p className="text-[1.15rem] text-gray-400">Loại bất động sản bạn muốn đăng</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <SyncLoader color="#f43f5e" size={10} />
                            </div>
                        ) : (
                            <div className="space-y-1.5">
                                {categories.map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleOnSelect(item)}
                                        className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-left transition-all duration-200 cursor-pointer
                                            ${category?.id === item.id
                                                ? 'bg-rose-50 border border-rose-200 text-rose-700'
                                                : 'hover:bg-gray-50 border border-transparent text-gray-700'
                                            }`}
                                    >
                                        <span className="text-[1.4rem] font-medium">{item.name}</span>
                                        {category?.id === item.id && (
                                            <HiOutlineCheck className="text-[1.6rem] text-rose-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalSelectCategory
