import React, { useState } from "react";
import { useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserLogin } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  const onChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(setUserLogin(userData));
  };

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
    // redirect when logged in
    if (isSuccess && user) {
      Navigate("/");
    }
    // dispatch(reset());
  }, [isError, isSuccess, user, Navigate, dispatch, message]);
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Please LogIn to get Support</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter Your password"
              required
            />
          </div>

          <button className="btn btn-block">Submit</button>
        </form>
      </section>
    </>
  );
};

export default Login;
