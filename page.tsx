"use client"

import { BASE_API_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookies";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

type responseLogin = {
    success: boolean
    message: string
    token?: string
    role?: string
}

const LoginPage = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()

            const url = `${BASE_API_URL}/auth`
            const payload = JSON.stringify({ username, password })

            const response = await axios.post(url, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "app-key": "db2af2f5b41b5659390392d04f0568dd4c97fb12"
                },

                data: payload
            })

            const data: responseLogin = response.data

            if (data.success == true) {
                const role = data.role

                if (role === `CUSTOMER`) {
                    toast(data.message, {
                        hideProgressBar: true,
                        containerId: `toastLogin`,
                        type: "success",
                        autoClose: 2000
                    })

                    storeCookie("token", data.token || '')
                    storeCookie("role", data.role || '')

                    setTimeout(() => {
                        window.location.href = (`/customer/dashboard`)
                    }, 1000)

                } else {
                    toast('Anda bukan customer', {
                        hideProgressBar: true,
                        containerId: `toastLogin`,
                        type: "warning",
                        autoClose: 2000
                    })
                }
            } else {
                toast(data.message, {
                    hideProgressBar: true,
                    containerId: `toastLogin`,
                    type: "warning"
                })
            }

        } catch (error) {
            console.log(error)

            toast(`Something wrong`, {
                hideProgressBar: true,
                containerId: `toastLogin`,
                type: "error"
            })
        }
    }

    return (
        <div className="min-h-screen flex bg-[#f4f7fb]">
            <ToastContainer containerId={`toastLogin`} />

            {/* LEFT SIDE */}
            <div className="hidden md:flex w-1/2 relative overflow-hidden">
                <Image
                    src="/pdam.png"
                    alt="PDAM"
                    fill
                    className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-950/80 to-cyan-900/40"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white w-full">
                    <div className="mb-8">
                        <h1 className="text-5xl font-bold tracking-wide">
                            WELCOME
                        </h1>

                        <div className="w-24 h-1 bg-cyan-300 mt-4 rounded-full mx-auto"></div>
                    </div>

                    <div className="max-w-md">
                        <h2 className="text-3xl font-semibold mb-4">
                            Sistem Pelayanan PDAM
                        </h2>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                    
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Login
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Silakan masuk ke akun customer Anda
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Username
                            </label>

                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Masukkan username"
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-sm text-cyan-700 hover:underline"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Masukkan password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                href="#"
                                className="text-sm text-cyan-700 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-linear-to-r from-blue-900 to-cyan-700 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
                        >
                            Login
                        </button>

                        {/* Register */}
                        <p className="text-center text-sm text-gray-500">
                            Belum punya akun?{" "}
                            <Link
                                href="/admin/register"
                                className="text-cyan-700 font-semibold hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;