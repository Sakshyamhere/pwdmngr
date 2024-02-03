import React, { useEffect, useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/router";
function Landing({ handleLogout }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [add, setAdd] = useState(false);
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setEmail(userEmail);
    if (!userEmail) {
      return;
    } else {
      getPass(userEmail);
    }
    const sortArray = () => {
      let arr = [];
      userData.forEach((items) => arr.push(items.site));
      //   const uniqueArray = [...new Set(arr)];
      const uniqueArray = arr.reduce((acc, value) => {
        if (acc[value]) {
          acc[value].repetition++;
        } else {
          acc[value] = { site: value, repetition: 1 };
        }
        return acc;
      }, {});
      setData(Object.values(uniqueArray));
      //   setData(uniqueArray)
    };
    if (userData.length !== 0) {
      sortArray();
    }
  }, [userData.length]);
  const getPass = async (email) => {
    try {
      const resData = await axios.get(`/api/getPass?user=${email}`);
      const data = await resData.data;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const postPass = (e, username, site, password, desc) => {
    e.preventDefault();
    const dueData = { email, username, site, password, desc };
    axios.post("api/postPass", { dueData });
    setUserData([...userData, dueData]);
    setAdd(false)
  };
  return (
    <div>
      {add && (
        <div className="absolute flex w-full justify-center">
          <Modal closeAdd={() => setAdd(false)} handlePostPass={postPass} />
        </div>
      )}
      <div className="flex flex-col justify-center items-center mb-10">
        <button
          onClick={handleLogout}
          className=" p-2 mx-3 w-[90%] md:w-1/2 border bg-gray-300 text-xl rounded my-2"
        >
          <div className="flex justify-between">
            <p>{email}</p>
            <FaPowerOff className="m-1" />
          </div>
        </button>

        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search...."
          className="border-2 w-[90%] md:w-1/2 py-4 px-2 mt-3 rounded-lg hover:shadow-md"
        />
      </div>
      <div className="flex mx-auto w-[90%] md:w-1/2 mb-10">
        <div className="flex flex-col w-full">
          <div className="flex justify-between my-3">
            <p className="text-left text-3xl">Passwords</p>
            <button
              className="py-1 px-4 rounded-lg bg-blue-300"
              onClick={() => setAdd(true)}
            >
              Add
            </button>
          </div>
          <p className="">
            Create, save, and manage your passwords so you can easily sign in to
            sites and apps.
          </p>
        </div>
      </div>
      <div className="my-10 w-[90%] md:w-1/2 py-4 px-2 mt-3 rounded-md bg-gray-100 text-black shadow-md mx-auto">
        {data.length !== 0 ? (
          data.map((items, index) => (
            <div key={index} className="p-2">
              <div
                className="flex mb-1 hover:bg-gray-200 hover:shadow-sm p-2 border-b-2"
                onClick={() => router.push(`/user/${items.site}`)}
              >
                <img
                  src={`https://${items.site}/favicon.ico`}
                  height={32}
                  width={32}
                />
                <p className="text-3xl ml-3 w-full">{items.site}</p>
                <p>{items.repetition}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Currently, there is no password saved.</p>
        )}
      </div>
    </div>
  );
}

export default Landing;
