import Login from "@/components/Login";
import Verify from "@/components/Verify";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [render, setRender] = useState("login");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      setRender("landing");
    }
    console.log(localStorage.getItem("email"))
  }, []);

  const handleLogin = async (e, formdata) => {
    e.preventDefault();
    setEmail(formdata);
    await axios.post("/api/postUser", { email: formdata });
    setRender("verify");
  };
  const handleVerify = async (e, input) => {
    e.preventDefault();
    const resData = await axios.get(`/api/getOtp?user=${email}`);
    if (input == resData.data[0].otp) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("email", email);
      setRender("landing");
    }
  };
  return (
    <div>
      {render == "login" && <Login handleLogin={handleLogin} />}
      {render == "verify" && <Verify handleVerify={handleVerify} />}
      {render == "landing" && (
        <div>
          <div>
            <button onClick={() => localStorage.setItem("auth", "false")}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
