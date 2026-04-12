import { Menu, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const MobileNavbar = () => {

    const [open, setOpen] = useState(false)
    const { handleLogout } = useAuth();
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleEventClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleEventClick)

        return () => document.removeEventListener('mousedown', handleEventClick)
    }, [])


    return (
        <div className='reletive block md:hidden' ref={ref} >
            <div onClick={() => setOpen(!open)} >
                {open ? <X /> : <Menu />}
            </div>

            {
                open &&
                <ul className="absolute right-0 top-12 bg-white w-full p-4 flex flex-col  gap-6 text-base font-medium text-text-secondary">
                    <li>
                        <NavLink replace onClick={() => setOpen(false)} to='/' className="hover:text-primary cursor-pointer transition">Home</NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => setOpen(false)} to='/entry' className="hover:text-primary cursor-pointer transition">Entry</NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => setOpen(false)} to='/print' className="hover:text-primary cursor-pointer transition">Print</NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => setOpen(false)} to='/add' className="hover:text-primary cursor-pointer transition">Add</NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => setOpen(false)} to='/defaulter' className="hover:text-primary cursor-pointer transition">Defaulter</NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => setOpen(false)} to='/bin' className="hover:text-primary cursor-pointer transition">Bin</NavLink>

                    </li>

                    <li onClick={handleLogout} className='w-full text-center bg-hard-background py-2 px-4 font-medium border border-border rounded-lg cursor-pointer' >Logout</li>
                </ul>
            }

        </div>
    )
}

export default MobileNavbar
