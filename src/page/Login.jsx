import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../Context/UserContext';





function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const { userId, setUserId ,refreshUserData} = useContext(UserContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const data = response.data;
        const user = data.find((user) => user.email === email);

        if (user) {
          if (password === user.email) {
            const updatedUser = { ...user, password: user.email };

            axios
              .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, updatedUser)
              .then((response) => {
                console.log('Password updated in the API:', response.data);
                const auth = user.id;
                console.log(auth);
                localStorage.setItem("auth", JSON.stringify(auth));
                refreshUserData()
                navigate("/Profile");
                
              })
              .catch((error) => {
                console.log(error)
              });
          } else {
            toast.error(`Invalid password.`);
          }
        } else {
          toast.error(`Invalid email or password.`);
        }
      })
      .catch((error) => {
        toast.error(`Login failed. Please try again.`);
      });
  };
  
  return (
   <>
         <ToastContainer />

   <div className="flex h-screen w-full mt-14 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
   <div
        className="hidden bg-cover h-3/4 lg:block lg:w-2/3" 
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1514195037031-83d60ed3b448?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80")'
        }}
      />
  <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
    <div className="flex justify-center mx-auto">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-sky-500"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M14.5,16 C14.2238576,16 14,15.7761424 14,15.5 L14,9.5 C14,9.22385763 14.2238576,9 14.5,9 L16,9 C17.1045695,9 18,9.8954305 18,11 C18,11.4116588 17.8756286,11.7942691 17.6624114,12.1123052 C18.4414283,12.3856578 19,13.1275982 19,14 C19,15.1045695 18.1045695,16 17,16 L14.5,16 Z M15,15 L17,15 C17.5522847,15 18,14.5522847 18,14 C18,13.4477153 17.5522847,13 17,13 L15,13 L15,15 Z M15,12 L16,12 C16.5522847,12 17,11.5522847 17,11 C17,10.4477153 16.5522847,10 16,10 L15,10 L15,12 Z M12.9499909,4 L19.5,4 C20.8807119,4 22,5.11928813 22,6.5 L22,19.5 C22,20.8807119 20.8807119,22 19.5,22 L13.5,22 C12.2700325,22 11.2475211,21.1117749 11.0389093,19.9417682 C10.8653433,19.9799013 10.6850188,20 10.5,20 L4.5,20 C3.11928813,20 2,18.8807119 2,17.5 L2,4.5 C2,3.11928813 3.11928813,2 4.5,2 L10.5,2 C11.709479,2 12.7183558,2.85887984 12.9499909,4 Z M13,5 L13,17.5 C13,18.3179089 12.6072234,19.0440799 12,19.5001831 C12.0000989,20.3285261 12.6716339,21 13.5,21 L19.5,21 C20.3284271,21 21,20.3284271 21,19.5 L21,6.5 C21,5.67157288 20.3284271,5 19.5,5 L13,5 Z M8.56005566,11.4964303 C8.54036595,11.4987873 8.52032459,11.5 8.5,11.5 L6.5,11.5 C6.47967541,11.5 6.45963405,11.4987873 6.43994434,11.4964303 L5.96423835,12.6856953 C5.86168164,12.9420871 5.57069642,13.066795 5.31430466,12.9642383 C5.0579129,12.8616816 4.93320495,12.5706964 5.03576165,12.3143047 L7.03576165,7.31430466 C7.20339081,6.89523178 7.79660919,6.89523178 7.96423835,7.31430466 L9.96423835,12.3143047 C10.066795,12.5706964 9.9420871,12.8616816 9.68569534,12.9642383 C9.42930358,13.066795 9.13831836,12.9420871 9.03576165,12.6856953 L8.56005566,11.4964303 Z M8.16148352,10.5 L7.5,8.8462912 L6.83851648,10.5 L8.16148352,10.5 Z M10.5,3 L4.5,3 C3.67157288,3 3,3.67157288 3,4.5 L3,17.5 C3,18.3284271 3.67157288,19 4.5,19 L10.5,19 C11.3284271,19 12,18.3284271 12,17.5 L12,4.5 C12,3.67157288 11.3284271,3 10.5,3 Z M6.5,18 C6.22385763,18 6,17.7761424 6,17.5 C6,17.2238576 6.22385763,17 6.5,17 L8.5,17 C8.77614237,17 9,17.2238576 9,17.5 C9,17.7761424 8.77614237,18 8.5,18 L6.5,18 Z M15.5,20 C15.2238576,20 15,19.7761424 15,19.5 C15,19.2238576 15.2238576,19 15.5,19 L17.5,19 C17.7761424,19 18,19.2238576 18,19.5 C18,19.7761424 17.7761424,20 17.5,20 L15.5,20 Z"
            />
          </svg>
    </div>
    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
      Welcome back!
    </p>
    <a
      href="#"
      className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <div className="px-4 py-2">
        <svg className="w-6 h-6" viewBox="0 0 40 40">
          <path
            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
            fill="#FFC107"
          />
          <path
            d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
            fill="#FF3D00"
          />
          <path
            d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
            fill="#4CAF50"
          />
          <path
            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
            fill="#1976D2"
          />
        </svg>
      </div>
      <span className="w-5/6 px-4 py-3 font-bold text-center">
        Sign in with Google
      </span>
    </a>
    <div className="flex items-center justify-between mt-4">
      <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />
      <a
        href="#"
        className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
      >
        or login with email
      </a>
      <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
    </div>
    <div className="mt-4">
      <label
        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
        htmlFor="LoggingEmailAddress"
      >
        Email Address
      </label>
      <input
        id="LoggingEmailAddress"
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
    </div>
    <div className="mt-4">
      <div className="flex justify-between">
        <label
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          htmlFor="loggingPassword"
        >
          Password
        </label>
        <a
          href="#"
          className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
        >
          Forget Password?
        </a>
      </div>
      <input
        id="loggingPassword"
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
        type="password"
        onChange={handlePasswordChange}
        placeholder="Enter your password" 
      />
    </div>
    <div className="mt-6">
      <button  onClick={handleLogin} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-500 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
        Sign In
      </button>
    </div>
  </div>
</div>

   </>
  )
}

export default Login