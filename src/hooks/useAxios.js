import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { instance } from '../Utils/request';

const useAxios = (url) => {
    const { res } = useParams();
    const [data, setData] = useState([]);
    const [restData, setRestData] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const getRes = async () => {
        const response = await instance.get(`admins/restaurants/${res}`)
        setRestData(response.data)
    }

    // const getCategoriesData = async () => {
    //     try {
    //         const response = await instance.get(`${url}/${res}`)
    //         setData(prevData => (prevData !== response.data ? response.data : prevData))
    //     } catch (error) {
    //         setError(error);
    //     } finally {
    //         setLoading(false);
    //     }

    // };




    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         await getCategoriesData()
        //     } catch (error) {
        //         setError(error);
        //     }
        // };

        getRes()

        // fetchData();
    }, [res,]);




    // const createMenu = async (url, data) => {
    //     try {
    //         const response = await instance.post(url, data);
    //         console.log(response)

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const createCategory = async (url, data) => {
        try {
            const response = await instance.post(url, data)
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }



    return { data, restData, error, loading, createCategory };
}

export default useAxios;
