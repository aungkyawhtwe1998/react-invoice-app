import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./features/Home/pages/Home";
import InvoiceForm from "./features/Invoice/pages/InvoiceForm";
import AlertProvider from "./context/alert/AlertProvider";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
export type RawNote = {
  id: string;
} & RawNoteData;

export type Tag = {
  id: string;
  label: string;
};
function App() {
  return (
    <AlertProvider>
      <Container className="my-4">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/invoice/:id"
            element={<InvoiceForm />}
          />
         
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Container>
    </AlertProvider>
  );
}

export default App;
