"use client";

import Form from "@/components/form";
import Moodos from "@/components/moodos";
import Navbar from "@/components/navbar";
import { useMoodos } from "@/util/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import cow from "/public/cow.webp";
import Cookies from "universal-cookie";

export default function Home() {
    const { moodos, auth, fetchAuthData } = useMoodos();
    const router = useRouter();

    const [filteredMoodos, setFilteredMoodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to handle filtering based on a tag
    const handleFilter = (tag) => {
        const filtered = moodos.filter((moodo) => moodo.tags.includes(tag));
        setFilteredMoodos(filtered);
    };

    // Filter moodos based on the search query
    const handleSearch = (searchQuery) => {
        const filtered = moodos.filter((moodo) =>
            moodo.task.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMoodos(filtered);
    };

    const clearFilter = () => {
        setFilteredMoodos(moodos);
    };

    useEffect(() => {
        setFilteredMoodos(moodos);
    }, [moodos]);

    console.log(moodos);
    useEffect(() => {
        const URL = "http://localhost:5001";
        fetch(`${URL}/moodos/sakshamgupta.dev@gmail.com/get`)
            .then((response) => response.json())
            .then((data) => {
                // Process the data as needed
                console.log("Server Started!!");
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

        fetchAuthData().then(() => {
            setIsLoading(false);
        });
    }, []);

    // Check if the user is not authenticated and redirect to /user/signup
    // useEffect(() => {
    //     if (!auth) {
    //         console.log("hello" + auth);
    //         router.push("/user/signup");
    //     }
    // }, [auth]);

    // Function to handle logout
    const handleLogout = () => {
        // Remove the 'email' cookie
        const cookies = new Cookies();
        cookies.remove("email", { path: "/" });

        window.location.reload();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!auth) {
        // Redirect or display a message
        router.push("/user/signin");
        return <div>Redirecting...</div>;
    }

    return (
        <main className="relative flex flex-col items-center max-h-screen p-10">
            <div className="absolute top-0 right-0 mt-2 mr-4">
                <button
                    onClick={handleLogout}
                    className="text-[#ffc37c] hover:text-[#ffd5a3]"
                >
                    Logout
                </button>
            </div>
            <h2 className="flex flex-row text-3xl font-bold md:mb-12 gap-x-5">
                <Image
                    src={cow}
                    width="40"
                    height="40"
                    alt="logo"
                    className="hidden sm:block"
                />

                <span>MOODO List</span>

                <Image
                    src={cow}
                    width="40"
                    height="40"
                    alt="logo"
                    className="hidden sm:block"
                />
            </h2>
            <Navbar />
            <Form
                handleFilter={handleFilter}
                clearFilter={clearFilter}
                handleSearch={handleSearch}
            />
            <div className="flex-grow overflow-y-auto">
                <Moodos allMoodos={filteredMoodos} />
            </div>
        </main>
    );
}
