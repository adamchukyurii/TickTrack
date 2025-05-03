import { useContext, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";

import Icon from "@mdi/react";
import { mdiTagPlusOutline } from "@mdi/js";

import { CategoryListContext } from "./category-list-provider";
import PendingItem from "./pending-item";
import CategoryItem from "./category-item";
import CategoryItemForm from "./category-item-form";
import CategoryItemDeleteDialog from "./category-item-delete-dialog";

function CategoryListContent() {
  const [categoryItemFormData, setCategoryItemFormData] = useState();
  const [categoryItemDeleteDialog, setCategoryItemDeleteDialog] = useState();
  const { state, data } = useContext(CategoryListContext);

  return (
    <Card className="border-0">
      {!!categoryItemFormData ? (
        <CategoryItemForm
          data={categoryItemFormData}
          onClose={() => setCategoryItemFormData()}
        />
      ) : null}
      {!!categoryItemDeleteDialog ? (
        <CategoryItemDeleteDialog
          data={categoryItemDeleteDialog}
          onClose={() => setCategoryItemDeleteDialog()}
        />
      ) : null}
      <Card.Header
        className="sticky-top "
        bsPrefix="bg-white"
        style={{ top: "56px", padding: "8px" }}
      >
        <Stack direction="horizontal" gap={3}>
          <div>Categories</div>
          <div className=" ms-auto">
            <Button
              className="me-auto"
              variant="success"
              size="sm"
              disable={state === "pending"}
              p={2}
              onClick={() => setCategoryItemFormData({})}
            >
              <Icon path={mdiTagPlusOutline} size={0.8} /> Add category
            </Button>
          </div>
        </Stack>
      </Card.Header>
      <Card.Body className="px-0" style={{ position: "relative", top: "40px" }}>
        {state === "pending" && !data
          ? [0, 1, 2, 3].map((item) => <PendingItem key={item} />)
          : null}
        {data?.itemList ? (
          <ListGroup className="border-1">
            {data.itemList.map((item) => (
              <CategoryItem
                key={item.id}
                data={item}
                setCategoryItemFormData={setCategoryItemFormData}
                setCategoryItemDeleteDialog={setCategoryItemDeleteDialog}
              />
            ))}
          </ListGroup>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default CategoryListContent;
