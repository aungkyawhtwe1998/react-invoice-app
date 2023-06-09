import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  setDoc,
  getDocs,
} from "firebase/firestore";
import firestore from "../../../services/firebase";
import { InvoiceItem } from "./../../../types/invoice";

export const getAllInvoiceItems = (
  invoiceId: string,
  callback: (invoiceItems: InvoiceItem[]) => void,
  errorCallback: (error: Error) => void
) => {
  const invoiceItemsCollection = collection(
    firestore,
    "invoices",
    invoiceId,
    "items"
  );

  const unsubscribe = onSnapshot(
    invoiceItemsCollection,
    (querySnapshot) => {
      const invoiceItems: InvoiceItem[] = [];
      querySnapshot.forEach((doc) => {
        invoiceItems.push(doc.data() as InvoiceItem);
      });
      callback(invoiceItems);
    },
    (error) => {
      console.error("Error getting all invoice items:", error);
      errorCallback(new Error("Failed to get invoice items"));
    }
  );
  return unsubscribe;
};

export const getInvoiceItems = async (invoiceId: string) => {
  const invoiceItemsCollection = collection(
    firestore,
    "invoices",
    invoiceId,
    "items"
  );
  try {
    const querySnapshot = await getDocs(invoiceItemsCollection);
    const items = querySnapshot.docs.map((doc) => doc.data());
    return items;
  } catch (error) {
    console.log("Error getting documents: ", error);
    return [];
  }
};

export const addInvoiceItem = async (
  invoiceId: string,
  item: InvoiceItem
): Promise<string | { error: string }> => {
  const invoiceItemsCollection = collection(
    firestore,
    "invoices",
    invoiceId,
    "items"
  );
  const newInvoiceItemDoc = doc(invoiceItemsCollection);
  const addedInvoiceItemId = newInvoiceItemDoc.id;

  console.log(item);
  try {
    await setDoc(doc(invoiceItemsCollection, addedInvoiceItemId), {
      ...item,
      id: addedInvoiceItemId,
    });
    return addedInvoiceItemId;
  } catch (error) {
    console.error("Error adding invoice item:", error);
    return { error: "Failed to add invoice item" };
  }
};

export const updateInvoiceItem = async (
  invoiceId: string,
  updatedItemData: any
): Promise<string | { error: string }> => {
  const invoiceItemRef = doc(
    firestore,
    "invoices",
    invoiceId,
    "items",
    updatedItemData.id
  );
  try {
    await updateDoc(invoiceItemRef, updatedItemData);
    return updatedItemData.id;
  } catch (error) {
    console.error("Error updating invoice item:", error);
    return { error: "Failed to update invoice item" };
  }
};

export const deleteInvoiceItem = async (
  invoiceId: string,
  itemId: string
): Promise<string | { error: string }> => {
  const invoiceItemRef = doc(
    collection(firestore, "invoices", invoiceId, "items"),
    itemId
  );
  try {
    await deleteDoc(invoiceItemRef);
    console.log("Invoice item deleted successfully");
    return itemId;
  } catch (error) {
    console.error("Error deleting invoice item:", error);
    return { error: "Failed to delete invoice item" };
  }
};
