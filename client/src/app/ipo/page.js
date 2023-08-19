'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "/src/components/ui/select"
import { useEffect,useState } from "react"
import axios from 'axios'


export default function IPO() {

    const axios = require('axios');
    const [data, setData] = useState({})

    const fetchData = async() => {
        const response = await axios.get('http://localhost:8000/getIPO')
        // const result = await response.json()
        console.log(response)

        setData(response.data)
    }

    useEffect(() => {
        fetchData()
    },[])

    const valueChangeHandler = async(e) => {
        const response = await axios.post('/processIPO', {
            IPOIndex: e,
          })
        if (response.ok){
            console.log("selected IPO")
        }
    }

    return (
        <main className="h-screen flex flex-col items-center justify-center gap-14">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-gray-400 inline text-[72px] font-bold">
                IPOwiseAI
            </h1>
            <div>
                <h3 className="">Select the ipo you want to analyze</h3>
            </div>
            <Select onValueChange={(e) => valueChangeHandler(e)}>
                <SelectTrigger className="w-fit p-4">
                    <SelectValue placeholder="IPO Name" />
                </SelectTrigger>
                <SelectContent >
                    {Object.keys(data).map((data, index) => {
                        return  <SelectItem value={index} key={index}>{data}</SelectItem>
                    })}
                </SelectContent>
            </Select>
        </main>
    )
}