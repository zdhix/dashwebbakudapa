"use client";

import { motion } from "framer-motion";
import { FC } from "react";

const TextSection: FC = () => {
  return (
    <div className="max-auto max-w-screen-2xl p-4 md:p-1 2xl:p-10">
      <div className="bg-white dark:bg-gray-dark rounded-lg shadow-md p-6">
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-col justify-center'>
            <h1 className="text-[#176AD1] font-semibold text-5xl dark:text-white">Halo, </h1>
            <h2 className="text-[#ebb434] font-light text-3xl dark:text-[#ebb434]">
              Selamat Bakudapa Ulang!
              <motion.span
                className="text-[#ffc400] inline-block ml-3"
                animate={{ rotate: [0, 20, -20, 10, -10, 0] }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <span className="satoshi-icon">👏</span>
              </motion.span>
            </h2>
            <p className="text-black text-md max-w-md mt-12 dark:text-gray-200">
              "Bakudapa atau <span className="font-bold">Basis Data Khusus Transfer ke Daerah Provinsi Sulawesi Utara</span>,
              hadir sebagai aplikasi untuk memonitoring progres kinerja penyaluran Transfer ke Daerah di Provinsi Sulawesi Utara."
            </p>
          </div>

          {/* Logo Section */}
          <div className="flex-shrink-0 ml-6">
            <img src="/images/logo/logo-bakudapa.png" alt="Logo" className="w-32 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSection;
