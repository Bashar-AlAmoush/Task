import React from "react";

function Hero() {
  return (
    <>
      <section
        className="relative"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/185933/pexels-photo-185933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-black opacity-50 absolute inset-0"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 z-50">
          <div className="max-w-xl mb-20 text-left sm:text-left">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-gray-50 mb-8">
              Captured Moments, Photo Albums Gallery
            </h1>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded bg-transparent border-solid border-2 border-sky-600 px-12 py-3 text-sm font-medium text-white shadow focus:outline-none focus:ring active:bg-rose-500 sm:w-auto transition-colors duration-300 ease-in-out hover:bg-sky-600"
              >
                View Gallery
              </a>

              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow focus:outline-none focus:ring active:text-rose-500 sm:w-auto duration-300 ease-in-out hover:bg-gray-300"
              >
                View Posts
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Hero;