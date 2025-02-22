import { useRef, useState, FC, useCallback, useMemo } from "react";
import { useGetProductsQuery } from "@/store/user/api/productsApi";
import { useGetCategoriesQuery } from "@/store/user/api/categoryApi";
import { useGetPromosQuery } from "@/store/user/api/promoApi";
import { useParams, Link } from "react-router-dom";
import { CategoryProps } from "./types";
import { ProductType } from "./types";
import Card from "../card/Card";
import Loading from "../loading/Loading";
import CardView from "../card/CardView";
import Promo from "../../components/Promo";
import Navbar from "../navbar/Navbar";
import Products from "../products/Products";
import CartBtn from "../../components/CartBtn";

const Category: FC<CategoryProps> = ({ search }) => {
  const { res = "" } = useParams();
  const { data: category = [] } = useGetCategoriesQuery(res);
  const { data: menuItems = [], isLoading, isError } = useGetProductsQuery(res);
  const { data: promo = [] } = useGetPromosQuery(res);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const rootSection = useRef<HTMLDivElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [viewItem, setViewItem] = useState<ProductType | null>(null);
  const [count, setCount] = useState(1);

  const handleView = useCallback((item: ProductType) => {
    setIsOpen((prev) => !prev);
    setViewItem(item);
    setCount(1);
  }, []);

  const handleViewPromo = useCallback((item: ProductType) => {
    setIsOpen((prev) => !prev);
    setViewItem(item);
  }, []);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  }, [menuItems, search]);

  if (isLoading) return <Loading main={true} />;

  if (isError) {
    return <p>Error not found page </p>;
  }

  return (
    <>
      <Promo promo={promo} handleViewPromo={handleViewPromo} />
      <div className="sticky-top">
        <Navbar sectionRefs={sectionRefs} category={category} rootRef={rootSection} />
      </div>
      <div
        className="round"
        ref={(ref) => {
          if (ref) rootSection.current[0] = ref;
        }}
      >
        {search ? (
          filteredMenuItems.map((searchItem) => (
            <div key={searchItem.id} onClick={() => handleView(searchItem)}>
              <Card {...searchItem} />
            </div>
          ))
        ) : (
          <Products menuItems={menuItems} category={category} sectionRefs={sectionRefs} handleView={handleView} />
        )}
      </div>
      <CardView item={viewItem} open={isOpen} setIsOpen={setIsOpen} count={count} setCount={setCount} />
      <Link to={"orders"} style={{ color: "black" }}>
        <CartBtn />
      </Link>
    </>
  );
};

export default Category;
