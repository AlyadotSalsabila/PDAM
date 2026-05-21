"use client"

import { BASE_API_URL } from "@/global";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

type responregist = {
    success: boolean
    message: string
    token?: string
    role?: string
}

const RegistPage = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const url = `${BASE_API_URL}/admins`
        const payload = JSON.stringify({
            username,
            password,
            name,
            phone
        })

        try {
            const response = await axios.post(url, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "app-key": "db2af2f5b41b5659390392d04f0568dd4c97fb12"
                },
            })

            const data = response.data

            if (data.success) {
                toast(data.message, {
                    hideProgressBar: true,
                    containerId: `toastRegister`,
                    type: "success",
                    autoClose: 1000
                })

                setTimeout(() => router.replace('/admin/login'), 1000)

            } else {
                toast(data.message, {
                    hideProgressBar: true,
                    containerId: `toastRegister`,
                    type: "warning"
                })
            }

        } catch (error) {
            console.log("Error during registration:", error)

            toast(`Something wrong`, {
                hideProgressBar: true,
                containerId: `toastRegister`,
                type: "error"
            })
        }
    }

    return (
        <div className="min-h-screen flex bg-[#f4f7fb]">
            <ToastContainer containerId={`toastRegister`} />

            {/* LEFT SIDE */}
            <div className="hidden md:flex w-1/2 relative overflow-hidden">
                <Image
                    src="/pdam.png"
                    alt="PDAM"
                    fill
                    className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 to-cyan-900/40"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white w-full">

                    <div className="mb-8">
                        <h1 className="text-5xl font-bold tracking-wide">
                            CREATE ACCOUNT
                        </h1>

                        <div className="w-24 h-1 bg-cyan-300 mt-4 rounded-full mx-auto"></div>
                    </div>

                    <div className="max-w-md">
                        <h2 className="text-3xl font-semibold mb-4">
                            Sistem Pelayanan PDAM
                        </h2>

                        <p className="text-blue-100 leading-relaxed">
                            Daftarkan akun Anda untuk mengakses layanan pelanggan,
                            pembayaran tagihan air, dan informasi penggunaan dengan mudah.
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Register
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Buat akun admin baru
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

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

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Full Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Masukkan nama lengkap"
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Phone Number
                            </label>

                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Masukkan nomor telepon"
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-900 to-cyan-700 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
                        >
                            Registrasi
                        </button>

                        {/* Login */}
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                href="/admin/login"
                                className="text-cyan-700 font-semibold hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistPage
