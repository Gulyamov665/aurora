import React from "react";
import { FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper, IconButton, Chip, Box, Button, Typography } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import { DeliveryRulesListProps, IToggleActive } from "../types";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IOSSwitch from "@/apps/client/components/MuiSwitch";
import { useActions } from "@/hooks/useActions";

const DeliveryRulesList: React.FC<DeliveryRulesListProps> = ({
  rules,
  onEyeClick,
  setOpenAddModal,
  deleteItem,
  toggleActiveDeliveryRule,
}) => {
  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  const { snack } = useActions();

  const toggleActive: IToggleActive = async (id, is_active, color, message) => {
    await toggleActiveDeliveryRule({ id, is_active }).unwrap(), snack({ open: true, color, message });
  };

  return (
    <Box sx={{ maxWidth: 1200, width: "100%", mx: "auto", mt: 3 }}>
      <>
        <Typography variant="h5" gutterBottom align={"center"} mt={3} mb={2}>
          Правило Доставки
        </Typography>
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, p: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Название</TableCell>
                <TableCell>Правило</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Активность</TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rules?.map((rule) => (
                <TableRow
                  key={rule.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#fafafa",
                    },
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                    "& > *": { borderBottom: "unset" }, // убираем внутренние бордеры
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>{rule.name}</Typography>
                  </TableCell>

                  {rule.calculation_type === "per_km" && (
                    <BootstrapTooltip
                      key={rule.id}
                      title={rule.description
                        ?.replace(/\n/g, " ")
                        .replace("доставка будет бесплатным", "доставка будет бесплатной")}
                      placement="bottom"
                    >
                      <TableCell>{rule.price_per_km} сум за км</TableCell>
                    </BootstrapTooltip>
                  )}
                  {rule.calculation_type === "percent" && (
                    <BootstrapTooltip
                      key={rule.id}
                      title={rule.description
                        ?.replace(/\n/g, " ")
                        .replace("доставка будет бесплатным", "доставка будет бесплатной")}
                      placement="bottom"
                    >
                      <TableCell>{rule.price_per_percent}% от суммы заказа</TableCell>
                    </BootstrapTooltip>
                  )}
                  <TableCell>
                    <Chip
                      label={rule.is_active ? "Активно" : "Неактивно"}
                      color={rule.is_active ? "success" : "error"}
                      size="small"
                      icon={rule.is_active ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {rule.is_active === true && (
                      <Tooltip title={"Невозможно отключить активный правило, чтобы его отключить включите другую."}>
                        <FormControlLabel
                          label="Активность"
                          control={
                            <IOSSwitch
                              checked={rule.is_active}
                              onChange={() =>
                                snack({
                                  open: true,
                                  color: "warning",
                                  message:
                                    "Невозможно отключить активный правило, чтобы его отключить включите другое.",
                                })
                              }
                            />
                          }
                        />
                      </Tooltip>
                    )}
                    {rule.is_active === false && (
                      <FormControlLabel
                        label="Активность"
                        control={
                          <IOSSwitch
                            checked={rule.is_active}
                            onChange={() =>
                              toggleActive(rule.id, !rule.is_active, "success", "Правило успешно активировано")
                            }
                          />
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Действия">
                      <IconButton aria-label="edit" color="default" onClick={() => onEyeClick(rule.id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    {rule.is_active === true && (
                      <Tooltip title="Удалить">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() =>
                            snack({
                              open: true,
                              color: "warning",
                              message: "Невозможно удалить активный правило, чтобы удалить активируйте другое правило.",
                            })
                          }
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {rule.is_active === false && (
                      <Tooltip title="Удалить">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() =>
                            deleteItem({ id: rule.id, message: `удалить правило: ${rule.name}`, type: "deleteRule" })
                          }
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddModal(true)}
              sx={{ borderRadius: 2, textTransform: "none", boxShadow: 3 }}
            >
              Создать правило
            </Button>
          </Box>
        </TableContainer>
      </>
    </Box>
  );
};

export default DeliveryRulesList;
