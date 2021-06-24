import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signin = () => {
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mb-2">
              <label className="text-light">Email</label>
              <input className="form-control" type="email" />
            </div>
            <div className="form-group mb-2">
              <label className="text-light">Password</label>
              <input className="form-control" type="password" />
            </div>
            <div className="text-center mb-2">
              <button className="btn btn-success btn-block">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Signin page" description="a page for user to Signin!">
      {signInForm()}
    </Base>
  );
};

export default Signin;
