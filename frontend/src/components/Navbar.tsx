import { Link, NavLink, useLocation } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import MobileNavbar from "./MobileNavbar";


const Navbar = () => {

    const location = useLocation()

    return (

        <nav className="max-w-7xl mx-auto px-2 xl:px-0 py-3 flex items-center justify-between">

            {/* Left Logo */}
            <Link to={'/'} replace className="text-xl font-bold text-primary tracking-wide">
                Finance
            </Link>

            {/* Center Menu */}
            <ul className="hidden md:flex items-center gap-6 text-base font-medium text-text-secondary">
                <li>
                    <NavLink to='/' replace className="hover:text-primary cursor-pointer transition">Home</NavLink>
                </li>

                <li>
                    <NavLink to='/entry' className="hover:text-primary cursor-pointer transition">Entry</NavLink>
                </li>

                <li>
                    <NavLink to='/print' className="hover:text-primary cursor-pointer transition">Print</NavLink>
                </li>

                <li>
                    <NavLink to='/add' className="hover:text-primary cursor-pointer transition">Add</NavLink>
                </li>

                <li>
                    <NavLink to='/defaulter' className="hover:text-primary cursor-pointer transition">Defaulter</NavLink>
                </li>

                <li>
                    <NavLink to='/bin' className="hover:text-primary cursor-pointer transition">Bin</NavLink>

                </li>

            </ul>


            {/* Full Right Side  */}
            <div className="flex items-center gap-2" >
                {/* Right Search Bar
                {
                    location.pathname === '/' && <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-40 md:w-64 px-2 py-1 rounded-lg border border-border bg-background text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                } */}

                {/* Dropw Down */}
                <DropDownMenu />

                {/* Hamburger */}
                <MobileNavbar />
            </div>


        </nav>
    );
};

export default Navbar;