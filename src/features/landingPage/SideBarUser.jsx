import { MdOutlineCalendarMonth } from "react-icons/md"
import Button from "../../ui/Button"
import useGetUserLandingPage from "./useGetUserLandingPage"
import MiniSpinner from "../../ui/MiniSpinner"
import { getTimeDifferenceFromNow } from "../../utils/helper"
import useFollowUser from "../auth/useFollowUser"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import useCheckUserFollow from "../auth/useCheckUserFollow"
import useUnFollowUser from "../auth/useUnFollowUser"
function SideBarUser() {
    const { isLoading, landingPage } = useGetUserLandingPage()
    const { isLoading: isFollowerLoading, isFollow } = useCheckUserFollow()
    const { id, firstName, lastName, description, createdAt, totalFollower, totalFollowing, avtUrl, bannerUrl } = landingPage || {}
    const { isPending, followUser } = useFollowUser()
    const { isPending: isPendingUnFollow, unfollower } = useUnFollowUser()
    const [curTotalFollower, setCurTotalFollower] = useState(totalFollower)

    useEffect(() => {
        if (!isLoading && landingPage)
            setCurTotalFollower(totalFollower)
    }, [isLoading, landingPage, setCurTotalFollower, totalFollower])

    if (isLoading || isFollowerLoading) return <MiniSpinner />
    const fullName = `${firstName} ${lastName}`


    function handleOnFollow() {
        followUser({ followerId: id }, {
            onSuccess: () => {
                toast.success(`Theo dõi ${fullName} thành công`)
                console.log("p")
                setCurTotalFollower(prev => prev + 1)
            }
        }
        )
    }
    function handleOnUnFollow() {
        unfollower({ followerId: id }, {
            onSuccess: () => {
                toast.success(`Hủy dõi ${fullName} thành công`)
                setCurTotalFollower(prev => prev - 1)
            }
        })
    }
    return (
        <aside className="w-full sticky top-6 self-start col-span-3 rounded-xl shadow bg-white">
            <div className="relative">
                <img class="h-[125px] w-full border-tr object-cover md:rounded-t-lg" src={bannerUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmdMaWzjGnnRXb6cvKjMasSO5AiRNHBh1Ybg&s"}></img>

                <img
                    src={avtUrl}
                    alt={fullName}
                    className="w-[92px] h-[92px] left-8 bottom-0 translate-y-1/2 absolute rounded-full mb-3"
                />
            </div>

            <div className="pt-20 p-4 text-2xl space-y-3">
                <h2 className="font-bold text-3xl">{fullName}</h2>
                <div className="flex space-x-5">
                    <p className="border-r-2 pr-5">Người theo dõi: <span className="font-bold">{curTotalFollower}</span></p>
                    <p>Đang theo dõi: <span className="font-bold">{totalFollowing}</span></p>
                </div>
                <p>
                    {description?.split("\n").map((item, i) => <>
                        <br key={i} />
                        <span key={i}>{item}</span>
                    </>) || "Chưa có mô tả"}
                </p>

                {isFollow
                    ? <Button onClick={() => handleOnUnFollow()} className="w-full" variant="primary">
                        {isPendingUnFollow ? <MiniSpinner /> : "- Hủy Theo dõi"}
                    </Button>
                    : <Button onClick={() => handleOnFollow()} className="w-full" variant="primary">
                        {isPending ? <MiniSpinner /> : "+ Theo dõi"}
                    </Button>}


                <p className="flex items-center space-x-2 text-2xl">
                    <span>
                        <MdOutlineCalendarMonth size={18} />
                    </span>
                    <span>
                        Tham gia: {getTimeDifferenceFromNow(createdAt)}
                    </span>
                </p>

            </div>
        </aside >
    )
}

export default SideBarUser
