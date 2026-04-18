import { HiOutlineExclamation } from "react-icons/hi";
import Button from "./Button";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
    return (
        <div className="flex flex-col items-center text-center gap-5">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                <HiOutlineExclamation className="text-[2.4rem] text-red-500" />
            </div>
            <div>
                <h2 className="text-[1.7rem] font-semibold text-gray-900 mb-2">
                    Xóa {resourceName}
                </h2>
                <p className="text-[1.3rem] text-gray-500 leading-relaxed max-w-[32rem]">
                    Bạn có chắc chắn muốn xóa {resourceName} này? Hành động này không thể hoàn tác.
                </p>
            </div>
            <div className="flex items-center gap-3 w-full mt-1">
                <Button
                    variant="secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                    className="!flex-1 !rounded-xl !py-3 !text-[1.35rem]"
                >
                    Hủy
                </Button>
                <button
                    type="button"
                    disabled={disabled}
                    onClick={onConfirm}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white text-[1.35rem] font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    Xóa
                </button>
            </div>
        </div>
    );
}

export default ConfirmDelete;
