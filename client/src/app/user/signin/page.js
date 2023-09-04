"use client";

import { signinAPI } from "@/util/apiUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "universal-cookie";

function SignIn() {
    const cookies = new Cookies();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const response = await signinAPI(formData);

            if (response.ok) {
                console.log("Signin successful!");

                // Set the email ID in a cookie
                cookies.set("email", formData.email, { path: "/" });

                // ? Update before deploying
                window.location.href =
                    process.env.NEXT_PUBLIC_FLAG == "PRODUCTION"
                        ? "https://moodo-sakshgupta.vercel.app/"
                        : "http://localhost:3000/";
            } else {
                const data = await response.json();
                setError(data.message || "Signin failed.");
            }
        } catch (error) {
            console.error("Error signing in:", error);
            setError("An error occurred while signing in.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-[#1a1c1e] p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-semibold mb-4 bg-inherit">
                    Sign In
                </h2>
                <form onSubmit={handleSubmit} className="bg-[#1a1c1e]">
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium bg-[#1a1c1e]"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium bg-[#1a1c1e]"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md"
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm mb-4 bg-[#1a1c1e]">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="bg-[#ffc37c] text-black rounded-md py-2 w-full hover:bg-[#ffd5a3]"
                    >
                        Sign In
                    </button>
                    <button
                        type="submit"
                        onClick={() => {
                            setFormData({
                                email: "sakshamgupta.dev@gmail.com",
                                password: "123",
                            });
                        }}
                        className="bg-[#ffc37c] text-black rounded-md py-2 w-full mt-2 hover:bg-[#ffd5a3]"
                    >
                        Continue without Sign Up
                    </button>

                    {/* Link to Sign Up */}
                    <p className="text-sm mt-4 bg-[#1a1c1e]">
                        Don&apos;t have an account?{" "}
                        <Link href="/user/signup">
                            <span className="text-[#ffc37c] hover:underline bg-[#1a1c1e]">
                                Sign Up
                            </span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
