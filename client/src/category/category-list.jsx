import Container from "react-bootstrap/esm/Container";
import CategoryListProvider from "./category-list-provider";
import CategoryListContent from "./category-list-content";

function CategoryList() {
  return (
    <Container>
      <CategoryListProvider>
        <CategoryListContent />
      </CategoryListProvider>
    </Container>
  );
}

export default CategoryList;
