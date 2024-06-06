import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useGetProductsQuery } from "../store/admin/productsApi"
import { useParams } from "react-router-dom"


const useInput = (restaurant, selectedCategory, updatedItem) => {

    const { res } = useParams()
    const { updateModal } = useSelector((state) => state.modals)
    const { data: menuItems } = useGetProductsQuery(res)


    let initialValue = {
        name: '',
        description: '',
        price: '',
        photo: null,
    }

    const [data, setData] = useState(initialValue)


    useEffect(() => {
        if (updateModal && menuItems.length) {
            delete updatedItem.photo
            setData(updatedItem || initialValue)
        } else {
            setData(initialValue)
        }
    }, [updateModal, updatedItem, menuItems])


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "photo" && files) {
            setData((prevData) => ({
                ...prevData,
                [name]: files[0],
                restaurant: restaurant,
                category: selectedCategory,
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
                restaurant: restaurant,
                category: selectedCategory,
            }));
        }
    };


    let formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)

    })

    return { data, handleChange, formData }
}

export default useInput