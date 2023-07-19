import axios from "axios";
import React, { useState, useEffect,useContext } from "react";
import { UserContext } from '../Context/UserContext';




function Profile() {
  const  {userId}  = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [userAllPosts, setuserAllPosts] = useState([]);


  // const fetchData = async () => {

  //   try {
      
  //     const response = await axios.get(
  //       `https://jsonplaceholder.typicode.com/users/${userId.id}`
  //     );
  //     console.log(response.data);
  //     setUserData(response.data)
    
  //   } catch (error) {
  //     console.error("Error retrieving data:", error);
  //   }
  // };
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const allPosts = response.data;
  
     
      const filteredPosts = allPosts?.filter((post) => post?.userId === userId?.id);
  
      console.log(filteredPosts);
      setuserAllPosts(filteredPosts);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  

  useEffect(() => {
    // fetchData();
    setUserData(userId)
    fetchPosts();
  }, [userId]);


  function breakText(text, breakAfter) {
    if (text.length <= breakAfter) {
      return text;
    }

    let brokenText = "";
    for (let i = 0; i < text.length; i += breakAfter) {
      brokenText += text.substr(i, breakAfter) + " ";
    }
    return brokenText;
  }

 

  return (
    <>
      <div id="edit-portal"></div>
      <div className="h-screen bg-gray-200">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 ms:1/3">
            {/* Left side content */}
            <div className="h-screen bg-gray-200 pt-8">
              <div>
                <div className="w-full ms-8 mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="border-b px-4 pb-6">
                    <div className="text-center my-4">
                      <img
                        className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
                        src="https://cdn-icons-png.flaticon.com/512/1165/1165821.png"
                        alt=""
                      />
                      <div className="py-2">
                        <h3 className="font-bold text-2xl mb-1">{userId?.username}</h3>
                      </div>
                    </div>
                    <div className="flex gap-2 px-2 justify-center">
                      <div className="space-x-8 flex justify-center mt-32 md:mt-0 md:justify-center">
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-4 w-full">
                    <div className="flex gap-2 items-center text-gray-800r mb-4">
                      <div className="bg-white w-full shadow overflow-hidden sm:rounded-lg">
                        <div className="border-t border-gray-200">
                          <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Full name
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData?.name}
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Email address
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData?.email}
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                              Phone Number 
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData?.phone}
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                              website
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData?.website}
                              </dd>
                            </div>

                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                              Address
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData?.address?.city} / {userData?.address?.street} /{userData?.address?.suite}
                              </dd>
                            </div>


                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                              Company
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData?.company?.name} / {userData?.company?.bs} /{userData?.company?.catchPhrase}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="flex"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          
          <div className="w-full md:w-1/2">
            {/* Right side content */}
            <div className="w-full max-w-md mx-auto mt-8">
              <div className="flex border-b border-gray-300"></div>
              <div id="tab1" className="tabcontent p-4">
                <h2 className="text-lg font-bold text-gray-800">User Post</h2>
                <div
                  className="mt-2 text-gray-700 overflow-y-auto"
                  style={{ height: "31rem" }}
                >
                  {userAllPosts ? (
                    userAllPosts.map((post, index) => (
                      <div className="mt-2 text-gray-700" key={index}>
                        <div className="justify-between rounded-lg bg-white p-6 shadow-md sm:flex">
                          <div
                            className="max-h-20 overflow-y-auto"
                            style={{
                              maxHeight: "20rem",
                              scrollbarWidth: "thin",
                            }}
                          >
                            <style>
                              {`
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: #a0aec0;
      border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #718096;
    }
    `}
                            </style>
                            <p className="font-bold">{post.title}</p>
                            <p className="mt-2 text-gray-600 text-sm overflow-wrap break-word whitespace-pre-wrap">
                              <span className="break-words">
                                {breakText(post.body, 20)}
                                
                              </span>
                            </p>
                          </div>

                        
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No Post for {userData.username}.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Profile