import React from "react";

export default function Footer() {
    return (
        <div className="text-xl font-medium text-center h-10">
            <p className="flex justify-center items-center">
                © Copyright {new Date().getFullYear()}
            </p>
        </div>
    );
}
