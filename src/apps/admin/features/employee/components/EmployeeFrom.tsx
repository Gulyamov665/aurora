import React from "react";
import { Box, Card, Grid, Typography, CardContent } from "@mui/material";
import { MenuItem, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, Fade, Select } from "@mui/material";
import { Person } from "@mui/icons-material";
import { FormStaffProps } from "../types";
import { Controller } from "react-hook-form";

export const EmployeeFrom: React.FC<FormStaffProps> = ({ rolesData, handleSubmit, submit, control }) => {
  return (
    <Card elevation={6} sx={{ p: 3, mb: 5 }}>
      <Typography variant="h5" gutterBottom align={"center"} mb={2}>
        Добавить персонала
      </Typography>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item xs={12} md={6} lg={10}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "0.3s",
              ":hover": { boxShadow: "0 6px 16px rgba(0,0,0,0.12)" },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Person sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Сотрудник</Typography>
              </Box>
              <Controller
                name="first_name"
                defaultValue=""
                control={control}
                rules={{
                  required: "Это обязательное поле",
                }}
                render={({ fieldState, field }) => (
                  <FormControl fullWidth variant="outlined" error={!!fieldState.error}>
                    <InputLabel htmlFor="first_name">Имя</InputLabel>
                    <OutlinedInput id="first_name" label="Имя" {...field} />
                    <Fade
                      in={!!fieldState.error}
                      timeout={{ enter: 500, exit: 300 }}
                      style={{ height: 20 }}
                      unmountOnExit={false}
                    >
                      <FormHelperText sx={{ marginTop: 0 }}>{fieldState.error?.message}</FormHelperText>
                    </Fade>
                  </FormControl>
                )}
              />
              <Controller
                name="last_name"
                defaultValue=""
                control={control}
                rules={{
                  required: "Это обязательное поле",
                }}
                render={({ fieldState, field }) => (
                  <FormControl fullWidth variant="outlined" error={!!fieldState.error}>
                    <InputLabel htmlFor="last_name">Фамилия</InputLabel>
                    <OutlinedInput id="last_name" label="Фамилия" {...field} />
                    <Fade
                      in={!!fieldState.error}
                      timeout={{ enter: 500, exit: 300 }}
                      style={{ height: 20 }}
                      unmountOnExit={false}
                    >
                      <FormHelperText sx={{ marginTop: 0 }}>{fieldState.error?.message}</FormHelperText>
                    </Fade>
                  </FormControl>
                )}
              />

              <Controller
                name="phone"
                defaultValue=""
                control={control}
                rules={{
                  required: "Это обязательное поле",
                }}
                render={({ fieldState, field }) => (
                  <>
                    <FormControl fullWidth variant="outlined" error={!!fieldState.error}>
                      <InputLabel htmlFor="phone">Телефон</InputLabel>
                      <OutlinedInput id="phone" label="Телефон" {...field} />
                      <Fade
                        in={!!fieldState.error}
                        timeout={{ enter: 500, exit: 300 }} // например, 500мс при появлении и 300мс при скрытии
                        style={{ height: 20 }}
                        unmountOnExit={false}
                      >
                        <FormHelperText sx={{ marginTop: 0 }}>{fieldState.error?.message}</FormHelperText>
                      </Fade>
                    </FormControl>
                  </>
                )}
              />
              <Controller
                name="password_1"
                defaultValue=""
                control={control}
                rules={{
                  required: "Это обязательное поле",
                }}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth variant="outlined" error={!!fieldState.error}>
                    <InputLabel htmlFor="password_1">Пароль</InputLabel>
                    <OutlinedInput id="password_1" label="Пароль" {...field} />
                    <Fade
                      in={!!fieldState.error}
                      timeout={{ enter: 500, exit: 300 }} // например, 500мс при появлении и 300мс при скрытии
                      style={{ height: 20 }}
                      unmountOnExit={false}
                    >
                      <FormHelperText sx={{ marginTop: 0 }}>{fieldState.error?.message}</FormHelperText>
                    </Fade>
                  </FormControl>
                )}
              />
              <Controller
                name="password_2"
                defaultValue=""
                control={control}
                rules={{
                  required: "Это обязательное поле",
                }}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth variant="outlined" error={!!fieldState.error}>
                    <InputLabel htmlFor="password_2">Повторите пароль</InputLabel>
                    <OutlinedInput id="password_2" label="Повторите пароль" {...field} />
                    <Fade
                      in={!!fieldState.error}
                      timeout={{ enter: 500, exit: 300 }} // например, 500мс при появлении и 300мс при скрытии
                      style={{ height: 20 }}
                      unmountOnExit={false}
                    >
                      <FormHelperText sx={{ marginTop: 0 }}>{fieldState.error?.message}</FormHelperText>
                    </Fade>
                  </FormControl>
                )}
              />
              <Controller
                name="role"
                control={control}
                defaultValue={rolesData && rolesData?.length > 0 ? rolesData[0].id : ""}
                rules={{
                  required: "Это обязательное поле",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <FormControl fullWidth variant="outlined" error={!!fieldState.error}>
                      <InputLabel htmlFor="role">Роль</InputLabel>

                      <Select label="Роль" {...field} labelId="role-label" id="role">
                        {(!rolesData || rolesData.length === 0) && <MenuItem value="">Нет ролей</MenuItem>}
                        {rolesData?.map((option) => (
                          <MenuItem disabled={option.role === "is_director"} key={option.id} value={option.id}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <Fade
                        in={!!fieldState.error}
                        timeout={{ enter: 500, exit: 300 }} // например, 500мс при появлении и 300мс при скрытии
                        style={{ height: 20 }}
                        unmountOnExit={false}
                      >
                        <FormHelperText sx={{ marginTop: 0 }}>{fieldState.error?.message}</FormHelperText>
                      </Fade>
                    </FormControl>
                  </>
                )}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={4} display="flex" justifyContent={"space-around"}>
        <Button variant="contained" color="success" onClick={handleSubmit(submit)}>
          Сохранить
        </Button>
      </Box>
    </Card>
  );
};
