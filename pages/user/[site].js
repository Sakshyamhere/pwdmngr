import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function Site() {
    const router = useRouter()
    const [authable, setAuthable] = useState(false)
    useEffect(() => {
    const auth = localStorage.getItem("auth")
    const useemail = localStorage.getItem("email")
    const usesite = router.query.site
    if (auth === "true") {
        setAuthable(true)
        getData(useemail , usesite)
    }
    else {
       router.push('/')
       return;
    }
    }, [])
    const getData = async(email , site) => {
        try {
            const resData = await axios.get(`/api/getData?user=${email}&site=${site}`);
            console.log(resData);
            const data = await resData.data;
            setUserData(data);
          } catch (error) {
            console.log(error);
          }
    }
   return (
    <div>
        {authable && (
        <div>
            {router.query.site}
        </div>
        )}
    </div>
   )
 
}

export default Site