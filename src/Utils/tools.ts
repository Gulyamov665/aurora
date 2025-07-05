import { CartItem, NominatimReverseResponse } from "@store/user/types";
import { ChangeEvent } from "react";
import { AddToCartArgs } from "./types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

/**
 * функция для отображения фото
 * @param {ChangeEvent<HTMLInputElement>} e - Событие изменения файла.
 * @param {(file: File | null) => void} setFile - Функция для установки файла в состояние.
 * @param {(img: string | ArrayBuffer | null) => void} setImg - Функция для установки изображения в состояние.
 */

export const showImage = (
  e: ChangeEvent<HTMLInputElement>,
  setFile: (file: Blob | null) => void,
  setImg: (img: string | ArrayBuffer | null) => void
) => {
  const file = e.target.files?.[0];
  if (file) {
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

/**
 * Форматирует число в строку с разделением тысяч пробелами.
 * @param {number} price - Число, которое нужно отформатировать.
 * @returns {string} Отформатированная строка, где тысячи разделены пробелами.
 *
 * @example
 * formatPrice(20000); // "20 000"
 * formatPrice(100000); // "100 000"
 * formatPrice(1000000); // "1 000 000"
 */

export const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const handleAddToCart = async ({
  event,
  productData,
  quantity,
  userId,
  restaurantId,
  addToCart,
  trigger,
  cart_id,
}: AddToCartArgs) => {
  try {
    event.stopPropagation();

    const cartItem: CartItem = {
      ...productData,
      quantity: quantity,
    };

    const body = {
      user_id: userId,
      restaurant: restaurantId,
      products: cartItem,
      cart_id,
    };

    try {
      await (addToCart(body) as any).unwrap();
    } catch (error) {
      const err = error as FetchBaseQueryError | SerializedError;
      if ("data" in err) {
        trigger?.();
      }
    }
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    // Можно сюда передать колбэк для алерта/тоаста
  }
};

export const formatAddress = (address: NominatimReverseResponse["address"]) => {
  const parts = [
    address?.road,
    address?.house_number,
    address?.amenity,
    address?.neighbourhood,
    address?.suburb,
    address?.village,
  ];
  // Оставим только непустые значения
  const validParts = parts.filter(Boolean);
  return validParts.length > 0 ? validParts.join(", ") : address.city;
};

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift()!;
  return null;
};

type Product = {
  id: number;
  name: string;
  [key: string]: any; // если есть другие поля
};

type MenuData = {
  [category: string]: Product[];
};

export const findProductById = (data: MenuData, targetId: number): Product | null => {
  for (const category in data) {
    const products: Product[] = data[category];
    if (Array.isArray(products)) {
      const found: Product | undefined = products.find((product: Product) => product.id === targetId);
      if (found) return found;
    }
  }
  return null; // если не найден
};
