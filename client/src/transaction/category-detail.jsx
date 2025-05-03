import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/esm/Stack";

import { TransactionListContext } from "./transaction-list-provider";
import TransactionItem from "./transaction-item";

function CategoryDetail({
  categoryId,
  sum,
  itemList,
  setTransactionItemFormData,
  setTransactionItemDeleteDialog,
}) {
  const { data } = useContext(TransactionListContext);

  return (
    <Accordion.Item eventKey={categoryId} style={{ width: "100%" }}>
      <Accordion.Header className="p-0">
        <Stack direction="horizontal" gap={2}>
          <div>{data?.categoryMap[categoryId].name}</div>
          <div>{sum.toLocaleString("cs")}</div>
        </Stack>
      </Accordion.Header>
      <Accordion.Body>
        <Row>
          {itemList?.map((item) => {
            return (
              <TransactionItem
                item={item}
                setTransactionItemFormData={setTransactionItemFormData}
                setTransactionItemDeleteDialog={setTransactionItemDeleteDialog}
              />
            );
          })}
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default CategoryDetail;
