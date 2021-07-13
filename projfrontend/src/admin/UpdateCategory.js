import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import {
  getallCategories,
  getaCategory,
  updateCategory,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    loading: false,
    error: "",
    createdCategory: "",
    getaRedirect: false,
  });

  const { name, loading, error, createdCategory, getaRedirect } = values;

  const preLoad = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    preLoad(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            loading: false,
            createdCategory: data.name,
          });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdCategory ? "" : "none" }}
    >
      <h4>{createdCategory} updated successfully</h4>
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-warning mt-3"
      style={{ display: error ? "" : "none  " }}
    >
      <h4>{error}</h4>
    </div>
  );

  const createCategoryForm = () => (
    <form>
      <div className="form-group my-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          value={name}
          autoFocus
          required
          placeholder="For ex. Summer"
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-2"
      >
        Update Category
      </button>
    </form>
  );

  return (
    <Base
      title="Update Categories here!"
      description="Welcome to category updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          <p className="text-white text-center">{JSON.stringify(values)}</p>
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
