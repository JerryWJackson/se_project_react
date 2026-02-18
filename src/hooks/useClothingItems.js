import { useState, useEffect, useContext } from "react";
import * as api from "../utils/api";
import { ModalContext } from "../contexts/ModalContext";

export function useClothingItems() {
  const [clothingItems, setClothingItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const { handleCloseModal } = useContext(ModalContext);

  useEffect(() => {
    api
      .fetchAllClothing()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Error: An error occurred", error);
      });
  }, []);

  const handleAddItem = (values) => {
    setItemsLoading(true);
    api
      .addNewItem(values)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setItemsLoading(false));
  };

  const handleDeleteItem = (id) => {
    setItemsLoading(true);
    api
      .deleteItem(id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        handleCloseModal();
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setItemsLoading(false));
  };

  return { clothingItems, handleAddItem, handleDeleteItem, itemsLoading };
}
