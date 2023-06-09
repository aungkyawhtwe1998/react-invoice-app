import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import db from "../../../services/firebase";
import { Invoice } from "../../../types/invoice";
import { getInvoiceItems } from "./items";
export const getNewInvoiceDoc = (): string => {
  console.log("getting id ...");
  const invoiceCollectionRef = collection(db, "invoices");
  console.log("inv id", doc(invoiceCollectionRef).id);
  return doc(invoiceCollectionRef).id;
};
export const getAllInvoices = (
  callback: (invoices: Invoice[]) => void,
  errorCallback: (error: Error) => void
) => {
  const invoicesCollection = collection(db, "invoices");
  const unsubscribe = onSnapshot(
    invoicesCollection,
    async (querySnapshot) => {
      const invoiceItems: Invoice[] = [];
      for (const doc of querySnapshot.docs) {
        const items = await getInvoiceItems(doc.data().id);
        const invoice = { ...doc.data(), items };
        console.log(invoice.items);
        invoiceItems.push(invoice as Invoice);
      }
      callback(invoiceItems);
    },
    (error) => {
      console.error("Error getting all invoice:", error);
      errorCallback(new Error("Failed to get invoices"));
    }
  );
  return unsubscribe;
};

export const getInvoice = (
  invoiceId: string,
  callback: (invoice: Invoice) => void,
  errorCallback: (error: Error) => void
) => {
  const invoicesCollection = collection(db, "invoices");
  const invoiceDoc = doc(invoicesCollection, invoiceId);
  const unsubscribe = onSnapshot(
    invoiceDoc,
    (snapshot) => {
      callback(snapshot.data() as Invoice);
    },
    (error) => {
      console.error("Error getting invoice:", error);
      errorCallback(new Error("Failed to get invoice"));
    }
  );
  return unsubscribe;
};
export const addInvoice = async (
  invoiceData: Invoice
): Promise<string | { error: string }> => {
  console.log(invoiceData);
  const invoicesCollection = collection(db, "invoices");
  const invoiceDoc = doc(invoicesCollection, invoiceData.id);
  const createdAt = serverTimestamp();
  try {
    await setDoc(invoiceDoc, {
      ...invoiceData,
      createdAt,
    });
    return invoiceData.id;
  } catch (error) {
    console.error("Error adding invoice:", error);
    return { error: "Failed to add invoice item" };
  }
};

export const updateInvoice = async (
  invoiceId: string,
  updatedData: any
): Promise<any> => {
  console.log("update...", updatedData);
  const invoiceRef = doc(db, "invoices", invoiceId);
  const createdAt = serverTimestamp();
  try {
    await setDoc(invoiceRef, { ...updatedData, createdAt });
    const updateInvoiceRef = await getDoc(invoiceRef);
    return updateInvoiceRef;
  } catch (error) {
    console.error("Error updating invoice:", error);
    throw new Error("Failed to update invoice");
  }
};

export const deleteInvoice = async (invoiceId: string) => {
  const invoiceRef = doc(db, "invoices", invoiceId);

  try {
    const deleteInvoice = await deleteDoc(invoiceRef);
    return deleteInvoice;
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw new Error("Failed to delete invoice");
  }
};
