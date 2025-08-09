import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./RootLayout";
import ErrorPage from "./pages/Error";
import ProductDetailsPage from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Home />
        )
      },
      {
        path: 'products',
        element: (
          <ProductsPage />
        )
      },
      {
        path: 'products/:productId',
        element: (
          <ProductDetailsPage />
        )
      }

    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
