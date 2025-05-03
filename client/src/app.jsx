import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Dashboard from "./transaction/dashboard";
import CategoryList from "./category/category-list";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/categoryList" element={<CategoryList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
