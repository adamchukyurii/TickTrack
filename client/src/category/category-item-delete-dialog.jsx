import { useContext, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { CategoryListContext } from "./category-list-provider.jsx";

function CategoryItemDeleteDialog({ data, onClose }) {
  const [errorState, setErrorState] = useState();
  const { state, handlerMap } = useContext(CategoryListContext);

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!errorState?.message ? (
          <Alert variant={"danger"}>{errorState.message}</Alert>
        ) : null}
        {`Do you really want to delete category ${data.name}`}
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
          variant="danger"
          disabled={state === "pending"}
          onClick={async () => {
            const result = await handlerMap.handleDelete({ id: data.id });
            if (result.ok) {
              onClose();
            } else {
              setErrorState(result.error);
            }
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryItemDeleteDialog;
