import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Button } from "@mui/material";
import { ScheduleType } from "@store/user/types";
import { ScheduleListProps } from "../types";

export const ScheduleList: React.FC<ScheduleListProps> = ({ getSchedules, setonEditClick, setOpenAddModal }) => {
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
                  <ModeEditIcon onClick={() => setonEditClick(item.id)} sx={{ cursor: "pointer" }} />
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
