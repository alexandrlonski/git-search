import React from "react";
import { FavCard } from "../components/FavCard";
import { useAppSelector } from "../hooks/redux";

export function FavouritesPage() {
    const { favourites  } = useAppSelector(state => state.github)

    if (favourites.length === 0) return <h1 className="text-2xl font-bold text-center mt-10">No Repos</h1>

    return (
        <div className="justify-center pt-10 mx-auto h-screen relative w-[560px]">
            <h1 className="text-2xl font-bold text-center mb-3">My Favourites Repos</h1>
            {favourites.map((repo => (
            <FavCard key={repo.id} repo={repo}></FavCard> 
            )))}
        </div>
        
        
    )
}