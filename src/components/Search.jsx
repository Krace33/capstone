import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { callAPI } from '../utils/CallApi';
import { createSearchParams, useNavigate } from 'react-router-dom';

const Search = () => {
    const [suggestions, setSuggestions] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();

      navigate({
        pathname: "search",
        search: `${
            createSearchParams({
                category: `${category}`,
                searchTerm: `${searchTerm}`
            })
        }`
      })

      setSearchTerm("");
      setCategory("All");
    }
    

    const getSuggestions = () => {
        callAPI('data/suggestions.json')
        .then((suggestionResults) => {
            setSuggestions(suggestionResults);
        })
    }

    useEffect(() => {
        getSuggestions();
    }, [])

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') handleSubmit(e);
    }

  return (
    <div className='w-[100%]'>
      <div className='flex items-center h-10 bg-amazonclone-yellow'>
        <select onChange={(e) => setCategory(e.target.value)} className='p-2 bg-gray-300 text-black border text-xs xl:text-sm'>
            <option value="All">All</option>
            <option value="Deals">Deals</option>
            <option value="Amazon">Amazon</option>
            <option value="Fashion">Fashion</option>
            <option value="Computers">Computers</option>
            <option value="Home">Home</option>
            <option value="Mobile">Mobile</option>
        </select>
        <input value={searchTerm} onKeyDown={handleKeyDown} onChange={(e) => setSearchTerm(e.target.value)} type="text" 
        className='flex grow items-center h-[100%] rounded-l text-black pl-3'/>
        <button onClick={handleSubmit} className='w-[45px]'>
            <MagnifyingGlassIcon className='h-[27px] m-auto stroke-slate-900'/>
        </button>
      </div>
      { suggestions &&
        <div className='bg-white text-black w-full z-40 absolute'>
            {
                suggestions.filter((suggestion) => {
                    const currentSearchTerm = searchTerm.toLowerCase();
                    const title = suggestion.title.toLowerCase();
                    return (
                        currentSearchTerm &&
                        title.includes(currentSearchTerm) &&
                        title !== currentSearchTerm
                    )
                })
                .slice(0, 10)
                .map((suggestion) => (
                    <div key={suggestion.id} onClick={() => setSearchTerm(suggestion.title)}>
                        {suggestion.title}
                    </div>
                ))
            }
        </div>
      }
    </div>
  )
}

export default Search
