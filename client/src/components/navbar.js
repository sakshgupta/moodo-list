import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Navbar = () => {
    const searchParams = useSearchParams();
    const moodosFilter = searchParams.get("moodos");

    return (
        <nav className="sm:w-3/4 sm:mx-auto sm:mt-8">
            <ul className="flex justify-between border-b border-gray-300">
                <NavItem href="/" active={moodosFilter === null}>
                    All
                </NavItem>
                <NavItem
                    href="/?moodos=active"
                    active={moodosFilter === "active"}
                >
                    Active
                </NavItem>
                <NavItem
                    href="/?moodos=completed"
                    active={moodosFilter === "completed"}
                >
                    Completed
                </NavItem>
            </ul>
        </nav>
    );
};

const NavItem = ({ href, active, children }) => (
    <li className={active ? "border-b-2 border-[#ffc37c]" : ""}>
        <Link href={href}>
            <span
                className={`block p-4 text-lg ${
                    active ? "text-[#ffc37c] font-semibold" : "text-gray-500"
                }`}
            >
                {children}
            </span>
        </Link>
    </li>
);

export default Navbar;
