import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoMdHome, IoMdArrowBack } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Footer from "@/components/Footer";
function Pass() {
  const router = useRouter();
  const [authable, setAuthable] = useState(false);
  const [userData, setUserData] = useState([]);
  const [showpass, setShowpass] = useState(false);
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [desc, setDesc] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const auth = localStorage.getItem("auth");
      const useemail = localStorage.getItem("email");
      const id = router.query.pass;

      if (auth === "true") {
        setAuthable(true);
        try {
          const resData = await axios.get(`/api/getDataById?id=${id}`);
          const data = resData.data;
          setUserData(data[0]);
          setUname(userData.username);
          setPass(userData.password);
          setDesc(userData.description);
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push("/");
      }
    };
    fetchData();
  }, [router.query.pass, userData.length]);

  const handleEdit = async (e) => {
    e.preventDefault()
    let data = {uname , pass ,desc}
    await axios.put(`/api/editData?id=${router.query.pass}` , {data});
  };
  return (
    <div>
      {authable && (
        <div>
          <div className="flex w-full flex-col">
            <div className="flex w-[90%] md:w-1/2 mx-auto justify-between my-2">
              <div className="flex flex-row bg-gray-300 rounded-sm p-2">
                <IoMdArrowBack className="mx-2 text-3xl" onClick={() =>  window.history.back()}/>
                <p className="text-2xl mx-2">{userData.site}</p>
              </div>
              <p className="text-5xl">
                <IoMdHome onClick={() => router.push("/")} />
              </p>
            </div>
            <div>
              <div className="my-10 w-full flex justify-center items-center overflow-hidden">
                <div className="flex w-[90%] md:w-1/2 mx-auto justify-between">
                  <div className="container px-5  mx-auto flex flex-col">
                    {userData.length !== 0 && (
                      <div className=" bg-gray-300 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <div className="flex justify-between">
                          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                            Edit Password
                          </h2>
                        </div>
                        <p className="leading-relaxed mb-5 text-gray-600">
                          Add password and save for future. A secure way to
                          store you passwords.
                        </p>
                        <form onSubmit={handleEdit}>
                          <div className="relative mb-4">
                            <label
                              htmlFor="text"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Username
                            </label>
                            <input
                              type="text"
                              id="text"
                              name="text"
                              value={uname}
                              className="w-full bg-white rounded border border-gray-300text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              placeholder="Username"
                              onChange={(e) => {
                                setUname(e.target.value);
                              }}
                              required
                            />
                          </div>
                          <div className="relative mb-4">
                            <label
                              htmlFor="password"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Password
                            </label>
                            <input
                              type={`${!showpass ? "password" : "text"}`}
                              id="password"
                              value={pass}
                              name="password"
                              className="w-full bg-white rounded border border-gray-300text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                              placeholder="Password"
                              onChange={(e) => {
                                setPass(e.target.value);
                              }}
                              required
                            />
                            {showpass ? (
                              <FaRegEyeSlash
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer my-3 text-xl"
                                onClick={() => setShowpass(false)}
                              />
                            ) : (
                              <FaRegEye
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer my-3 text-xl"
                                onClick={() => setShowpass(true)}
                              />
                            )}
                          </div>

                          <div className="relative mb-4">
                            <label
                              htmlFor="message"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Description
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={desc}
                              rows={2}
                              className="w-full bg-white rounded border border-gray-300h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                              placeholder="Description"
                              onChange={(e) => {
                                setDesc(e.target.value);
                              }}
                              required
                            ></textarea>
                          </div>
                          <button
                            type="submit"
                            className="text-black border-0 py-2 px-6 bg-blue-300 rounded text-lg"
                          >
                            Edit
                          </button>
                        </form>
                      </div>
                    )}

                    {userData.length == 0 && (
                      <div className="flex flex-col justify-center items-center">
                        <div>
                          <p className="bg-gray-400 p-2 rounded-sm my-10">
                            No password saved with this site.
                            <Link
                              className="text-blue-900 underline underline-offset-2"
                              href="/"
                            >
                              Go to home
                            </Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className=" bottom-0 w-full">
      <Footer/>
      </div>
    </div>
  );
}

export default Pass;
