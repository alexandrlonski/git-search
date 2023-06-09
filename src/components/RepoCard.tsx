import React, { useState } from "react"
import { useActions } from "../hooks/actions"
import { useAppSelector } from "../hooks/redux";
import { IRepo } from "../models/models"

export function RepoCard({ repo, addBtn } :{ repo: IRepo, addBtn?: boolean }) {

    const { addFavourite, removeFavourite }  = useActions();
    const { favourites } = useAppSelector(state => state.github);
    
   const addToFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault();
     addFavourite(repo);
   }
   const removeFromFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault();
     removeFavourite(repo.id);
   }

    return (
        <div className="border py-3 px-5 rouded mb-2 hover:shadow-md hover:bg-gray-100 transition-all cursor-pointer">
            <a href={repo.html_url} target="_blank">
                <h2 className="text-lg font-bold">{repo.full_name}</h2>
                <p>
                    Forks: <span className="font-bold mr-2">{repo.forks}</span>
                    Watchers: <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin">{repo.description}</p>
            </a>
            {!favourites.map(repo => repo.id).includes(repo.id)
                ?
                <button type="button" onClick={addToFavourite} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add</button>
                :
                <button type="button" onClick={removeFromFavourite} className="focus:outline-none text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Remove</button>
            }
        </div>
    )
}