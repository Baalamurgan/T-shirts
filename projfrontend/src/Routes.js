import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { signout } from "./auth/helper";
import Home from "./core/Home";
import signin from "./user/Signin";
import signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/signin" component={signin} />
        <Route exact path="/signout" component={signout} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute
          exact
          path="/admin/create/category"
          component={AddCategory}
        />
        <AdminRoute
          exact
          path="/admin/categories"
          component={ManageCategories}
        />
        <AdminRoute
          exact
          path="/admin/category/update/:categoryId/:userId"
          component={UpdateCategory}
        />
        <AdminRoute exact path="/admin/create/product" component={AddProduct} />
        <AdminRoute exact path="/admin/products" component={ManageProducts} />
        <AdminRoute
          exact
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
}
