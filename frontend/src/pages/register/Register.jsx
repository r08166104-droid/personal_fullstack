import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const handleOnchange = (target) => {
    setInputs((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        ...inputs,
      });
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={inputs.username}
              onChange={(e) => {
                handleOnchange(e.target);
              }}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={inputs.email}
              onChange={(e) => {
                handleOnchange(e.target);
              }}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) => {
                handleOnchange(e.target);
              }}
            />
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={inputs.name}
              onChange={(e) => {
                handleOnchange(e.target);
              }}
            />
            {err && <div style={{ color: "red" }}>{err.response.data}</div>}
            <button onClick={(e) => handleRegister(e)}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
