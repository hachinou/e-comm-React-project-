import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/Homepage/HomePage";
import Register from "./Pages/Auth/AuthOperations/Register";
import Login from "./Pages/Auth/AuthOperations/Login";
import Logout from "./Pages/Auth/AuthOperations/Logout";
import Users from "./Pages/Dashboard/Users/Users";
import GoogleCallback from "./Pages/Auth/AuthOperations/GoogleCallback";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/Protection/RequireAuth";
import User from "./Pages/Dashboard/Users/User";
import AddUser from "./Pages/Dashboard/Users/AddUser";
import Writer from "./Pages/Dashboard/Writer";
import Err404 from "./Pages/Auth/Errors/404";
import RequireBack from "./Pages/Auth/Protection/RequireBack";
import Categories from "./Pages/Dashboard/Category/Categories";
import AddCategory from "./Pages/Dashboard/Category/AddCategory";
import Category from "./Pages/Dashboard/Category/Category";
import Products from "./Pages/Dashboard/Products/Products";
import AddProduct from "./Pages/Dashboard/Products/AddProduct";
import UpdateProduct from "./Pages/Dashboard/Products/Product";
import WebsiteCategories from "./Pages/Website/Categories/Categories";
import Website from "./Pages/Website/Website";
import SingleProduct from "./Pages/Website/SingleProduct/SingleProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<Website />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<WebsiteCategories />} />
          <Route path="product/:id" element={<SingleProduct />} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/*" element={<Err404 />} />
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* Categories*/}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="category/add" element={<AddCategory />} />
              {/* Products */}
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
