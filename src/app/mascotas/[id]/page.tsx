"use client";

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  ArrowLeft,
  MapPin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import { notFound } from "next/navigation"
import { usePetById } from "@/hooks/usePetById"
import { useState } from "react"

interface PageProps {
  params: {
    id: string
  }
}

export default function PetDetailPage({ params }: PageProps) {
  const { id } = params
  const { pet, loading, error } = usePetById(id)
  const [activeImg, setActiveImg] = useState(0)
  const [birthdateStr, setBirthdateStr] = useState("Desconocido")

  useEffect(() => {
    if (pet?.birthdate) {
      setBirthdateStr(new Date(pet.birthdate).toLocaleDateString("es-ES"))
    }
  }, [pet?.birthdate])

  if (loading) return <div className="p-8 text-center">Cargando mascota...</div>
  if (error || !pet) {
    notFound()
    return null
  }

  const images = pet.images && pet.images.length > 0 ? pet.images : ["/placeholder.svg"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/mascotas" className="hover:text-teal-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver a Mascotas
          </Link>
          <span>/</span>
          <span>{pet.nickname}</span>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Card de mascota - Imágenes y Descripción */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0 flex flex-col items-center">
                <div className="relative w-full max-w-xl aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src={images[activeImg]}
                    alt={`${pet.nickname} foto ${activeImg + 1}`}
                    width={400}
                    height={300}
                    className="rounded-t-lg object-cover"
                    style={{ minWidth: 300, minHeight: 225 }}
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                  {/* Botón anterior */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
                        aria-label="Anterior"
                      >
                        &#8592;
                      </button>
                      {/* Botón siguiente */}
                      <button
                        onClick={() => setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
                        aria-label="Siguiente"
                      >
                        &#8594;
                      </button>
                    </>
                  )}
                </div>
                {/* Miniaturas */}
                {images.length > 1 && (
                  <div className="flex gap-2 mt-4 justify-center">
                    {images.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImg(idx)}
                        className={`border-2 rounded-lg overflow-hidden ${activeImg === idx ? "border-teal-600" : "border-transparent"}`}
                        style={{ padding: 0 }}
                        aria-label={`Ver imagen ${idx + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`Miniatura ${idx + 1}`}
                          width={60}
                          height={45}
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Conoce a {pet.nickname}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{pet.descriptionHistory}</p>
              </CardContent>
            </Card>
          </div>
          {/* Crsd de mascota- Información y Contacto */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl">{pet.nickname}</CardTitle>
                    <p className="text-lg text-gray-600">{pet.breed}</p>
                  </div>
                  <Badge variant="outline" className="capitalize text-lg px-3 py-1">
                    {pet.type === "dog" ? "Perro" : pet.type === "cat" ? "Gato" : pet.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nacimiento</p>
                    <p className="text-lg">{birthdateStr}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Esterilizado</p>
                    <p className="text-lg">{pet.isSterilized ? "Sí" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Sexo</p>
                    <p className="text-lg capitalize">{pet.sex === "male" ? "Macho" : "Hembra"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tamaño</p>
                    <p className="text-lg capitalize">
                      {pet.size === "small"
                        ? "Pequeño"
                        : pet.size === "medium"
                        ? "Mediano"
                        : pet.size === "large"
                        ? "Grande"
                        : pet.size}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Arequipa</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
