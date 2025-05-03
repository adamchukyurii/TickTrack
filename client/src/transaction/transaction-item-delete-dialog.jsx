import { useContext, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { TransactionListContext } from "./transaction-list-provider.jsx";

function TransactionItemDeleteDialog({ item, onClose }) {
  const [errorState, setErrorState] = useState();
  const { state, handlerMap } = useContext(TransactionListContext);

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!errorState?.message ? (
          <Alert variant={"danger"}>{errorState.message}</Alert>
        ) : null}
        {`Do you really want to delete transaction ${
          item.counterparty
        } (${item.amount.toLocaleString("cs")})`}
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
            const result = await handlerMap.handleDelete({ id: item.id });
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

export default TransactionItemDeleteDialog;
