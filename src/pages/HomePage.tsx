import React, { useEffect, useState } from "react";
import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api";

export function HomePage() {
    const [search, setSearch] = useState('');
    const debounced = useDebounce(search);
    const [dropdown, setDropdown] = useState(false)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
      skip: debounced.length < 3,
      refetchOnFocus: true
    });
    const [fetchRepos, {isLoading: areReposLoading, isError: isReposError, data: repos}] = useLazyGetUserReposQuery()

    useEffect(()=> {
      setDropdown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data])

    const clickHandler = (name: any) => {
      fetchRepos(name); 
      setDropdown(false);
    }
    
    return (
      <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
        { isError && <p className="text-center text-red-600">Something went wrong...</p>}

        <div className="relative w-[560px]">
          <input
            type="text"
            className="border py-2 px-4 w-full h-[42px] mb-2"
            placeholder="Search for Github username..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          { dropdown && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
            { isLoading &&  <p className="text-center text-green-600">Loading...</p>}
            { data?.map((user) => (
              <li 
                key={user.id}
                onClick={()=> clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >{user.login}</li>
            ))}
          </ul>}
          <div>
            { areReposLoading && <p className="text-center text-green-600">Repos Loading...</p>}
            { repos && repos.map((repo: any) => (
              <RepoCard key={repo.id} repo={repo}/>
            ))}
          </div>
        </div>
      </div>
    )
}
