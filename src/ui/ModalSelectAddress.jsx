import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useCallback, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Button from "./Button";
import useGetProvince from "../features/asset/useGetProvince";
import SyncLoader from "react-spinners/SyncLoader";
import useGetWards from "../features/asset/useGetWards";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Select from 'react-select'

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
};

const selectStyles = {
    control: (base, state) => ({
        ...base,
        borderRadius: '12px',
        borderColor: state.isFocused ? '#fb7185' : '#e5e7eb',
        boxShadow: state.isFocused ? '0 0 0 2px rgba(244, 63, 94, 0.15)' : 'none',
        padding: '4px 4px',
        fontSize: '1.4rem',
        minHeight: '44px',
        transition: 'all 0.2s',
        '&:hover': {
            borderColor: '#fda4af',
        },
    }),
    option: (base, state) => ({
        ...base,
        fontSize: '1.4rem',
        padding: '10px 16px',
        backgroundColor: state.isSelected ? '#fff1f2' : state.isFocused ? '#f9fafb' : 'white',
        color: state.isSelected ? '#e11d48' : '#374151',
        cursor: 'pointer',
        '&:active': {
            backgroundColor: '#fff1f2',
        },
    }),
    placeholder: (base) => ({
        ...base,
        color: '#9ca3af',
        fontSize: '1.4rem',
    }),
    singleValue: (base) => ({
        ...base,
        fontSize: '1.4rem',
        color: '#1f2937',
    }),
    menu: (base) => ({
        ...base,
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        border: '1px solid #f3f4f6',
        overflow: 'hidden',
    }),
    menuList: (base) => ({
        ...base,
        padding: '4px',
    }),
};

const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.4rem] text-gray-800 bg-white placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400";
const labelClass = "block text-[1.35rem] font-medium text-gray-700 mb-2";

function ModalSelectAddress({ address, setAddress }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [provinceCode, setProvinceCode] = useState(null);

    const {
        register,
        control,
        getValues,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            province: address?.province || "",
            ward: address?.ward || "",
            detail: address?.addresDetail || "",
        },
    });

    const { isLoading, provinces } = useGetProvince();
    const { isLoading: isLoadingWard, wards } = useGetWards(provinceCode);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const addr = {
            province: getValues().province,
            ward: getValues().ward,
            detail: getValues().detail
        };
        setAddress(addr);
        setOpen(false);
    }, [getValues, setAddress]);

    const provinceOption = provinces?.map(p => ({
        value: p.code,
        label: p.name
    }));

    const wardsOption = wards?.map(p => ({
        value: p.code,
        label: p.name
    }));

    // Build display text
    const displayText = address?.detail
        ? `${address.detail}, ${address.ward}, ${address.province}`
        : null;

    return (
        <div className="border-0 outline-none">
            <div
                onClick={handleOpen}
                className="group relative flex items-center justify-between w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white cursor-pointer transition-all duration-200 hover:border-rose-300 hover:shadow-sm outline-none"
            >
                <div className="flex items-center gap-3 min-w-0">
                    <HiOutlineLocationMarker className="text-[1.6rem] text-gray-400 group-hover:text-rose-400 transition-colors flex-shrink-0" />
                    <span className={`text-[1.4rem] font-medium truncate ${displayText ? 'text-gray-800' : 'text-gray-400'}`}>
                        {displayText || "Chọn địa chỉ bất động sản"}
                    </span>
                </div>
                <MdArrowDropDown className="text-[2.4rem] text-gray-400 group-hover:text-rose-400 transition-colors flex-shrink-0" />
            </div>


            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>

                    <div className="px-6 py-5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                                <HiOutlineLocationMarker className="text-[1.8rem]" />
                            </div>
                            <div>
                                <h2 className="text-[1.7rem] font-semibold text-gray-900">Địa chỉ bất động sản</h2>
                                <p className="text-[1.15rem] text-gray-400">Nhập chính xác để khách tìm kiếm dễ hơn</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {isLoading || isLoadingWard ? (
                            <div className="flex justify-center py-12">
                                <SyncLoader color="#f43f5e" size={10} />
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Province */}
                                <div>
                                    <label className={labelClass}>
                                        Tỉnh, thành phố <span className="text-rose-500">*</span>
                                    </label>
                                    <Controller
                                        name="province"
                                        control={control}
                                        rules={{ required: "Vui lòng chọn tỉnh" }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    options={provinceOption}
                                                    placeholder="Chọn tỉnh, thành phố"
                                                    styles={selectStyles}
                                                    value={provinceOption.find(opt => opt.label === field.value)}
                                                    onChange={(val) => {
                                                        field.onChange(val);
                                                        setProvinceCode(val.value);
                                                        setValue("province", val.label);
                                                    }}
                                                />
                                                {fieldState.error && (
                                                    <ErrorMessage message={fieldState.error.message} />
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Ward */}
                                <div>
                                    <label className={labelClass}>
                                        Phường, xã <span className="text-rose-500">*</span>
                                    </label>
                                    <Controller
                                        name="ward"
                                        control={control}
                                        rules={{ required: "Vui lòng chọn phường/xã" }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    options={wardsOption}
                                                    placeholder="Chọn phường, xã"
                                                    styles={selectStyles}
                                                    value={wardsOption?.find(opt => opt.label === field.value)}
                                                    onChange={(val) => {
                                                        field.onChange(val);
                                                        setValue("ward", val.label);
                                                    }}
                                                    isDisabled={!provinceCode}
                                                />
                                                {fieldState.error && (
                                                    <ErrorMessage message={fieldState.error.message} />
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Detail address */}
                                <div>
                                    <label className={labelClass}>
                                        Số nhà, tên đường <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        id="detail"
                                        {...register("detail", {
                                            required: "Vui lòng nhập số nhà và tên đường",
                                        })}
                                        className={inputClass}
                                        placeholder="VD: 123 Nguyễn Văn A"
                                    />
                                    {errors.detail && (
                                        <ErrorMessage message={errors.detail.message} />
                                    )}
                                </div>

                                {/* Submit */}
                                <Button
                                    onClick={(e) => onSubmit(e)}
                                    variant="primary"
                                    className="!w-full !rounded-xl !py-3.5 !text-[1.4rem] !mt-2 !shadow-lg !shadow-rose-500/20"
                                >
                                    Xác nhận địa chỉ
                                </Button>
                            </form>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalSelectAddress
