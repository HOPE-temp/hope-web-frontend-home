'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  ArrowLeft,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/home/header';
import Footer from '@/components/home/footer';
import { notFound } from 'next/navigation';
import { usePetById } from '@/hooks/usePetById';
import { useState } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const { pet, loading, error } = usePetById(id);
  const [activeImg, setActiveImg] = useState(0);
  const [birthdateStr, setBirthdateStr] = useState('Desconocido');
  const images =
    pet?.images && pet.images.length > 0 ? pet.images : ['/placeholder.svg'];

  useEffect(() => {
    if (pet?.birthdate) {
      setBirthdateStr(new Date(pet.birthdate).toLocaleDateString('es-ES'));
    }
  }, [pet?.birthdate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (images.length <= 1) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveImg(prev => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveImg(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  if (loading)
    return <div className="p-8 text-center">Cargando mascota...</div>;
  if (error || !pet) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link
            href="/mascotas"
            className="hover:text-teal-600 flex items-center"
          >
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
                <div className="relative w-full max-w-2xl aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src={images[activeImg]}
                    alt={`${pet.nickname} foto ${activeImg + 1}`}
                    fill
                    className="rounded-t-lg object-contain bg-white"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 800px"
                    priority={activeImg === 0}
                  />
                  {/* Botón anterior */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImg(prev =>
                            prev === 0 ? images.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                        aria-label="Anterior"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                      </button>
                      {/* Botón siguiente */}
                      <button
                        onClick={() =>
                          setActiveImg(prev =>
                            prev === images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                        aria-label="Siguiente"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-center gap-2">
                      {images.map((_: string, idx: number) => (
                        <button
                          key={`dot-${idx}`}
                          onClick={() => setActiveImg(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            activeImg === idx
                              ? 'bg-teal-600 w-6'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Ir a imagen ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2 justify-center flex-wrap px-4">
                      {images.map((img: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImg(idx)}
                          className={`border-2 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${
                            activeImg === idx
                              ? 'border-teal-600 ring-2 ring-teal-200'
                              : 'border-gray-200 hover:border-teal-400'
                          }`}
                          aria-label={`Ver imagen ${idx + 1}`}
                        >
                          <Image
                            src={img}
                            alt={`Miniatura ${idx + 1}`}
                            width={80}
                            height={60}
                            className="object-cover w-20 h-15"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Conoce a {pet.nickname}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {pet.descriptionHistory}
                </p>
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
                  <Badge
                    variant="outline"
                    className="capitalize text-lg px-3 py-1"
                  >
                    {pet.type === 'dog'
                      ? 'Perro'
                      : pet.type === 'cat'
                      ? 'Gato'
                      : pet.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Nacimiento
                    </p>
                    <p className="text-lg">{birthdateStr}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Esterilizado
                    </p>
                    <p className="text-lg">{pet.isSterilized ? 'Sí' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Sexo</p>
                    <p className="text-lg capitalize">
                      {pet.sex === 'male' ? 'Macho' : 'Hembra'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tamaño</p>
                    <p className="text-lg capitalize">
                      {pet.size === 'small'
                        ? 'Pequeño'
                        : pet.size === 'medium'
                        ? 'Mediano'
                        : pet.size === 'large'
                        ? 'Grande'
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
  );
}
