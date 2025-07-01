"use client"

import { useState } from "react"
import Image from "next/image"

import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import TabRequisitos from "@/components/adoption/TabRequisitos"
import TabDatosPersonales from "@/components/adoption/TabDatosPersonales"
import TabFormulario from "@/components/adoption/TabFormulario"

export default function Page() {
  const [tab, setTab] = useState<"requisitos" | "datos" | "formulario">("requisitos")

  return (
    

        <div className="min-h-screen bg-white">
        {/* Tabs */}
        <div className="max-w-4xl mx-auto mt-8 px-4">
            <div className="flex justify-between border-b">
            <button
                className={`flex-1 py-2 text-center ${
                tab === "requisitos"
                    ? "border-b-4 border-green-600 font-semibold text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setTab("requisitos")}
            >
                Requisitos
            </button>
            <button
                className={`flex-1 py-2 text-center ${
                tab === "datos"
                    ? "border-b-4 border-green-600 font-semibold text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setTab("datos")}
            >
                Datos Personales
            </button>
            <button
                className={`flex-1 py-2 text-center ${
                tab === "formulario"
                    ? "border-b-4 border-green-600 font-semibold text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setTab("formulario")}
            >
                Formulario
            </button>
            </div>

            {/* Contenido del tab */}
            <div className="mt-6">
            {tab === "requisitos" && <TabRequisitos />}
            {tab === "datos" && <TabDatosPersonales />}
            {tab === "formulario" && <TabFormulario />}
            </div>
        </div>
        </div>
    
  )
}


