import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Section from "../../ui/Section";
import useDeleteAsset from "./useDeleteAsset";
import FullPageSpinner from "../../ui/FullPageSpinner";
import toast from "react-hot-toast";
import { useState } from "react";
import { Box, Modal } from "@mui/material";
import ConfirmDelete from "../../ui/ConfirmDelete";
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
    display: "flex",
    justifyContent: "justify-center",
    alignItems: "center",
    padding: "30px"

};
function MenuAssetDetail({ asset }) {
    const { attachedPostShow } = asset
    const { isPending, deleteAsset } = useDeleteAsset()
    const [isShowDelete, setIsShowDelete] = useState(false)
    const navigate = useNavigate();

    if (isPending) return <FullPageSpinner />
    function handleOnCloseDelete() {
        setIsShowDelete(false);
    }
    function handleOnConfirm() {
        deleteAsset({ id: asset.id }, {
            onSuccess: () => {
                navigate("/asset")
                toast.success("Xóa tài sản thành công")
            }
        })
    }
    return (
        <Section>
            <div className="p-4">
                <h1 className="text-3xl font-bold">Thao tác</h1>
                {attachedPostShow && <p className="text-red-500">
                    Tài sản hiện tại đang được đăng bán. Bạn không thể chỉnh sửa hay đăng bài mới
                    <br />
                    Gỡ bài đăng khỏi tài sản để chỉnh sửa
                </p>}
            </div>
            <div className="flex items-center p-4">
                <div className="w-full">
                    <Button disabled={attachedPostShow} variant="primary" className="w-full">
                        Đăng bán
                    </Button>
                    <Link
                        to={`/asset/update/${asset.id}`}
                        state={{ asset }}
                    >
                        <Button variant="secondary" className="w-full">
                            Chỉnh sửa
                        </Button>
                    </Link>
                    <Modal
                        open={isShowDelete}
                        onClose={handleOnCloseDelete}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <ConfirmDelete resourceName="tài sản" disabled={isPending} onCloseModal={handleOnCloseDelete} onConfirm={() => handleOnConfirm()} />
                        </Box >
                    </Modal>
                    <Button onClick={() => setIsShowDelete(true)} disabled={attachedPostShow} variant="secondary" className="w-full">
                        Xóa tài sản
                    </Button>
                </div>
            </div>
        </Section >
    );
}

export default MenuAssetDetail
