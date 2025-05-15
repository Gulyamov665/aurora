import { Alert, Box, Snackbar } from "@mui/material";
import React, { useEffect } from "react";
import { AddStaffProps, DataType } from "../types";
import { FromStaff } from "./FromStaff";
import { SubmitHandler, useForm } from "react-hook-form";

export const AddStaff: React.FC<AddStaffProps> = ({ addStaff, rolesData, getRoles, vendor }) => {
  const { register, handleSubmit, reset, control } = useForm<DataType>();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    requestTrigger();
  }, []);

  const requestTrigger = async () => {
    await getRoles();
  };

  const submit: SubmitHandler<DataType> = async (data) => {
    try {
      data.restaurant_id = vendor.id;
      console.log(data);
      await addStaff(data).unwrap();
      setOpen(true);
      reset();
    } catch (error) {
      alert("Ошибка при добавлении сотрудников");
    }
  };

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ maxWidth: 1200, width: "100%", mx: "auto", mt: 3, minHeight:"90%" }}>
        <FromStaff
          rolesData={rolesData}
          register={register}
          handleSubmit={handleSubmit}
          submit={submit}
          control={control}
        />
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Сотрудник успешно добавлен!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
