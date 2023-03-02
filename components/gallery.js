import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Modal } from '@mui/material';

export default function Gallery({ basePath, gallery }) {
  const [current, setCurrent] = React.useState(-1)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleClick = (index) => {
    setCurrent(index);
    setOpen(true)
  }
  return (
    <>
      <Box sx={{ width: 350, height: 500, overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={1} gap={8}>
          {gallery.map((item, index) => (
            <ImageListItem key={item.id}>
              <img
                src={`${basePath}${item.path}`}
                srcSet={`${basePath}${item.path}`}
                alt={item.description}
                loading="lazy"
                onClick={()=>{handleClick(index)}}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Modal
        open={open}
        onClose={handleOpen}
      >
        <Box sx={{textAlign: 'center', height:'100%'}}>
          {current >= 0 &&(
            <img
            src={`${basePath}${gallery[current].path}`}
            alt={gallery[current].description}
            style={{maxWidth: '100%', maxHeight: '100%', objectFit:'cover', marginTop:'50%'}}
            onClick={handleOpen}
          />
          )}
        </Box>
      </Modal>
    </>
  );
}