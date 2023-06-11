import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Layout from "../hocs/Layout";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      Cookies.set("access_token", response.data.access);
      Cookies.set("refresh_token", response.data.refresh);
      window.location.href = "/private";
    } catch (error) {
      setError(error.response.data.detail);
    }
  };

  return (
    <Layout title="Login" content="">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <form className="bg-light p-5 mb-5" onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 fw-normal text-center">Login</h1>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  value={username}
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
                <label htmlFor="username">Username*</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  minLength="8"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="password">Password*</label>
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg mt-5" type="submit">
                  Login
                </button>
              </div>
              <p className="text-center mt-3">
                Outsider ? {" "}
                <Link href="/contact" className="text-decoration-none">
                  Pr00ve y0ur wor1h !!
                </Link>
              </p>
              <br/>
            </form>
            <br/>
            <br/>
            <br/>
          </div>
          <br/>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    </Layout>
  );
}
