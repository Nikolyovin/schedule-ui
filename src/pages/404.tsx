import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Error404 = () => {
  const router = useRouter()

  //   const redirect = router.push({
  //     pathname: '/login',
  //   })

  //   useEffect(() => {
  //     setTimeout(redirect, 3000)
  //   }, [])
  return (
    <>
      <div>Ошибка 404</div>
      <div>Страница не найдена!</div>
    </>
  )
}

export default Error404
