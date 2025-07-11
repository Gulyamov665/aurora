import { DeliveryRulesMain } from "../components/DeliveryRulesMain";
import { useAddDeliveryRuleMutation, useDeleteDeliveryRuleMutation, useToggleActiveDeliveryRuleMutation } from "@store/admin/api/delivery";
import { useGetDeliverRulesByRestaurantQuery, useUpdateDeliveryRuleMutation } from "@store/admin/api/delivery";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "@/apps/client/pages";

export const DeliveryRules = () => {
  const { data: vendorData } = useOutletContext<OutletContextType>();
  const { data: rules } = useGetDeliverRulesByRestaurantQuery(vendorData?.id ?? 0, { skip: !vendorData?.id });
  const [addDeliveryRule] = useAddDeliveryRuleMutation();
  const [updateDeliveryRule] = useUpdateDeliveryRuleMutation();
  const [deleteDeliveryRule] = useDeleteDeliveryRuleMutation();
  const [toggleActiveDeliveryRule] = useToggleActiveDeliveryRuleMutation()

  return (
    <>
      <DeliveryRulesMain
        rules={rules}
        addDeliveryRule={addDeliveryRule}
        vendorData={vendorData}
        updateDeliveryRule={updateDeliveryRule}
        deleteDeliveryRule={deleteDeliveryRule}
        toggleActiveDeliveryRule={toggleActiveDeliveryRule}
      />
    </>
  );
};
