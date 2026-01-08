import React from 'react'
import Layout from "../components/layout/Layout"
import { Link } from 'react-router'

const Pagenotfound = () => {
  return (
    <Layout title={"404 - Page Not Found"}>
      <div className='flex flex-col justify-center items-center text-center'>
      <h1 className='text-8xl font-black'>404</h1>
      <h1 className='font-medium text-2xl m-1'>PAGE NOT FOUND!!!</h1>
      <button className='btn max-w-2xl'><Link to='/'>GO BACK</Link></button>
      </div>
    </Layout>
  )
}

export default Pagenotfound