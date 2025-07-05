import { ProductData } from "@/apps/client/features/products/types";
import { AppDispatch, RootState } from ".";
import { ordersApi } from "./admin/api/orders";
import { CartData, CartItem } from "./user/types";

export const refreshCartOnLocationChange = (dispatch: AppDispatch, getState: () => unknown) => {
  const { authState } = getState() as RootState;
  const user = authState.isUser?.user_id;
  const vendorId = authState.vendorId ?? undefined;

  const sub = dispatch(
    ordersApi.endpoints.getCart.initiate({ user, vendorId, loc_change: true }, { forceRefetch: true })
  );
  sub.unsubscribe();
};

export const updateCartCache = (dispatch: AppDispatch, userId: number, vendorId: number, product: ProductData) => {
  dispatch(
    ordersApi.util.updateQueryData("getCart", { user: userId, vendorId }, (draft: CartData) => {
      if (!draft.products) draft.products = [];

      const existingProduct = draft.products.find((draftProduct) => {
        return (
          draftProduct.id === product.id &&
          ((draftProduct.options && product.options && draftProduct.options.id === product.options.id) ||
            (!draftProduct.options && !product.options))
        );
      });
      if (existingProduct?.options && product.options) {
        // Если продукт с опциями уже существует, обновляем количество
        if (existingProduct.options.id === product.options.id && existingProduct.quantity) {
          existingProduct.quantity += 1;
        } else {
          // Если опции разные, добавляем новый продукт
          draft.products.push(product);
        }
      } else if (existingProduct && existingProduct.quantity) {
        existingProduct.quantity += 1;
      } else {
        draft.products.push({ ...product, quantity: 1 });
      }
    })
  );
};

type DecreaseItemBody = {
  user_id: number;
  restaurant_id: number;
  product: CartItem;
};

export const decreaseProductInCache = (draft: CartData, newItem: DecreaseItemBody) => {
  const productIndex = draft?.products?.findIndex((product) => {
    return (
      product.id === newItem.product.id &&
      ((product.options && newItem.product.options && product.options.id === newItem.product.options.id) ||
        (!product.options && !newItem.product.options))
    );
  });

  if (productIndex === -1) return;

  const existingProduct = draft.products[productIndex];

  if (!existingProduct || !existingProduct.quantity) return;

  existingProduct.quantity -= 1;

  if (existingProduct.quantity <= 0) {
    draft.products.splice(productIndex, 1);
  }
};
