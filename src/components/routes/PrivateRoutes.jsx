import { useEffect, useState } from "react"
import { useAuth } from '../../context/auth.jsx'
import { Outlet } from "react-router"
import axios from "axios"
import Spinner from "../Spinner.jsx"

export const PrivateRoute = () => {
    const [ok, setOk] = useState()
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/auth/user-auth`)
            if (res.data.ok) { setOk(true) } else { setOk(false) }
        }
        if(auth?.token) authCheck()
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner/>
}
