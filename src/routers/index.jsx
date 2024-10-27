import { createBrowserRouter } from "react-router-dom";
import CommonLayout from "../layout/CommonLayout";
import HomePage from "../pages/HomePage";

import Dashboard from "../pages/Dashboard";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import ProductEdit from "../components/ProductEdit";
import CategoryTable from "../components/CategoryTable";
import CategoryForm from "../components/CategoryForm";
import DashboardBody from "../components/DashboardBody";
import Test from "../components/Test";
import CategoryEdit from "../components/CategoryEdit";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AllProducts from "../pages/AllProducts";
import UsersTable from "../components/UsersTable";
import UserEdit from "../components/UserEdit";
import UserProfile from "../components/UserProfile";
import UserTypeEdit from "../components/UserTypeEdit";
import ProductsbyCategory from "../components/ProductsbyCategory";
import ProductDetails from "../components/ProductDetails";
import MyProducts from "../components/MyProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-products",
        element:  <AllProducts></AllProducts>,
        loader: () => fetch("https://product-buy-sell-shop-server.onrender.com/products"),
      },
      {
        path: "/product/details/:id",
        element: (
        <PrivateRoute>
          <ProductDetails />
        </PrivateRoute>),
        loader: ({ params }) => fetch(`https://product-buy-sell-shop-server.onrender.com/product/${params.id}`),
      },
      {
        path: "/products/category/:CategoryId",
        element:   <ProductsbyCategory></ProductsbyCategory>,
        loader: ({ params }) => fetch(`https://product-buy-sell-shop-server.onrender.com/product/category/${params.CategoryId}`),
      },
    ],
  },

  {
    path: "/test",
    element: <Test></Test>,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardBody></DashboardBody>
      },
      {
        path: "/dashboard/users",
        element: <UsersTable />,
        loader: () => fetch("https://product-buy-sell-shop-server.onrender.com/users"),
      },
      {
        path: "/dashboard/user/profile/:email",
        element: <UserProfile />,
        loader: ({ params }) => fetch(`https://product-buy-sell-shop-server.onrender.com/user/profile/${params.email}`),
      },
      {
        path: "/dashboard/user/my-products/:email",
        element: <MyProducts />,
        loader: ({ params }) => fetch(`https://product-buy-sell-shop-server.onrender.com/user/myproducts/${params.email}`),
      },
      {
        path: "/dashboard/user/edit/:id",
        element: <UserEdit />,
        loader: ({ params }) => fetch(`https://product-buy-sell-shop-server.onrender.com/user/${params.id}`),
      },
      {
        path: "/dashboard/usertype/edit/:id",
        element: <UserTypeEdit />,
        loader: ({ params }) => fetch(`https://product-buy-sell-shop-server.onrender.com/user/${params.id}`),
      },
      {
        path: "/dashboard/categories",
        element: <CategoryTable />,
        loader: () => fetch("https://product-buy-sell-shop-server.onrender.com/categories"),
      },
      {
        path: "/dashboard/category/add",
        element: <CategoryForm />,
      },
      {
        path: "/dashboard/category/edit/:id",
        element: <CategoryEdit />,
        loader: ({ params }) => fetch(`https://product-buy-sell-shop-server.onrender.com/category/${params.id}`),
      },
      {
        path: "/dashboard/products",
        element: <ProductTable />,
        loader: () => fetch("https://product-buy-sell-shop-server.onrender.com/products"),
      },
      {
        path: "/dashboard/product/add",
        element: <ProductForm />,
      },

      {
        path: "/dashboard/product/edit/:id",
        element: <ProductEdit />,
        loader: ({ params }) => fetch(`https://product-buy-sell-shop-server.onrender.com/product/${params.id}`),
      },
    ],
  },

]);

export default router;