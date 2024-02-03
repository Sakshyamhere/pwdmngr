import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FaRegCopy, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";

function Site() {
  const router = useRouter();
  const [authable, setAuthable] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const auth = localStorage.getItem("auth");
      const useemail = localStorage.getItem("email");
      const usesite = router.query.site;

      if (auth === "true") {
        setAuthable(true);
        try {
          const resData = await axios.get(
            `/api/getData?user=${useemail}&site=${usesite}`
          );
          const data = resData.data;
          setUserData(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push("/");
      }
    };
    fetchData();
  }, [router.query.site, userData.length]);
  const handleDelete = async (id) => {
    await axios.delete(`/api/deleteData?id=${id}`);
    setUserData([]);
  };
  return (
    <div>
      {authable && (
        <div>
         
          <div className="flex w-full flex-col">
            <div className="flex w-[90%] md:w-1/2 mx-auto justify-between my-2">
              <p className="text-5xl md:mr-20">
                <IoMdHome onClick={() => router.push("/")} />
              </p>
              <p className="text-2xl bg-gray-300 rounded-sm p-2 mx-2">
                {router.query.site}
              </p>
            </div>
            {userData.length != 0 && (
              <div className="flex w-full flex-col justify-center items-center">
                {userData.map((items, index) => (
                  <div
                    className="bg-gray-400 my-10 mx-2 p-4 w-[90%] md:w-1/2 shadow-md rounded-md"
                    key={index}
                  >
                    <div className="relative">
                      <p>Username</p>
                      <input
                        type="text"
                        value={items.username}
                        name="text"
                        className="w-full bg-gray-500 rounded border border-gray-300text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        placeholder="Password"
                        disabled
                      />
                      <FaRegCopy
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer my-3 text-xl"
                        onClick={() => {
                          navigator.clipboard.writeText(items.username);
                        }}
                      />
                    </div>
                    <div className="relative">
                      <p>Password</p>
                      <input
                        type="password"
                        value={items.password}
                        id={`pass${index}`}
                        name="password"
                        className="w-full bg-gray-500 rounded border border-gray-300text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        disabled
                      />
                      <div className="flex absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer my-3 text-xl">
                        <FaRegEye
                          className="mx-2"
                          onClick={() => {
                            var x = document.getElementById(`pass${index}`);
                            if (x.type == "text") {
                              x.type = "password";
                            } else {
                              x.type = "text";
                            }
                          }}
                        />

                        <FaRegCopy
                          className="mx-2"
                          onClick={() => {
                            navigator.clipboard.writeText(items.password);
                          }}
                        />
                      </div>
                    </div>
                    <p>Description</p>
                    <input
                      type="text"
                      value={items.description}
                      name="text"
                      className="w-full bg-gray-500 rounded border border-gray-300text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Password"
                      disabled
                    />
                    <div className="flex my-3">
                      <button className="p-2 bg-blue-300 text-xl mx-2 my-2 px-4 rounded-md"   onClick={() => router.push(`/edit/${items._id}`)}>
                        Edit
                      </button>
                      <button
                        className="p-2 bg-blue-300 text-xl mx-2 my-2 px-4 rounded-md"
                        onClick={() => handleDelete(items._id)}
                      >
                        Delete
                      </button>
                    </div>
                 
                  </div>
                ))}
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
      )}
    </div>
  );
}

export default Site;
