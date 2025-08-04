import React from 'react';
import Button from '../../ui/Button';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DraftItem = ({ draft }) => {

    const { contents, category, address, ward, province } = draft
    return (
        <div className="space-y-4 text-2xl cursor-pointer">
            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="flex">
                    <img src={contents[0].url} alt="Card Image" className="w-[144px] h-[144px] mr-4" />
                    <div className="mb-2 space-y-5">
                        <p className=" text-2xl truncate">
                            <span className='font-bold'>Danh mục bất động sản: </span>
                            {category ? category.name : "Chưa thiết lập"}
                        </p>
                        <p className=" text-2xl truncate">
                            <span className='font-bold'>Địa chỉ: </span>
                            {address ? `${address}, ${ward}, ${province}` : "Chưa thiết lập"}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Button variant='secondary'>
                        Xóa
                    </Button>
                    <Link
                        to={`draft/${draft.id}`}
                        state={{ draft }}
                    >
                        <Button variant='primary'>
                            Tiếp tục tin nháp
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default DraftItem;