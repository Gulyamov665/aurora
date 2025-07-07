import React from "react";
import DeliveryRulesList from "./DeliveryRulesList";
import { DeliveryRuleFormValues, DeliveryRulesMainProps } from "../types";
import { MaterialModal } from "@/apps/common/Modal";
import { DeliveryRulesEdit } from "./DeliveryRulesEdit";
import { DeliveryRulesAdd } from "./DeliveryRulesAdd";
import { FormProvider, useForm } from "react-hook-form";
import { DeliveryRuleType } from "@store/user/types";
import { useDelete } from "@/hooks/useDelete";
import { useActions } from "@/hooks/useActions";

export const DeliveryRulesMain: React.FC<DeliveryRulesMainProps> = ({
  rules,
  addDeliveryRule,
  vendorData,
  updateDeliveryRule,
  deleteDeliveryRule,
  toggleActiveDeliveryRule,
}) => {
  
  const [openModal, setOpenModal] = React.useState(false);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [selectedRule, setSelectedRule] = React.useState<DeliveryRuleType | null>(null);
  const { deleteItem, confirmedId } = useDelete();
  const { snack } = useActions();

  React.useEffect(() => {
    if (confirmedId) {
      deleteDeliveryRule(confirmedId).unwrap();
      snack({ open: true, color: "warning", message: "Правило успешно удалена" });
    }
  }, [confirmedId]);

  const formMethods = useForm<DeliveryRuleFormValues>({
    defaultValues: {
      restaurant: 0,
      name: "",
      description: "",
      calculation_type: "",
      min_distance: 0,
      max_distance: 0,
      price_per_km: null,
      fixed_price: null,
      price_per_percent: null,
      max_order_price_for_free_delivery: null,
      is_active: false,
    },
  });


  const onEditSubmit = async (data: DeliveryRuleFormValues) => {
    data.restaurant = vendorData.id;
    await updateDeliveryRule({ body: data, id: selectedRule?.id });
    setOpenModal(false);
    snack({ open: true, color: "success", message: "Правило успешно обновлена" });

    formMethods.reset();
  };

  if (!rules) return;
  const onEyeClick = async (id: number) => {
    const rule = rules.find((r) => r.id === id);
    if (!rule) return;
    const ruleToEdit: DeliveryRuleFormValues = {
      ...rule,
      restaurant: Number(rule.restaurant),
    };
    formMethods.reset(ruleToEdit);
    setSelectedRule(rule);
    setOpenModal(true);
  };

  return (
    <>
      <DeliveryRulesList
        rules={rules}
        onEyeClick={onEyeClick}
        setOpenAddModal={setOpenAddModal}
        deleteItem={deleteItem}
        toggleActiveDeliveryRule={toggleActiveDeliveryRule}
      />

      <MaterialModal open={openModal} onClose={() => setOpenModal(false)}>
        <FormProvider {...formMethods}>
          <DeliveryRulesEdit onSubmit={onEditSubmit} />
        </FormProvider>
      </MaterialModal>

      <MaterialModal open={openAddModal} onClose={() => setOpenAddModal(false)} width="50%">
          <DeliveryRulesAdd addDeliveryRule={addDeliveryRule} setOpenAddModal={setOpenAddModal} vendorData={vendorData}/>
      </MaterialModal>
    </>
  );
};
