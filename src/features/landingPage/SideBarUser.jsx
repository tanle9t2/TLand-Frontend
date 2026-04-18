import { MdOutlineCalendarMonth } from "react-icons/md"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import useGetUserLandingPage from "./useGetUserLandingPage"
import MiniSpinner from "../../ui/MiniSpinner"
import { getTimeDifferenceFromNow } from "../../utils/helper"
import useFollowUser from "../auth/useFollowUser"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import useCheckUserFollow from "../auth/useCheckUserFollow"
import useUnFollowUser from "../auth/useUnFollowUser"
import Button from "../../ui/Button"

function SideBarUser() {
    const { isLoading, landingPage } = useGetUserLandingPage()
    const { isLoading: isFollowerLoading, isFollow } = useCheckUserFollow()
    const { id, firstName, lastName, description, createdAt, totalFollower, totalFollowing, avtUrl, bannerUrl } = landingPage || {}
    const { isPending, followUser } = useFollowUser()
    const { isPending: isPendingUnFollow, unfollower } = useUnFollowUser()
    const [curTotalFollower, setCurTotalFollower] = useState(totalFollower || 0)

    useEffect(() => {
        if (!isLoading && landingPage)
            setCurTotalFollower(landingPage.totalFollower)
    }, [isLoading, landingPage])

    if (isLoading || isFollowerLoading) return <MiniSpinner />
    const fullName = `${firstName} ${lastName}`

    function handleOnFollow() {
        followUser({ followerId: id }, {
            onSuccess: () => {
                toast.success(`Đã theo dõi ${fullName}`)
                setCurTotalFollower(prev => prev + 1)
            }
        })
    }

    function handleOnUnFollow() {
        unfollower({ followerId: id }, {
            onSuccess: () => {
                toast.success(`Đã hủy theo dõi ${fullName}`)
                setCurTotalFollower(prev => prev - 1)
            }
        })
    }

    return (
        <section className="w-full bg-white border-b border-gray-200">

            <div className="relative h-[250px] md:h-[400px] w-full overflow-hidden">
                <img
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src={bannerUrl || "https://images.unsplash.com/photo-1628611225249-6c3c7c689552?auto=format&fit=crop&w=1920&q=80"}
                    alt="Cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent"></div>
            </div>


            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-24 md:-mt-32 pb-8 flex flex-col md:flex-row gap-6 items-start md:items-end justify-between">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full md:w-auto z-10">
                        <Avatar
                            src={avtUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=18181b&color=fff`}
                            alt={fullName}
                            sx={{
                                width: { xs: 120, md: 160 },
                                height: { xs: 120, md: 160 },
                                border: '4px solid white',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                bgcolor: 'white'
                            }}
                        />
                        <div className="mb-2 text-center md:text-left mt-4 md:mt-0">
                            <Typography variant="h3" component="h1" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.03em', mb: 1, textShadow: { xs: 'none', md: '0 2px 10px rgba(0,0,0,0.1)' } }}>
                                {fullName}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontSize: "1.25rem", display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1, fontWeight: 500 }}>
                                <MdOutlineCalendarMonth size={20} />
                                Tham gia từ {getTimeDifferenceFromNow(createdAt)}
                            </Typography>
                        </div>
                    </div>


                    <div className="flex flex-col sm:flex-row gap-6 items-center w-full md:w-auto mt-6 md:mt-0 z-10 block-stats">
                        <Paper elevation={0} sx={{
                            display: 'flex', gap: { xs: 3, sm: 5 }, px: 4, py: 2,
                            bgcolor: 'grey.50', borderRadius: 4, border: '1px solid',
                            borderColor: 'grey.200',
                            paddingTop: "6.25px",
                            paddingBottom: "6.25px",
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div className="flex flex-col items-center md:items-start tracking-tight">
                                <span className="text-2xl md:text-3xl font-black text-zinc-900">{curTotalFollower}</span>
                                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Người theo dõi</span>
                            </div>
                            <div className="w-px bg-zinc-300"></div>
                            <div className="flex flex-col items-center md:items-start tracking-tight">
                                <span className="text-2xl md:text-3xl font-black text-zinc-900">{totalFollowing}</span>
                                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Đang theo dõi</span>
                            </div>
                        </Paper>

                        <div className="w-full sm:w-auto flex justify-center mt-2 sm:mt-0">
                            {isFollow
                                ? <Button
                                    onClick={() => handleOnUnFollow()}
                                    disabled={isPendingUnFollow}
                                >
                                    {isPendingUnFollow ? <MiniSpinner /> : "Đang theo dõi"}
                                </Button>
                                : <Button
                                    onClick={() => handleOnFollow()}
                                    disabled={isPending}
                                >
                                    {isPending ? <MiniSpinner /> : "Theo dõi ngay"}
                                </Button>}
                        </div>
                    </div>
                </div>


                {description && description.trim() !== "" && (
                    <Box sx={{ maxWidth: 'md', pb: 8, pt: 2, color: 'text.secondary', fontSize: '1.5rem', lineHeight: 1.8, mx: { xs: 'auto', md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
                        {description.split('\n').map((item, i) => (
                            <span key={i}>
                                {item}
                                <br />
                            </span>
                        ))}
                    </Box>
                )}
            </div>
        </section>
    )
}

export default SideBarUser
