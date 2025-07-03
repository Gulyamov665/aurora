import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Tooltip, Button } from "@mui/material";
import { ScheduleType } from "@store/user/types";
import { ScheduleListProps } from "../types";

export const ScheduleList: React.FC<ScheduleListProps> = ({ getSchedules, setonEditClick }) => {
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
                  <Tooltip
                    title={`Время работы ресторана по данному графику ${
                      item.open_time && item.close_time
                        ? (item.close_time.split(":").reduce((h, m) => +h * 60 + +m, 0) -
                            item.open_time.split(":").reduce((h, m) => +h * 60 + +m, 0)) /
                          60
                        : 0
                    } часов`}
                  >
                    <ListItemText
                      primary={item.day_display}
                      secondary={
                        item.open_time && item.close_time
                          ? `${item.open_time} - ${item.close_time}`
                          : ("Выходной" as string)
                      }
                    />
                  </Tooltip>
                  <ModeEditIcon onClick={() => setonEditClick(item.id)} sx={{ cursor: "pointer" }} />
                </ListItem>
                <hr />
              </Box>
            ))}
          </List>
          <CardContent sx={{ display: "flex", justifyContent: "end" }}>
            <Button variant="contained">Создать график</Button>
          </CardContent>
        </CardContent>
      </Card>
    </Box>
  );
};
