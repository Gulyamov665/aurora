// import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
// import React from 'react'
// import EditIcon from "@mui/icons-material/Edit";
// import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

// export const LocationList: React.FC = () => {
//   return (
//     <Box>
//         <Typography variant="h6" fontWeight="bold">
//     Мои адреса
//   </Typography>
//   {locationList?.map((location) => (
//     <div onClick={() => handleLocationClick(location.id)} key={location.id}>
//       <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} mt={1}>
//         {location.is_active ? (
//           <BookmarkAddedIcon color="warning" />
//         ) : isLoading && location.id === changingId ? (
//           <CircularProgress size={24} color="warning" />
//         ) : (
//           <BookmarkBorderIcon />
//         )}
//         <Box ml={1} flexGrow={1}>
//           <Typography>{location.name || location.address}</Typography>
//           <Typography color="text.secondary" variant="body2">
//             подъезд {location.entrance}, этаж {location.floor}, кв. {location.apartment}
//           </Typography>
//         </Box>
//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation();
//             console.log("first");
//           }}
//         >
//           <EditIcon />
//         </IconButton>
//       </Box>
//     </div>
//     </Box>
//   )
// }
