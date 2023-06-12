import { useRouter } from "next/router";
import Layout from "../hocs/Layout";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Chats from "@/components/Chats";

const Dashboard = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState(null);
  const [userdata, setUserData] = useState([]);

  const router = useRouter();
  const refresh = Cookies.get("refresh_token");
  const access_token = Cookies.get("access_token");

  // useEffect(() => {
  //   fetch("/api/user/data", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUserData(data.user);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    if (!access_token) {
      window.location.href = "/login";
      setAuthenticated(false);
      return;
    }

    axios
      .post("/api/token/verify", {
        token: access_token,
      })
      .then((res) => {
        setAuthenticated(true);
      })
      .catch((error) => {
        axios
          .post("/api/token/refresh", {
            refresh: refresh,
          })
          .then((res) => {
            Cookies.set("access_token", res.data.access);
            Cookies.set("refresh_token", res.data.refresh);
            setAuthenticated(true);
            window.location.reload();
          })
          .catch((error) => {
            setError(error.response.data.detail);
            setAuthenticated(false);
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            console.log(error);
            window.location.href = "/login";
          });
      });
  }, [access_token, refresh]);

  const handleLogout = async () => {
    const body = JSON.stringify({
      refresh,
    });

    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: body,
      });

      if (res.ok) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        setAuthenticated(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const handleMessage = async (event) => {
    event.preventDefault();
    let userMessage = message;
    if (userMessage) {
      const msg = JSON.stringify({
        message: userMessage,
      });
      try {
        const res = await axios.post("/api/user/m3ssage", msg, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
      } catch (error) {
        setError(error.response.data);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }

  };

  if (!authenticated) {
    return null;
  }

  return (
    <Layout title="Chat" content="Chat as user on Anon IIT-K">
      <div className="row justify-content-around">
        <div className="col">
          <h1 className="display-5 mb-4 p-2">Hacker's Panel</h1>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary mt-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="row bg-light">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="col p-3">
            <div className="container-fluid py-2">
              <p className="fs-4 mt-3">
                Welcome to Anon IIT-K !!
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-3 col border"
          style={{ backgroundColor: "#6528de", borderRadius: "0 0 6rem" }}
        >
          <Chats />
          <br />
        </div>
      </div>

    </Layout>
  );
};

export default Dashboard;