import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Section from "../../ui/Section";
import useDeleteAsset from "./useDeleteAsset";
import FullPageSpinner from "../../ui/FullPageSpinner";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { Box, Modal } from "@mui/material";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineShoppingCart, HiOutlineExclamationCircle } from "react-icons/hi";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    border: "none",
    outline: "none",
    bgcolor: 'background.paper',
    borderRadius: "16px",
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    overflow: "hidden",
    padding: "24px"
};

function MenuAssetDetail({ asset }) {
    const { attachedPostShow } = asset;
    const { isPending, deleteAsset } = useDeleteAsset();
    const [isShowDelete, setIsShowDelete] = useState(false);
    const navigate = useNavigate();

    const handleOnCloseDelete = useCallback(() => {
        setIsShowDelete(false);
    }, []);

    const handleOnConfirm = useCallback(() => {
        deleteAsset({ id: asset.id }, {
            onSuccess: () => {
                navigate("/asset");
                toast.success("Xóa tài sản thành công");
            }
        });
    }, [asset.id, deleteAsset, navigate]);

    if (isPending) return <FullPageSpinner />;

    return (
        <Section>
            <div className="p-6">
                <h2 className="text-[1.6rem] font-semibold text-gray-900 mb-4">Thao tác</h2>

                {attachedPostShow && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 mb-5">
                        <HiOutlineExclamationCircle className="text-[1.6rem] text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-[1.25rem] text-amber-700 leading-relaxed">
                            Tài sản đang được đăng bán. Gỡ bài đăng để chỉnh sửa hoặc đăng bài mới.
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    <Button
                        onClick={() => navigate("/create-post")}
                        disabled={attachedPostShow}
                        variant="primary"
                        className="!w-full !rounded-xl !py-3 !text-[1.4rem] !flex !items-center !justify-center !gap-2 !shadow-lg !shadow-rose-500/15"
                    >
                        <HiOutlineShoppingCart className="text-[1.5rem]" />
                        Đăng bán
                    </Button>

                    <Link
                        to={`/asset/update/${asset.id}`}
                        state={{ asset }}
                        className={attachedPostShow ? 'pointer-events-none' : ''}
                    >
                        <Button
                            variant="secondary"
                            disabled={attachedPostShow}
                            className="!w-full !rounded-xl !py-3 !text-[1.4rem] !flex !items-center !justify-center !gap-2"
                        >
                            <HiOutlinePencil className="text-[1.4rem]" />
                            Chỉnh sửa
                        </Button>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setIsShowDelete(true)}
                        disabled={attachedPostShow}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-[1.4rem] font-medium text-red-500 hover:bg-red-50 hover:border-red-300 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <HiOutlineTrash className="text-[1.4rem]" />
                        Xóa tài sản
                    </button>
                </div>
            </div>

            <Modal open={isShowDelete} onClose={handleOnCloseDelete}>
                <Box sx={modalStyle}>
                    <ConfirmDelete
                        resourceName="tài sản"
                        disabled={isPending}
                        onCloseModal={handleOnCloseDelete}
                        onConfirm={handleOnConfirm}
                    />
                </Box>
            </Modal>
        </Section>
    );
}

export default MenuAssetDetail
