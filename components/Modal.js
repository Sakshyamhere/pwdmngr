import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
function Modal({ closeAdd, handlePostPass }) {
  const [showpass, setShowpass] = useState(false);
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center overflow-hidden">
        <div className="flex">
          <div className="container px-5 py-24 mx-auto flex">
            <div className=" bg-gray-300 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
              <div className="flex justify-between">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                  Add Password
                </h2>
                <MdOutlineClose className="text-3xl" onClick={closeAdd} />
              </div>
              <p className="leading-relaxed mb-5 text-gray-600">
                Add password and save for future. A secure way to store you
                passwords.
              </p>
              <form
                onSubmit={(e) => {
                  handlePostPass(e, username, site, password, desc);
                  setPassword("");
                  setDesc("");
                  setSite("");
                  setUsername("");
                }}
              >
                <div className="relative mb-4">
                  <label
                    htmlFor="site"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Site
                  </label>
                  <input
                    type="text"
                    id="site"
                    name="site"
                    value={site}
                    pattern="([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+)"
                    className="w-full bg-white rounded border border-gray-300text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="site.com"
                    onChange={(e) => {
                      setSite(e.target.value);
                    }}
                    required
                  />
                </div>
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
                    value={username}
                    className="w-full bg-white rounded border border-gray-300text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Username"
                    onChange={(e) => {
                      setUsername(e.target.value);
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
                    value={password}
                    name="password"
                    className="w-full bg-white rounded border border-gray-300text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
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
                  Add Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
