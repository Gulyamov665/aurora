import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Button, Tooltip, IconButton } from "@mui/material";
import { ScheduleType } from "@store/user/types";
import { ScheduleListProps } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';

export const ScheduleList: React.FC<ScheduleListProps> = ({ getSchedules, setonEditClick, setOpenAddModal, deleteItem }) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5 }}>
      <Card elevation={6} sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            График работы ресторана
          </Typography>
          <List disablePadding>
            {getSchedules?.map((item: ScheduleType) => (
              <Box key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.day_display}
                    secondary={
                      item.open_time && item.close_time
                        ? `${item.open_time} - ${item.close_time}`
                        : ("Выходной" as string)
                    }
                  />
                  <Tooltip title="Дейстаие">
                  <VisibilityIcon color="action" onClick={() => setonEditClick(item.id)} sx={{ cursor: "pointer", mr:"10px" }} />
                    </Tooltip>
                <Tooltip title="Удалить">
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() =>
                      deleteItem({ id: item.id, message: `удалить правило: ${item.day_display +" | "+ item.open_time + " — " + item.close_time}`, type: "deleteRule" })
                    }
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
                </ListItem>
                <hr />
              </Box>
            ))}
          </List>
          <CardContent sx={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={() => setOpenAddModal(true)} variant="contained">
              Создать график
            </Button>
          </CardContent>
        </CardContent>
      </Card>
    </Box>
  );
};
