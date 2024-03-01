import React from "react";

export default function Main() {
    return (
        <div className="h-[60vh] md:h-[80vh]">
            <div className="h-full flex flex-col justify-center items-center gap-8">
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-semibold text-center">
                    Fuyad Hasan Fahim
                </h1>
                <p className="text-xl md:text-2xl font-medium text-center w-full max-w-2xl mx-auto">
                    I am freelance designer that helps brands fit and thrive
                    culture. I resolve consumer challenges explore new creative
                    perspectives.
                </p>
                <button className="border-2 px-6 py-4 rounded-full text-xl font-medium flex justify-between items-center gap-3">
                    <span className="w-3 h-3 text-green-700 border rounded-full opacity-100 bg-green-700"></span>
                    <div className="relative">Available for work</div>
                </button>
            </div>
        </div>
    );
}
