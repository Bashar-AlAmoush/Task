import React from 'react'

function Hero() {
    return (
        <>
            <section
                style={{
                    backgroundImage: "url(https://images.pexels.com/photos/4201333/pexels-photo-4201333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",}}
>
                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div className="max-w-xl mb-20 text-left ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold sm:text-5xl text-gray-500 mb-8">
                        we're the world's leading custom artwork solution 


                        </h1>



                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <a
                                href="#"
                                className="block w-full rounded bg-sky-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-sky-600 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            >
                                View Gallery
                            </a>

                            <a
                                href="#"
                                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:text-sky-500 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                            >
                                View Posts
                            </a>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
export default Hero