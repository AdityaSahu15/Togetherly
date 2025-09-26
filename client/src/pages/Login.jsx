import React from 'react'
import { assets } from '../assets/assets'
import { Star } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'
import { ReactTyped } from "react-typed"

const Login = () => {
  return (
    <div className="relative flex flex-col md:flex-row h-screen w-full bg-gradient-to-br from-indigo-200 via-white to-blue-100">
      {/* left side: branding */}
      <div className="flex flex-col justify-center items-center md:items-start md:pl-16 text-center md:text-left w-full md:w-1/2 p-6 space-y-8">

        <div className="flex items-center gap-4">
          <img
            src={assets.logo}
            alt="Togetherly logo"
            className="w-32 md:w-40 rounded-full shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-900">Togetherly</h1>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-8">
            <img src={assets.group_users} alt="" className="w-52 h-20" />
            <div className="space-y-3">
              <div className="flex gap-2 text-yellow-500">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400" />
                  ))}
              </div>
              <p className="text-base font-medium text-gray-600">
                Trusted by millions worldwide
              </p>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Let's Connect and Chill !
          </h1>

          {/* Typing Effect */}
          <p className=" text-lg md:text-xl text-gray-700 font-bold">
            <ReactTyped
              strings={[
                "Connect with people on Togetherly",
                "Meet new communities",
                "Share your thoughts freely",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center pr-8 md:pr-16">
        <div className="scale-95 md:scale-100">
          <SignIn />
        </div>
      </div>
    </div>
  )
}

export default Login
