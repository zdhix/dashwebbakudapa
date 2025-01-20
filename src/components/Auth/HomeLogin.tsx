"use client"
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faFax } from '@fortawesome/free-solid-svg-icons';
import { ReactTyped } from "react-typed";

const HomeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password, "Remember Me:", rememberMe);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg font-satoshi">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 bg-white md:rounded-r-[3rem] rounded-b-2xl md:rounded-bl-none">
        {/* Logo Kemenkeu */}
        <div className="flex justify-start items-start">
          <img src="/images/logo/logo-kemenkeu.png" alt="Logo Kementrian Keuangan Republik Indonesia" className="w-20 h-20 md:w-24 md:h-24 ml-8 mt-4" />
          <div className="m-4">
            <h1 className="text-base sm:text-lg md:text-xl font-satoshi font-bold">KEMENKEU RI</h1>
            <h2 className="text-sm sm:text-base md:text-lg font-satoshi font-bold">DITJEN PERBENDAHARAAN</h2>
            <h3 className="font-bold text-sm sm:text-base md:text-lg text-[#176AD1] font-satoshi">Kanwil DJPb Prov. Sulawesi Utara</h3>
          </div>
        </div>

        {/* Logo Bakudapa */}
        <motion.div 
          className="flex flex-col justify-center items-center flex-grow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/images/logo/logo-bakudapa.png"
            alt="Logo Aplikasi Bakudapa"
            className="w-1/2 md:w-2/3 max-w-xs"
          />
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl text-[#176AD1] font-bold mt-2 sm:mt-4 font-satoshi">BAKUDAPA</h1>
        </motion.div>

        {/* Contact Info */}
        <div className="flex flex-row items-start mt-8 md:mt-auto">
          <img src="/images/logo/logo-djpb.png" alt="Logo Ditjen Perbendaharaan" className="w-20 h-20 md:w-24 md:h-24 ml-8 mt-4" />
          <div className="m-4">
            <div className="flex items-start mt-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-base md:text-lg text-[#176AD1] mr-2 mt-1" />
              <div>
                <h3 className="font-medium text-base md:text-lg font-satoshi">Alamat</h3>
                <p className="text-sm md:text-base font-satoshi">Gedung Keuangan Negara Manado Lt. 3 Jl. Bethesda No.8 Manado 95114</p>
              </div>
            </div>
            <div className="flex space-x-8 mt-4">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faPhoneAlt} className="text-base md:text-lg text-[#176AD1] mr-2 mt-1" />
                <div>
                  <h3 className="font-medium text-base md:text-lg font-satoshi">Telp:</h3>
                  <p className="text-sm md:text-base font-satoshi">0431-848444</p>
                </div>
              </div>
              <div className="flex items-start">
                <FontAwesomeIcon icon={faFax} className="text-base md:text-lg text-[#176AD1] mr-2 mt-1" />
                <div>
                  <h3 className="font-medium text-base md:text-lg font-satoshi">Fax:</h3>
                  <p className="text-sm md:text-base font-satoshi">0431-848666</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <motion.div 
        className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#fbeb39] via-[#32bee9] to-[#176AD1] p-8 md:p-12 md:rounded-l-[3rem] rounded-t-2xl md:rounded-tl-none relative overflow-hidden"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Waves */}
        <div className="absolute bottom-0 left-0 w-full h-full">
          <div className="absolute inset-0 z-10 backdrop-blur-md bg-white bg-opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-white bg-opacity-50 rounded-tl-full rounded-tr-full animate-wave"></div>
          <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-white bg-opacity-50 rounded-tl-full rounded-tr-full animate-wave-reverse"></div>
        </div>

        <div className="relative z-20 w-full max-w-lg bg-white bg-opacity-80 p-8 md:p-10 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#176AD1] text-center md:text-left font-satoshi">
            LOG IN AKUN
          </h2>
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-[#ebb434] text-center md:text-left font-satoshi">
            <ReactTyped strings={["Halo, Selamat Datang #SobatDJPB !"]} typeSpeed={50} backSpeed={50} loop />
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-[#ebb434] font-satoshi mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-lg font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary font-satoshi"
                placeholder="Masukkan Email Anda"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-[#ebb434] font-satoshi mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-lg font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary font-satoshi"
                placeholder="Masukkan Password Anda"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-base text-gray-600 font-satoshi">
                  Ingat Saya
                </label>
              </div>

              <Link
                href="/auth/forgot-password"
                className="select-none text-lg font-normal text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary font-satoshi"
              >
                Lupa Sandi?
              </Link>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-2/3 flex max-w-sm justify-center py-4 px-6 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-[#176AD1] hover:bg-[#ebb434] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 font-satoshi"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeLogin;