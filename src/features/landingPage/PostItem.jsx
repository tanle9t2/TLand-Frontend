import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '../../ui/Button';

import { CiHeart } from "react-icons/ci";
import { formatVietnamMoney, getTimeDifferenceFromNow } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
function PostItem({ post }) {
    const { id, title, createdAt, price, posterUrl } = post
    const navigate = useNavigate()

    return (
        <Card onClick={() => navigate(`/post/${id}`)} className='first:ml-0 flex-1 last:mr-0 cursor-pointer hover:scale-105 transform transition duration-500' sx={{ maxWidth: 220 }}>
            <CardMedia
                component="img"
                alt={title}
                sx={{ height: 220, width: 220, objectFit: "fit" }}
                image={posterUrl}
            />
            <CardContent>
                <Typography
                    className="line-clamp-4 overflow-hidden"
                    sx={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        lineHeight: '2.5rem', // 24px
                        height: '10rem',       // 2 lines × 1.5rem = 3rem (48px)
                    }}
                    gutterBottom
                    component="div"
                >
                    {title}
                </Typography>
                <Typography className='flex' variant="body1" sx={{ color: 'text.secondary' }}>
                    <span className='font-bold  text-xl'>
                        <span className='mr-2 text-2xl text-red-500'>
                            {formatVietnamMoney(price)}
                        </span>
                    </span>
                </Typography>

                <div className="grid grid-cols-3 items-start mt-2 space-x-3" >
                    <div className="col-span-2">
                        <Typography variant="body2" className="text-gray-600 text-sm mt-1">
                            {getTimeDifferenceFromNow(createdAt)}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default PostItem
