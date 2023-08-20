'use client'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAgeGroup, setProfession } from '/src/utils/userSlice'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
        router.push("/ipo")

    }



    return (
        <main className='h-screen flex justify-center items-center'>
            {!ageSelected && (
                <section className='flex flex-col items-center gap-7'>
                    <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Age Group</div>
                    <div className='flex gap-5'>
                        <button onClick={() => ageHandler("10-18")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">10-18</h5>
                        </button>
                        <button onClick={() => ageHandler("18-30")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">18-30</h5>
                        </button>
                        <button onClick={() => ageHandler("30+")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">30+</h5>
                        </button>
                    </div>
                </section>
            )}
            {ageSelected && (
                <section className='flex flex-col items-center gap-7'>
                    <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Profession</div>
                    <div className='flex gap-5'>
                        <button onClick={() => professionHandler("Trader")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Trader</h5>
                        </button>
                        <button onClick={() => professionHandler("Chartered Accountant")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Charterd Accountant</h5>
                        </button>
                        <button onClick={() => professionHandler("Software Engineer")} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Software Engineer</h5>
                        </button>
                        <button onClick={() => setOther(true)} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Others</h5>
                        </button>
                    </div>
                    {other && (
                        <>
                            <input onChange={(e) => setUserProfession(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Teacher" required></input>
                            <button onClick={() => professionHandler(userProfession)} className='px-5 py-3 bg-black font-semibold text-white rounded-lg shadow-md hover:bg-gray-900' >
                                Submit!
                            </button>
                        </>
                    )}
                </section>
            )
            }
        </main>
    )
}