import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import MiniSpinner from "../../ui/MiniSpinner";
import toast from "react-hot-toast";

import AssetItem from "../asset/AssetItem";
import PostFrormDetail from "./PostFrormDetail";
import Button from "../../ui/Button";

import useUpdatePost from "./useUpdatePost";

function PostUpdateForm({ post }) {
    const { isPending, updatePost } = useUpdatePost()
    const { assetDetail, ...rest } = post
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...rest
        },
    });
    const onSubmit = (data) => {
        const { id, ...request } = data
        updatePost({ id, request }, {
            onSuccess: () => {
                toast.success("Tạo bài viết mới thành công")
                navigate(`/post/${id}`)
                reset
            },
            onError: (error) => toast.error(error.message)
        })

    };
    const asset = {

        imageUrl: assetDetail.contents[0].url,
        ...assetDetail
    }
    if (isPending) return <MiniSpinner />
    return (
        <div className="bg-white grid grid-cols-[0.6fr_0.4fr] gap-15 p-5 space-y-8">
            <div >
                <AssetItem asset={asset} />
            </div>
            <form id="post-form" onSubmit={handleSubmit(onSubmit)}>
                <PostFrormDetail setValue={setValue} watch={watch} control={control} errors={errors} register={register} />
                <div className="w-full flex justify-center left-0 fixed bottom-0 p-5 border-[0.5px] border-gray-300 bg-white shadow-2xl">

                    <Button type="submit" form="post-form" variant="primary" className="w-80">
                        Cập nhật
                    </Button>
                </div>
            </form>
        </div >
    )
}

export default PostUpdateForm
