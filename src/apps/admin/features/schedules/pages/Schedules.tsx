import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box, Tooltip } from "@mui/material";

interface ScheduleItem {
  day: string;
  open_time: string | null;
  close_time: string | null;
}

interface RestaurantScheduleProps {
  schedule: ScheduleItem[];
}

const dayMap: { [key: string]: string } = {
  MONDAY: "Понедельник",
  TUESDAY: "Вторник",
  WEDNESDAY: "Среда",
  THURSDAY: "Четверг",
  FRIDAY: "Пятница",
  SATURDAY: "Суббота",
  SUNDAY: "Воскресенье",
};

export const schedule = [
  { day: "MONDAY", open_time: "09:00", close_time: "18:00" },
  { day: "TUESDAY", open_time: "09:00", close_time: "18:00" },
  { day: "WEDNESDAY", open_time: "09:00", close_time: "18:00" },
  { day: "THURSDAY", open_time: "10:00", close_time: "17:00" },
  { day: "FRIDAY", open_time: "10:00", close_time: "16:00" },
  { day: "SATURDAY", open_time: null, close_time: null }, // выходной
  { day: "SUNDAY", open_time: null, close_time: null }, // выходной
];

export const Schedules: React.FC<RestaurantScheduleProps> = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 5 }}>
      <Card elevation={6} sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            График работы ресторана
          </Typography>
          <List disablePadding>
            {schedule.map((item, index) => (
              <Box key={item.day}>
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
                      primary={dayMap[item.day.toUpperCase()] || item.day}
                      secondary={
                        item.open_time && item.close_time ? `${item.open_time} - ${item.close_time}` : "Выходной"
                      }
                    />
                  </Tooltip>
                  ;
                  <ModeEditIcon />
                </ListItem>
                {index < schedule.length - 1 && <Divider component="li" />}
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};
