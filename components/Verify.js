import React, { useState } from "react";
function Verify({handleVerify}) {
    const [otpdata, setOtpdata] = useState('');
  return (
    <div>
      <div className="flex">
        <div className="w-full md:w-[60%] lg:w-[40%] flex flex-col justify-center md:h-screen my-10 md:my-0">
          <span>
            <p className="text-3xl text-gray-700 mx-3 my-5 md:hidden">PongdoMgr</p>
          </span>
          <span>
            <p className="text-3xl font-semibold text-gray-700 mx-3 my-10">
              Verify your account
            </p>
          </span>
          <span>
            <form onSubmit={(event)=>handleVerify(event ,otpdata)}>
            <label
            htmlFor="otp"
            className="text-base font-semibold text-gray-700 mx-4 my-2"
          >
            Enter Otp
          </label>
          <input
            type="number"
            name="otp"
            id="number"
            className="mx-3 border-2 w-[90%] py-4 px-2 mt-3 rounded-md hover:shadow-md"
            placeholder="name@mail.com"
            onChange={(e) => {
              const input = e.target.value;
              setOtpdata(input);
            }}
            required
          />

          <button
            type="submit"
            className='mx-3 text-2xl my-5 bg-green-400 w-[90%] py-4 px-2 rounded-md hover:shadow-md'
          > Next </button>
            </form>
          
          </span>
          
        </div>
        <div className="hidden md:block bg-green-400 md:w-[40%] lg:w-[60%] h-screen">
            <div className="flex justify-center items-center h-screen">
            <p className="text-3xl text-gray-700 mx-3 my-5">PongdoMgr</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
