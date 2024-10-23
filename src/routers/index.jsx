import { createBrowserRouter } from "react-router-dom";
import CommonLayout from "../layout/CommonLayout";
import HomePage from "../pages/HomePage";
import Categories from "../pages/Categories";
import Category from "../pages/Category";
import ImageUpload from "../pages/ImageUpload";
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
            element: (
              <PrivateRoute>
                  <AllProducts></AllProducts>
                </PrivateRoute>
            ),
          },
        ],
      },

      {
        path: "/categories",
        element: <Categories></Categories>,
        loader: () => fetch("http://localhost:5000/categories"),
      },
      {
        path: "/category",
        element: <Category></Category>,
      },

      {
        path: "/add/product",
        element: <ImageUpload></ImageUpload>,
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
            path: "/dashboard/categories",
            element: <CategoryTable />,
            loader: () => fetch("http://localhost:5000/categories"),
          },
          {
            path: "/dashboard/category/add",
            element: <CategoryForm />,
          },
          {
            path: "/dashboard/category/edit/:id",
            element: <CategoryEdit />,
            loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`),
          },
          {
            path: "/dashboard/products",
            element: <ProductTable />,
            loader: () => fetch("http://localhost:5000/products"),
          },
          {
            path: "/dashboard/product/add",
            element: <ProductForm />,
          },
          {
            path: "/dashboard/product/edit/:id",
            element: <ProductEdit />,
            loader: ({ params }) => fetch(`http://localhost:5000/product/${params.id}`),
          },
        ],
      },

]);

export default router;