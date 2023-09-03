"use client";

import Form from "@/components/form";
import Moodos from "@/components/moodos";
import Navbar from "@/components/navbar";
import { useMoodos } from "@/util/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import cow from "/public/cow.svg";

export default function Home() {
    const { moodos } = useMoodos();

    const [filteredMoodos, setFilteredMoodos] = useState([]);

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

    return (
        <main className="flex flex-col items-center max-h-screen p-10">
            <h2 className="flex flex-row text-3xl font-bold md:mb-12 gap-x-5">
                <Image src={cow} width="40" height="40" alt="logo" />
                MOODO List
                <Image src={cow} width="40" height="40" alt="logo" />
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
