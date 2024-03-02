import React from "react";

export default function About() {
    return (
        <div className="mt-10 max-w-7xl mx-auto h-auto border-b-2 border-[#f5deb3]">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-start mb-16">
                <div className="text-2xl font-medium mb-6 md:mt-0">
                    <h1>About</h1>
                </div>
                <div className="text-4xl">
                    <p>
                        A multi-disciplinary freelancer with a background in
                        graphic design and a sushi enthusiasm. I 've had over
                        five years of experience and retain a design degree.
                    </p>
                    <div>
                        <div className="border-t-2 border-[#f5deb3] mt-10 ml-0 md:ml-20 relative">
                            <h1 className="mt-4 ml-4 text-7xl font-semibold relative">
                                22{" "}
                                <span className="text-2xl font-medium text-start absolute ml-2">
                                    completed projects
                                </span>
                            </h1>
                        </div>
                        <div className="border-t-2 border-[#f5deb3] mt-10 ml-0 md:ml-20 relative">
                            <h1 className="mt-4 ml-4 text-7xl font-semibold relative">
                                03{" "}
                                <span className="text-2xl font-medium text-start absolute ml-2">
                                    years experience
                                </span>
                            </h1>
                        </div>
                        <div className="border-t-2 border-[#f5deb3] mt-10 ml-0 md:ml-20 relative">
                            <h1 className="mt-4 ml-4 text-7xl font-semibold relative">
                                01{" "}
                                <span className="text-2xl font-medium text-start absolute ml-2">
                                    awards for projects
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
