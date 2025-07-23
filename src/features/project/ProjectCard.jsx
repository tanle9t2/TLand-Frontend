import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '../../ui/Button';

import { CiHeart, CiLocationOn } from "react-icons/ci";
import Tag from '../../ui/Tag';
function ProjectCard({ info }) {
    const { title, price, location, image } = info
    return (
        <Card className='mx-3 first:ml-0 last:mr-0 cursor-pointer hover:scale-105 transform transition duration-500' sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={image}
            />
            <CardContent>
                <Typography className='truncate' sx={{ fontSize: '16px', fontWeight: 'bold' }} gutterBottom component="div">
                    {title}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "10px", fontSize: '15px' }}>
                    <Tag text={"Đang thi công"} />
                    <Tag text={"Đang thi công"} />
                </Typography>
                <Typography className='flex' variant="body1" sx={{ color: 'text.secondary' }}>
                    <p className='font-bold  text-2xl'>
                        <span className='mr-2 text-red-500'>
                            {price}
                        </span>
                    </p>
                </Typography>
                <Typography className='flex' variant="body1" sx={{ marginTop: "10px", color: 'text.secondary' }}>
                    <p className=' flex items-center font-bold text-xl truncate'><span className='mr-2'><CiLocationOn /></span> {location}</p>

                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProjectCard
