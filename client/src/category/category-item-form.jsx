import { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { CategoryListContext } from "./category-list-provider.jsx";

function CategoryItemForm({ data, onClose }) {
  const { state, handlerMap } = useContext(CategoryListContext);

  return (
    <Modal show={true} onHide={onClose}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);
          if (data.id) {
            await handlerMap.handleUpdate({ id: data.id, name: values.name });
          } else {
            await handlerMap.handleCreate({ name: values.name });
          }
          onClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{data?.id ? "Update" : "Add"} category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={data?.name}
            disabled={state === "pending"}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={state === "pending"}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={state === "pending"}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CategoryItemForm;
