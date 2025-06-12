import { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate, useLocation } from "react-router"
import { Alert } from "@mui/material"

const AddBasket = () => {
  const naviage = useNavigate()
  const location = useLocation();
  const prd = location.state ? location.state.prod : null
  const [product, setProduct] = useState(prd ? prd._id : "")
  const [error, setError] = useState("")

  const Add = async () => {
    const token = sessionStorage.getItem("Token")
    if (!token) alert("אופס אינך מורשה להיכנס🤔 הירשם!");
    else {
      try {
        const { data } = await Axios.post("http://localhost:7002/api/basketShop/", { product },
          { headers: { 'Authorization': `Bearer ${token}` } })
          alert(data.massage)
        naviage('/product')
      }

      catch (error) {
        setError(JSON.parse(error.request.response).message)
      }
    }
  }

  useEffect(() => {
    Add()
  }, [])

  return <>
      {error && <Alert severity="error">{error}</Alert>}
  </>
}
export default AddBasket