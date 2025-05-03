import { createContext, useState, useEffect } from "react";

import FetchHelper from "../fetch-helper.js";

export const CategoryListContext = createContext();

function CategoryListProvider({ children }) {
  const [categoryListDto, setCategoryListDto] = useState({
    state: "ready", // ready / pending / error
    data: null,
    error: null,
  });

  console.log(categoryListDto);

  async function handleLoad() {
    setCategoryListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.category.list();
    setCategoryListDto((current) => {
      if (result.ok) {
        return {
          ...current,
          state: "ready",
          data: result.data,
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
  }

  async function handleCreate(dtoIn) {
    setCategoryListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.category.create(dtoIn);
    setCategoryListDto((current) => {
      if (result.ok) {
        current.data.itemList.push(result.data);
        return {
          ...current,
          state: "ready",
          data: { itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
  }

  async function handleUpdate(dtoIn) {
    setCategoryListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.category.update(dtoIn);
    setCategoryListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList[itemIndex] = dtoIn;
        return {
          ...current,
          state: "ready",
          data: { itemList: current.data.itemList.slice() },
          error: null,
          pendingId: undefined,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
          pendingId: undefined,
        };
      }
    });
  }

  async function handleDelete(dtoIn) {
    setCategoryListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.category.delete(dtoIn);
    setCategoryListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList.splice(itemIndex, 1);
        return {
          ...current,
          state: "ready",
          data: { itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  useEffect(() => {
    handleLoad();
  }, []);

  const value = {
    ...categoryListDto,
    handlerMap: { handleLoad, handleCreate, handleUpdate, handleDelete },
  };

  return (
    <CategoryListContext.Provider value={value}>
      {children}
    </CategoryListContext.Provider>
  );
}

export default CategoryListProvider;
