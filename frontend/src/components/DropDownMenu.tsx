import { User } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import { useAuth } from '../hooks/useAuth'

const DropDownMenu = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { handleLogout } = useAuth()
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
        <div className='relative hidden md:block' ref={ref} >
            <div onClick={() => setOpen(!open)} className="flex items-center w-10 h-10 bg-hard-background border border-border text-white font-semibold rounded-full justify-center cursor-pointer hover:bg-card" >
                <User className='text-black' />
            </div>

            {open &&
                <div onClick={handleLogout} className='absolute top-12 right-0 bg-hard-background py-2 px-4 font-medium border border-border rounded-lg cursor-pointer' >
                    Logout
                </div>}
        </div>

    )
}

export default DropDownMenu
