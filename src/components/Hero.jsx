import React from 'react'

const Hero = () => {
    return (
        <>
            <section
                style={{
                    backgroundImage: "url(https://images.pexels.com/photos/3939961/pexels-photo-3939961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="relative"
            >
                <div
                    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div className="max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold sm:text-5xl text-black mb-8">
                            Let us find your

                            {/* <strong className="block font-extrabold text-white ">
                                Forever Home.
                            </strong> */}
                        </h1>

                        <p className="text-l sm:text-l text-gray-800 w-80">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
                            tenetur fuga ducimus numquam ea!
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <a
                                href="#"
                                className="block w-full rounded bg-[#a18c6c] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#947e5a] focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            >
                                Get Started
                            </a>

                            <a
                                href="#"
                                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:text-[#947e5a] focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero