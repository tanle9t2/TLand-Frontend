import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '../../ui/Button';

import { CiHeart } from "react-icons/ci";
function AssetCard({ asset }) {
    const { title, properties, price, location, createdAt, image } = asset
    return (
        <Card className='mx-3 first:ml-0 last:mr-0 cursor-pointer hover:scale-105 transform transition duration-500' sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={image}
            />
            <CardContent>
                <Typography className='line-clamp-2 ' sx={{ fontSize: '16px', fontWeight: 'bold' }} gutterBottom component="div">
                    {title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '15px' }}>
                    {properties}
                </Typography>
                <Typography className='flex' variant="body1" sx={{ color: 'text.secondary' }}>
                    <p className='font-bold  text-2xl'>
                        <span className='mr-2 text-red-500'>
                            {price}
                        </span>
                        <span className='mx-2'>
                            11tr/m2
                        </span>
                        <span className='mx-2'>
                            175m2
                        </span>
                    </p>
                </Typography>
                <Typography className='flex' variant="body1" sx={{ marginTop: "10px", color: 'text.secondary' }}>
                    <div>
                        <p className='font-bold text-2xl'>{location}</p>
                        <p className='font-bold text-2xl'>{createdAt}</p>
                    </div>
                    <CardActions className='ml-auto'>
                        <Button variant='secondary'><CiHeart size={19} fill='black' /></Button>
                    </CardActions>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default AssetCard
