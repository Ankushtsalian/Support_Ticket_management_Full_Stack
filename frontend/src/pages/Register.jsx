import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUserRegister, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // redirect when logged in
    if (isSuccess && user) {
      Navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, dispatch, Navigate, message]);

  const onChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(setUserRegister(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Enter Your Name"
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password2"
              id="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <button className="btn btn-block">Submit</button>
        </form>
      </section>
    </>
  );
};

export default Register;
