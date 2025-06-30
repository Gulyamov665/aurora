import { Box, Card, Typography, TableContainer, Table, TableHead } from "@mui/material";
import { TableBody, Paper, TableSortLabel, TableCell, TableRow } from "@mui/material";
import { StaffViewProps } from "../types";
import { EditorType } from "@store/user/types";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const ListEmployee: React.FC<StaffViewProps> = ({ staffData }) => {
  return (
    <Box sx={{ maxWidth: 1200, width: "100%", mx: "auto", mt: 3 }}>
      <Card elevation={6} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom align={"center"} mb={2}>
          Сотрудники
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { label: "ID", field: "id" },
                  { label: "Имя", field: "first_name" },
                  { label: "Телефон", field: "phone" },
                  { label: "Роль", field: "role" },
                ].map((column) => (
                  <TableCell key={column.field}>
                    <TableSortLabel>{column.label}</TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="center">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffData?.editors.map((editor: EditorType) => (
                <TableRow key={editor.id}>
                  <TableCell>{editor.id}</TableCell>
                  <TableCell>
                    {editor.first_name} {editor.last_name}
                  </TableCell>
                  <TableCell>{editor.phone}</TableCell>
                  <TableCell>{editor.role_label}</TableCell>
                  <TableCell align="center">
                    <VisibilityIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
