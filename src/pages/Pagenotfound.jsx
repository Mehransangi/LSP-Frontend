import React from 'react'
import Layout from '../components/layout/layout'
import { Link } from 'react-router'

const Pagenotfound = () => {
  return (
    <Layout title={"404 - Page Not Found"}>
      <div className='flex flex-col justify-center items-center min-h-[80vh] text-center'>
      <h1 className='text-8xl font-black'>404</h1>
      <h1 className='font-medium text-2xl m-1'>PAGE NOT FOUND!!!</h1>
      <button className='bg-blue-700 rounded-lg p-4 text-white m-2 font-medium hover:bg-blue-800'><Link to='/'>GO BACK</Link></button>
      </div>
    </Layout>
  )
}

export default Pagenotfound