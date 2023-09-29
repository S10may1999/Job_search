import { useState,useEffect } from "react";
import axios from "axios";


const useFeth=(endpoint,query)=>{

    const [data,setData]=useState([]);
    const [isLoading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
          ...query
        },
        headers: {
          'X-RapidAPI-Key':'9d8a59e8c6mshf68e1dd5aaa2f7ap16a5a2jsna425544ee488',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };

    const fetchData=async()=>{
        setLoading(true);

        try{
            const response=await axios.request
            (options);

            setData(response.data.data);
            setLoading(false);
        } catch(error){
            setError(error);
            alert('there is an error')
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const refetch=()=>{
        setLoading(true);
        fetchData();
    }

    return {data, isLoading,error,refetch};
}

export default useFeth
