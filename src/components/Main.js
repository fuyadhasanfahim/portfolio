import React from "react";

export default function Main() {
    return (
        <section className="h-auto border-b-2 border-[#f5deb3]">
            <div className="h-[60vh] md:h-[80vh]">
                <div className="h-full flex flex-col justify-center items-center gap-10">
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-semibold text-center">
                        Fuyad Hasan Fahim
                    </h1>
                    <p className="text-xl md:text-2xl font-normal text-center w-full max-w-2xl mx-auto">
                        I am freelance designer that helps brands fit and thrive
                        culture. I resolve consumer challenges explore new
                        creative perspectives.
                    </p>
                    <button className="border-2 px-6 py-4 rounded-full text-xl font-medium flex justify-between items-center gap-3">
                        <span className="w-3 h-3 text-green-700 border rounded-full opacity-100 bg-green-700"></span>
                        <div className="relative">Available for work</div>
                    </button>
                </div>
            </div>
            <div className="mb-16 mt-6">
                <img
                    src="https://assets-global.website-files.com/65d69dfef5be899484c226e8/65d6ac27452161caa8b03266_Marisol%20Header.png"
                    alt="https://assets-global.website-files.com/65d69dfef5be899484c226e8/65d6ac27452161caa8b03266_Marisol%20Header.png"
                    className="w-full max-w-7xl h-auto max-h-full rounded-xl mx-auto hover:opacity-75 duration-300"
                />
            </div>
        </section>
    );
}
