
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdArrowDropDown } from "react-icons/md";
import { useState } from 'react';
import useGetCategories from '../features/asset/useGetCategories';
import SyncLoader from 'react-spinners/SyncLoader';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    border: "transparent",
    bgcolor: 'background.paper',
    borderRadius: "5px",
    boxShadow: 24,
    overflow: "hidden",
    minHeight: "330px"
};
function ModalCreate({ category, setCategory }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { isLoading, categories } = useGetCategories();
    function handleOnSelet(item) {
        setOpen(false)
        setCategory(item);
    }

    return (
        <div>
            <div className='relative'>
                <div onClick={handleOpen} className='text-2xl px-5 py-5 rounded-md border-2 w-full border-gray-300' >
                    <p className='w-full h-9 mt-3 truncate'>{category?.name}</p>
                </div>
                <p className='absolute w-fit top-2 left-5 text-xl text-gray-500'>Danh mục bất động sản</p>
                <span className='absolute top-[30%]  right-3 text-5xl'><MdArrowDropDown /></span>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {isLoading ? <SyncLoader /> :
                    <Box sx={style}>
                        <div className='bg-gray-100 p-3 mx-auto flex justify-center'>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Đăng tin
                            </Typography>
                        </div>
                        <div className='p-6'>
                            <h1 className='font-bold text-3xl'>Chọn danh mục</h1>
                            <ul className="text-2xl mt-3 border-2 border-gray-300 rounded-md divide-y divide-gray-300">
                                {categories.map(item => <li
                                    onClick={() => handleOnSelet(item)}
                                    key={item.id} className="p-5 hover:bg-gray-300">{item.name}</li>)}

                            </ul>
                        </div>
                    </Box>
                }
            </Modal>
        </div>
    );
}

export default ModalCreate
