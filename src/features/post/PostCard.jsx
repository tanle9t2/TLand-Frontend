import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '../../ui/Button';

import { CiHeart } from "react-icons/ci";
import { caculateSquare, formatVietnamMoney, getTimeDifferenceFromNow } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
function PostCard({ post }) {
    const { id, title, properties, type, createdAt, price, assetDetail } = post
    const navigate = useNavigate()
    const square = caculateSquare(assetDetail.dimension);
    return (
        <Card onClick={() => navigate(`/post/${id}`)} className='mx-3 first:ml-0 last:mr-0 cursor-pointer hover:scale-105 transform transition duration-500' sx={{ maxWidth: 250 }}>
            <CardMedia
                component="img"
                alt={title}
                sx={{ height: 169, width: 250, objectFit: "fit" }}
                image={assetDetail?.contents[0].url}
            />
            <CardContent>
                <Typography
                    className="line-clamp-2 overflow-hidden"
                    sx={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        lineHeight: '1.5rem', // 24px
                        height: '3rem',       // 2 lines × 1.5rem = 3rem (48px)
                    }}
                    gutterBottom
                    component="div"
                >
                    {title}
                </Typography>

                <Typography variant="body1" sx={{ fontSize: '15px' }}>
                    {properties}
                </Typography>
                <Typography className='flex' variant="body1" sx={{ color: 'text.secondary' }}>
                    <span className='font-bold  text-xl'>
                        <span className='mr-2 text-2xl text-red-500'>
                            {type == "RENT" ? `${formatVietnamMoney(price)}/tháng` : `${formatVietnamMoney(price)}`}
                        </span>
                        <span className='mx-2'>
                            {type == "SELL" && `${formatVietnamMoney(Math.ceil(price / square))}/m2`}
                        </span>
                        <span className='mx-2'>
                            {square}m2
                        </span>
                    </span>
                </Typography>
                <div className='flex items-start justify-between mt-2'>
                    <div>
                        <Typography variant="body1" sx={{
                            fontWeight: 'bold',
                            lineHeight: '1.5rem',
                            height: '3rem',
                        }} className='font-bold text-2xl'>
                            {`${assetDetail.address}, ${assetDetail.ward}, ${assetDetail.province}`}
                        </Typography>
                        <Typography variant="body2" className='font-bold text-2xl'>
                            {getTimeDifferenceFromNow(createdAt)}
                        </Typography>
                    </div>
                    <CardActions>
                        <Button variant='secondary'>
                            <CiHeart size={19} fill='black' />
                        </Button>
                    </CardActions>
                </div>
            </CardContent>
        </Card>
    );
}

export default PostCard
