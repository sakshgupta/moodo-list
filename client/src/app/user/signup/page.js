"use client";

import { signupAPI } from "@/util/apiUtils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Link from "next/link";

function SignUp() {
    const cookies = new Cookies();
    const router = useRouter();

    const [error, setError] = useState("");

    // Check if email exists in cookies and redirect
    useEffect(() => {
        const email = cookies.get("email");
        if (email) {
            router.push("/");
        }
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");

        try {
            const response = await signupAPI(formData);

            if (response.ok) {
                // Signup successful, you can redirect or perform other actions
                console.log("Signup successful!");

                // Set the email ID in a cookie
                cookies.set("email", formData.email, { path: "/" });

                // ? Update before deploying
                window.location.href = "http://localhost:3000/";
            } else {
                const data = await response.json();
                setError(data.message || "Signup failed.");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            setError("An error occurred while signing up.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-[#1a1c1e] p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-semibold mb-4 bg-inherit">
                    Sign Up
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
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium bg-[#1a1c1e]"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
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
                        Sign Up
                    </button>
                    {/* Link to Sign In */}
                    <p className="text-sm mt-4 bg-[#1a1c1e]">
                        Already have an account?{" "}
                        <Link href="/user/signin">
                            <span className="text-[#ffc37c] hover:underline bg-[#1a1c1e]">
                                Sign In
                            </span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
