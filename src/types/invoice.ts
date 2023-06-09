export interface Invoice {
  id: string;
  name: string;
  tax: number;
  subTotal: number;
  total: number;
  createdAt?: string;
  items?:InvoiceItem[];
}

export interface InvoiceItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  createdAt?: string;
}
