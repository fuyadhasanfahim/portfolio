import React from "react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="my-4 select-none">
            <nav className="w-full max-w-7xl mx-auto relative">
                <div className="flex justify-between items-center text-2xl font-medium">
                    <div>
                        <a href="#home">Fuyad Hasan Fahim</a>
                    </div>
                    <div className="hidden sm:block">
                        <ul className="flex justify-between items-center gap-10">
                            <li className="border-b-2 border-transparent hover:border-[#f5deb3] transition-all duration-300">
                                <a href="#work">Work</a>
                            </li>
                            <li className="border-b-2 border-transparent hover:border-[#f5deb3] transition-all duration-300">
                                <a href="#about">About</a>
                            </li>
                            <li className="border-b-2 border-transparent hover:border-[#f5deb3] transition-all duration-300">
                                <a href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>

                    <div
                        className="block sm:hidden cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={
                                    isOpen
                                        ? "M6 18 18 6M6 6l12 12"
                                        : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                }
                            />
                        </svg>

                        {isOpen && (
                            <ul className="bg-[#212121] flex flex-col items-center fixed left-0 right-0 top-20 transition-all duration-300 text-5xl pb-4">
                                <li>
                                    <a href="#work">Work</a>
                                </li>
                                <li>
                                    <a href="#about">About</a>
                                </li>
                                <li>
                                    <a href="#contact">Contact</a>
                                </li>

                                <div className="flex gap-5 mt-3 text-2xl">
                                    <li className="border-b-2 border-transparent hover:border-[#f5deb3] transition-all duration-300">
                                        <a href="#linkedin">LinkedIn</a>
                                    </li>
                                    <li className="border-b-2 border-transparent hover:border-[#f5deb3] transition-all duration-300">
                                        <a href="#github">GitHub</a>
                                    </li>
                                    <li className="border-b-2 border-transparent hover:border-[#f5deb3] transition-all duration-300">
                                        <a href="#twitter">Twitter</a>
                                    </li>
                                </div>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
