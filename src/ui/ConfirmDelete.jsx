import Button from "./Button";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
    return (

        <div className="w-[40rem] m-auto bg-white flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Xóa {resourceName}</h1>
            <p className="text-gray-500 text-xl mb-4">
                Bạn có chắc chắn xóa {resourceName} vĩnh viễn? Hành động này không thể được khôi phục
            </p>
            <div className="flex justify-end gap-4">
                <Button
                    variant="secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    Hủy
                </Button>
                <Button variant="primary" disabled={disabled} onClick={onConfirm}>
                    Xóa
                </Button>
            </div>
        </div>

    );
}

export default ConfirmDelete;
