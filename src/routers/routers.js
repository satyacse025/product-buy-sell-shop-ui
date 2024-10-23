export const ROUTES = {
    HOME: "/",
    CATEGORY: "/category",
    CATEGORIES: "/categories",
    REGISTER: "/register",
    LOGIN: "/login",
    NOT_FOUND: '*',
    SINGLE_PRODUCT: {
      STATIC: "/products/:proId",
      DYNAMIC: (proId) => `/products/${proId}`,
    },
  };
  