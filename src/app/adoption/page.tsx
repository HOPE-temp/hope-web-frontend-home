"use client"

import { useState } from "react"
import Image from "next/image"
import perro from "/images/perro-banner.jpg"

import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import TabRequisitos from "@/components/adoption/TabRequisitos"
import TabDatosPersonales from "@/components/adoption/TabDatosPersonales"
import TabFormulario from "@/components/adoption/TabFormulario"

export default function Page() {
  const [tab, setTab] = useState<"requisitos" | "datos" | "formulario">("requisitos")

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/perro-banner.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
            className="opacity-200"
          />
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Proceso de Adopción</h1>
            <p className="text-xl text-teal-100 mb-8">Estas a punto de darle un hogar a un animalito. Completa el proceso para iniciar tu solicitud</p>
            <div className="flex justify-center space-x-4">
              
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal con margen */}
      <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded shadow-lg">
        {/* Tabs */}
        <div className="flex justify-between border-b mb-6">
          <button
            className={`flex-1 py-2 text-center ${
              tab === "requisitos"
                ? "border-b-4 border-teal-600 font-semibold text-black"
                : "text-gray-600"
            }`}
            onClick={() => setTab("requisitos")}
          >
            Requisitos
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              tab === "datos"
                ? "border-b-4 border-teal-600 font-semibold text-black"
                : "text-gray-600"
            }`}
            onClick={() => setTab("datos")}
          >
            Datos Personales
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              tab === "formulario"
                ? "border-b-4 border-teal-600 font-semibold text-black"
                : "text-gray-600"
            }`}
            onClick={() => setTab("formulario")}
          >
            Formulario
          </button>
        </div>

        {/* Contenido de cada tab */}
        <div className="mt-6">
          {tab === "requisitos" && <TabRequisitos />}
          {tab === "datos" && <TabDatosPersonales />}
          {tab === "formulario" && <TabFormulario />}
        </div>
      </div>
    </div>
  )
}



