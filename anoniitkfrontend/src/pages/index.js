import { useEffect } from "react";
import Layout from "../hocs/Layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Chats from "@/components/Chats";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      router.push("/private");
    }
  }, [router]);

  return (
    <Layout title="Anon IIT-K" content="">
      <div className="p-4 bg-white rounded-3">
        <div className="row bg-light">
          {/* <p className="fs-4 mt-3">Welcome to Anon IIT-K !!</p> */}

          <div
            className="p-3 col border"
            style={{ backgroundColor: "black", borderRadius: "1rem 3rem 3rem 0.7rem" }}
          >
            <Chats />
            <br />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
