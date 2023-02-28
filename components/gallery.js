import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function Gallery({basePath, gallery}) {
  return (
    <Box sx={{ width: 900, height: 750, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {gallery.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${basePath}${item.path}`}
              srcSet = {`${basePath}${item.path}`}
              alt={item.description}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}