import { ChangeEvent } from "react";

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
