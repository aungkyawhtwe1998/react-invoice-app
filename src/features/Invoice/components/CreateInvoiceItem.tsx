import React, { useState } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import { InvoiceItem } from "../../../types/invoice";

interface CreateInvoiceItemProps {
  item?: InvoiceItem;
  onCreateItem: (item: InvoiceItem) => void;
}

const CreateInvoiceItem: React.FC<CreateInvoiceItemProps> = ({
  onCreateItem,
  item,
}) => {
  const [name, setName] = useState(item?.name || "");
  const [quantity, setQuantity] = useState(item?.quantity || null);
  const [price, setPrice] = useState(item?.price || null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newItem: InvoiceItem = {
      name,
      quantity: quantity || 0,
      price: price || 0,
      total: Math.round(quantity && price ? quantity * price : 0),
    };

    onCreateItem(newItem);

    // Reset form fields
    setName("");
    setQuantity(0);
    setPrice(0);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack
        direction="horizontal"
        className="align-items-end"
        gap={2}>
        <Form.Group controlId="name">
          {/* <Form.Label>Name</Form.Label> */}
          <Form.Control
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="quantity">
          {/* <Form.Label>Quantity</Form.Label> */}
          <Form.Control
            type="number"
            value={quantity || ""}
            onChange={handleQuantityChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          {/* <Form.Label>Price</Form.Label> */}
          <Form.Control
            type="number"
            step="0.01"
            value={price || ""}
            onChange={handlePriceChange}
            required
          />
        </Form.Group>

        <Button
          className=""
          variant="primary"
          type="submit">
          Add Item
        </Button>
      </Stack>
    </Form>
  );
};

export default CreateInvoiceItem;
