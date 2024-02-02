import Landing from "@/components/Landing";
import Login from "@/components/Login";
import Verify from "@/components/Verify";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {

  const [render, setRender] = useState("login");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      setRender("landing");
    }
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
  const handleLogout = async () => {
    localStorage.setItem("auth", "false");
    localStorage.setItem("email", "");
    setRender("login");
  }
  return (
    <div>
      {render == "login" && <Login handleLogin={handleLogin} />}
      {render == "verify" && <Verify handleVerify={handleVerify} />}
      {render == "landing" && (
       <Landing handleLogout={handleLogout}/>
      )}
    </div>
  );
}
