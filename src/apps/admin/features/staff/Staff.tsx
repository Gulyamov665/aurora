// import React from "react";
// import { Box, Card, CardContent, Typography, Grid, TextField, Button, MenuItem, IconButton } from "@mui/material";
// import { Add as AddIcon, Person as PersonIcon, Delete as DeleteIcon } from "@mui/icons-material";

// const roles = [
//   { value: "waiter", label: "Официант" },
//   { value: "courier", label: "Курьер" },
//   { value: "operator", label: "Оператор" },
// ];

// export const StaffSettings = () => {
//   const [staff, setStaff] = React.useState([{ name: "", phone: "", role: "waiter" }]);

//   const handleChange = (index: number, field: string, value: string) => {
//     const updated = [...staff];
//     updated[index][field] = value;
//     setStaff(updated);
//   };

//   const addStaff = () => {
//     setStaff([...staff, { name: "", phone: "", role: "waiter" }]);
//   };

//   const removeStaff = (index: number) => {
//     const updated = staff.filter((_, i) => i !== index);
//     setStaff(updated);
//   };

//   return (
//     <Box p={4}>
//       <Typography variant="h5" gutterBottom>
//         Добавление персонала
//       </Typography>
//       <Grid container spacing={3}>
//         {staff.map((member, index) => (
//           <Grid item xs={12} md={6} lg={4} key={index}>
//             <Card
//               sx={{
//                 borderRadius: 3,
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
//                 transition: "0.3s",
//                 ":hover": { boxShadow: "0 6px 16px rgba(0,0,0,0.12)" },
//               }}
//             >
//               <CardContent>
//                 <Box display="flex" alignItems="center" mb={2}>
//                   <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
//                   <Typography variant="h6">Сотрудник {index + 1}</Typography>
//                   <Box ml="auto">
//                     <IconButton onClick={() => removeStaff(index)} color="error">
//                       <DeleteIcon />
//                     </IconButton>
//                   </Box>
//                 </Box>
//                 <TextField
//                   fullWidth
//                   label="Имя"
//                   variant="outlined"
//                   value={member.name}
//                   onChange={(e) => handleChange(index, "name", e.target.value)}
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Телефон"
//                   variant="outlined"
//                   value={member.phone}
//                   onChange={(e) => handleChange(index, "phone", e.target.value)}
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   fullWidth
//                   select
//                   label="Роль"
//                   value={member.role}
//                   onChange={(e) => handleChange(index, "role", e.target.value)}
//                 >
//                   {roles.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Box mt={4} display="flex" justifyContent="space-between">
//         <Button variant="contained" startIcon={<AddIcon />} onClick={addStaff} color="primary">
//           Добавить сотрудника
//         </Button>
//         <Button variant="contained" color="success">
//           Сохранить
//         </Button>
//       </Box>
//     </Box>
//   );
// };
