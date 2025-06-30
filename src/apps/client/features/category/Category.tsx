import { useRef, useState, FC, useCallback, useMemo } from "react";
import { useGetProductsQuery } from "@/store/admin/api/productsApi";
import { useGetCategoriesQuery } from "@/store/admin/api/categoryApi";
// import { useGetPromosQuery } from "@/store/admin/api/promoApi";
import { useParams, Link } from "react-router-dom";
import { CategoryProps } from "./types";
import { ProductType } from "./types";
import { Products } from "../products/Products";
import Loading from "../loading/Loading";
import CardView from "../card/CardView";
// import Promo from "../promo/Promo";
import Navbar from "../navbar/Navbar";
import CartBtn from "../../components/CartBtn";

const Category: FC<CategoryProps> = ({ search }) => {
  const { res = "" } = useParams();
  const { data: category = [] } = useGetCategoriesQuery(res);
  const { data: menuItems = [], isLoading } = useGetProductsQuery({ res: res });
  // const { data: promo = [] } = useGetPromosQuery(res);

  const [isOpen, setIsOpen] = useState(false);
  const [viewItem, setViewItem] = useState<ProductType | null>(null);
  const [count, setCount] = useState(1);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const rootSection = useRef<HTMLDivElement[]>([]);

  const handleView = useCallback((item: ProductType) => {
    setIsOpen((prev) => !prev);
    setViewItem(item);
    setCount(1);
  }, []);

  // const handleViewPromo = useCallback((item: ProductType) => {
  //   setIsOpen((prev) => !prev);
  //   setViewItem(item);
  // }, []);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item: ProductType) => item.name.toLowerCase().includes(search.toLowerCase()));
  }, [menuItems, search]);

  if (isLoading) return <Loading main={true} />;

  return (
    <>
      {/* <Promo promo={promo} handleViewPromo={handleViewPromo} /> */}
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
          filteredMenuItems.map((searchItem: ProductType) => (
            <div key={searchItem.id} onClick={() => handleView(searchItem)}>
              {/* <Card {...searchItem} /> */}
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
