import Button from "../../ui/Button"
import AssetList from "../asset/AssetList";
import { Box, Modal } from "@mui/material";

import MiniSpinner from "../../ui/MiniSpinner";
import { FaMapMarkerAlt } from "react-icons/fa";

function PostCreated() {

    return (
        <div className="bg-white ">
            <h1 className="text-3xl font-bold p-5">Tin đăng</h1>
            <div className="py-20">
                <img className="w-[457px] h-[275px] mx-auto" src="/public/post-create-banner.png" />
                <p className="text-4xl font-bold text-center mt-5">ĐĂNG NHANH - BÁN GỌN</p>
            </div>
            <div className="justify-around flex">
                <Button>
                    Tạo tin từ tài sản có sẵn
                </Button>
                <Button>
                    Tạo tài sản mới
                </Button>
            </div>
        </div>
    )
}

export default PostCreated
