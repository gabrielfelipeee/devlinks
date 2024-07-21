import axios from "axios";
import { useEffect, useState } from "react";

const URL_USERS = "http://localhost:5287/api/Users";

const useFetchUsers = () => {
    const [users, setUsers] = useState();
    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
        try {
            const response = await axios.get(URL_USERS, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = response.data;
            setUsers(data);
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token])

    return {
        users
    }
};
export default useFetchUsers;
