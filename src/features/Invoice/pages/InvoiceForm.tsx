import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import CreateInvoiceItem from "../components/CreateInvoiceItem";
import { Invoice, InvoiceItem } from "../../../types/invoice";
import { addInvoice, getInvoice, updateInvoice } from "../services/invoice";
import {
  addInvoiceItem,
  deleteInvoiceItem,
  getAllInvoiceItems,
  updateInvoiceItem,
} from "../services/items";
import { useNavigate, useParams } from "react-router-dom";
import UpdateInvoiceItem from "../components/UpdateInvoiceItem";
import { useAlert } from "../../../context/alert/AlertContext";
import { BoxArrowRight } from "react-bootstrap-icons";
const initialInvoice: Invoice = {
  id: "",
  name: "",
  tax: 0,
  subTotal: 0,
  total: 0,
};
const ParentComponent: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice>(initialInvoice);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [invoiceName, setInvoiceName] = useState<string>("");
  const { id } = useParams();
  const [tax, setTax] = useState<number>(0);
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = getAllInvoiceItems(
          id as string,
          (items) => {
            setItems(items);
          },
          (error) => {
            showAlert(error.message as string, "danger");
          }
        );
        return () => {
          unsubscribe();
        };
      } catch (error) {
        const err = error as Error;
        showAlert(err.message, "danger");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = getInvoice(
          id as string,
          (invoice) => {
            if (invoice) {
              setInvoice(invoice);
              setInvoiceName(invoice.name);
              setTax(invoice.tax);
            }
          },
          (error) => {
            showAlert(error.message as string, "danger");
          }
        );
        return () => {
          unsubscribe();
        };
      } catch (error) {
        const err = error as Error;
        showAlert(err.message, "danger");
      }
    };
    fetchData();
  }, []);

  console.log("items", items);

  const handleCreateItem = (item: InvoiceItem) => {
    const result = addInvoiceItem(id!, item);
    if (result) {
      if ("error" in result) {
        showAlert(result.error as string, "danger");
      } else {
        handleUpdateInvoice(item.total);
        showAlert("Item Added Successfully", "success");
      }
    }
  };

  const handleUpdateInvoice = (amount: number) => {
    const newSubTotal = invoice.subTotal + amount;
    const taxAmount = newSubTotal * (tax / 100);
    const newTotal = newSubTotal + taxAmount;

    const invoiceUpdate = {
      id: id as string,
      name: invoiceName,
      tax: tax,
      subTotal: newSubTotal,
      total: newTotal,
    };
    updateInvoice(id as string, invoiceUpdate);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceName(event.target.value);
  };

  const handleSubmitInvoice = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = addInvoice(invoice);
    if ("error" in result) {
      showAlert(result.error as string, "danger");
    } else {
      showAlert("Invoice Saved Successfully", "success");
      navigate("/");
    }
  };

  const handleDeleteItem = (itemId: string) => {
    const result = deleteInvoiceItem(id!, itemId);
    console.log(result);
    if ("error" in result) {
      showAlert(result.error as string, "danger");
    } else {
      const invoice = items.filter((item) => item.id === itemId);
      handleUpdateInvoice(-invoice[0].total);
      showAlert("Item Deleted Successfully", "success");
    }
  };

  const handleEditItem = (item: InvoiceItem) => {
    const result = updateInvoiceItem(id!, item);
    handleUpdateInvoice(item.total);
    if ("error" in result) {
      console.log("Result error", result.error);
      showAlert(result.error as string, "danger");
    } else {
      showAlert("Item Updated Successfully", "success");
    }
  };
  const handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTax(Number(event.target.value));
    const taxAmount = invoice.subTotal * (tax / 100);
    const newTotal = invoice.subTotal + taxAmount;

    const invoiceUpdate = {
      id: id as string,
      name: invoiceName,
      tax: Number(event.target.value),
      subTotal: invoice.subTotal,
      total: newTotal,
    };
    updateInvoice(id as string, invoiceUpdate);
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h2>Create Invoice</h2>
          <Form onSubmit={handleSubmitInvoice}>
            <Stack
              direction="horizontal"
              className="justify-content-between align-items-end">
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={invoiceName}
                  onChange={handleNameChange}
                  required
                />
              </Form.Group>

              <Button
                variant="outline-primary"
                type="submit">
                <BoxArrowRight />
                <span className="ms-1">Save and Exit</span>
              </Button>
            </Stack>
          </Form>
        </Col>

        <Col
          xs={12}
          className="mt-5">
          <Stack
            direction="horizontal"
            className="align-items-end"
            gap={2}>
            <div style={{ width: "250px" }}>
              <span>Name</span>
            </div>
            <div style={{ width: "250px" }}>
              <span>Qty</span>
            </div>
            <div style={{ width: "250px" }}>
              <span>Price</span>
            </div>
            <div style={{ width: "250px" }}>
              <span>Amount</span>
            </div>
          </Stack>
          {items?.map((item) => (
            <div key={item.id}>
              {" "}
              <UpdateInvoiceItem
                item={item}
                onDelete={handleDeleteItem}
                onEdit={handleEditItem}
              />
            </div>
          ))}
        </Col>

        <Col
          xs={12}
          className="my-5">
          <CreateInvoiceItem onCreateItem={handleCreateItem} />
        </Col>
        <Col
          xs={12}
          className="border-top">
          <Stack className="float-end text-end">
            <h5>SubTotal: {invoice?.subTotal}</h5>

            <Stack
              direction="horizontal"
              className=" text-end my-2">
              <h5>Tax %</h5>
              <Form.Control
                className="text-end me-0 ms-2"
                style={{ width: "100px" }}
                value={tax}
                type="number"
                onChange={handleTaxChange}></Form.Control>
            </Stack>
            <h5>Total: {invoice?.total}</h5>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default ParentComponent;
