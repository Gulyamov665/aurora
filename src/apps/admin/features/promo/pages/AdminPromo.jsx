import React from "react";
import styles from "../assets/AdminPromo.module.scss";
import { useDeletePromoMutation, useUpdatePromoMutation } from "@store/admin/api/promoApi";
import { useGetPromosQuery } from "@store/admin/api/promoApi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Promos from "../components/Promos";
import PromoList from "../components/PromoList";

const AdminPromo = () => {
  const { res } = useParams();
  const { data: promo = [], isLoading } = useGetPromosQuery(res);
  const [updatePromos] = useUpdatePromoMutation();
  const [deletePromo, { isLoading: deleteLoading }] = useDeletePromoMutation();

  //Toggle update function
  const updatePromo = async (item) => {
    delete item.photo;
    const updatePromo = {
      ...item,
      is_active: !item.is_active,
    };
    await updatePromos({
      body: updatePromo,
      id: item.id,
    }).unwrap();
  };

  return (
    <div className={`${styles.container_promo}`}>
      <div className={`${styles.add_promo}`}>
        <Link to={`/admin/${res}/add-promo`} style={{ textDecoration: "none", color: "black" }}>
          <p className="text-center">Добавить</p>
        </Link>
      </div>

      <Promos data={promo} updatePromo={updatePromo} />
      <PromoList promos={promo} updatePromo={updatePromo} deletePromo={deletePromo} />
    </div>
  );
};

export default AdminPromo;
