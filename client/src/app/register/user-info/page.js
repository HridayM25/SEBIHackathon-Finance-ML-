'use client'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAgeGroup, setProfession } from '/src/utils/userSlice'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const professionName = ["Trader", "Chartered Accountant", "Software Engineer"]
const ageCategory = ["10-18", "18-30", "30+"]

export default function Register() {
    const profession = useSelector((state) => state.user.profession)
    const ageGroup = useSelector((state) => state.user.ageGroup)
    const dispatch = useDispatch()
    const [ageSelected, setAgeSelected] = useState(false)
    const [other, setOther] = useState(false)
    const [userProfession, setUserProfession] = useState("")
    const router = useRouter()

    const ageHandler = (value) => {
        setAgeSelected(true)
        dispatch(setAgeGroup(value))
    }

    const professionHandler = (value) => {
        dispatch(setProfession(value))
    }

    const submitHandler = () => {
        dispatch(setProfession(userProfession))
        router.push("/ipo")
    }

    return (
        <main className='h-screen flex flex-col justify-center items-center'>
            <div className='flex gap-2 mb-24 items-center justify-center'>
                <span className={` h-[2px] w-5 bg-black`}></span>
                <span onClick={() => setAgeSelected(false)} className=' h-7 w-7 rounded-full bg-black text-white flex items-center justify-center'>1</span>
                <span className={` h-[2px] w-72 ${ageSelected ? "bg-black" : "bg-gray-300"} transition-colors ease-out`}></span>
                <span className=' h-7 w-7 rounded-full bg-black text-white flex items-center justify-center'>2</span>
                <span className={`h-[2px] w-5 ${ageSelected ? "bg-black" : "bg-gray-300"} transition-colors ease-out`}></span>
            </div>
            <div>
                {!ageSelected && (
                    <section className='flex flex-col items-center gap-7'>
                        <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Age Group</div>
                        <div className='flex flex-col sm:flex-row gap-5'>
                            {ageCategory.map((data, index) => {
                                return (
                                    <button key={index} onClick={() => ageHandler(data)} className={`block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${ageGroup === data ? "bg-gray-300 border-2 border-black" : "bg-white"}`}>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data}</h5>
                                    </button>
                                )
                            })}
                        </div>
                    </section>
                )}
                {ageSelected && (
                    <section className='flex flex-col items-center gap-7'>
                        <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Profession</div>
                        <div className='flex gap-5 flex-col sm:flex-row'>
                            {professionName.map((data, index) => {
                                return (
                                    <button key={index} onClick={() => professionHandler(data)} className={`block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${profession === data ? "bg-gray-300 border-2 border-black" : "bg-white"}`}>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data}</h5>
                                    </button>
                                )
                            })}
                            <button
                                onClick={() => {
                                    setOther(true)
                                    professionHandler("")
                                }}
                                className={`block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${other && profession=="" ? "bg-gray-300 border-2 border-black" : "bg-white"}`}
                            >
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Others</h5>
                            </button>
                        </div>
                        {(other && profession=="") && (
                            <>
                                <input onChange={(e) => setUserProfession(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Teacher" required></input>
                            </>
                        )}
                        <button onClick={() => submitHandler(userProfession)} className='px-5 py-3 bg-black font-semibold text-white rounded-lg shadow-md hover:bg-gray-900' >
                            Submit!
                        </button>
                    </section>
                )
                }
            </div>
        </main>
    )
}