import React from 'react'

const SearchBar = () => {
    return (
        <div className="flex items-center" >
            {/* Right Search Bar */}
            <input
                type="text"
                placeholder="Search..."
                className="w-40 md:w-64 px-2 py-1 rounded-lg border border-border bg-background text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div >
    )
}

export default SearchBar
