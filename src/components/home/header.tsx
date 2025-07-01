"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-3 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full">
                            <Image
                                src="/images/logo_HOPE.png"
                                alt="Logo HOPE"
                                width={60}
                                height={40}
                                className="rounded-full bg-white"
                                priority
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-teal-900">HOPE</h1>
                            <p className="text-sm text-gray-600">Arequipa</p>
                        </div>
                    </div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-6">
						<Link
							href="home/#inicio"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Inicio
						</Link>
						<Link
							href="home/#nosotros"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Nosotros
						</Link>
						<Link
							href="/mascotas"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Mascotas
						</Link>
						<Link
							href="/adoption"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Adopción
						</Link>
						<Link
							href="home/#donaciones"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Donaciones
						</Link>
						<Link
							href="home/#contacto"
							className="text-gray-700 hover:text-teal-600 transition-colors"
						>
							Contacto
						</Link>
					</nav>

                    {/* Navbar mobile */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Abrir menú</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <nav className="flex flex-col gap-4 mt-8">
                                    <Link
                                        href="home/#inicio"
                                        className="text-lg font-medium hover:text-teal-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Inicio
                                    </Link>
                                    <Link
                                        href="home/nosotros"
                                        className="text-lg font-medium hover:text-teal-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Nosotros
                                    </Link>
                                    <Link
                                        href="/mascotas"
                                        className="text-lg font-medium hover:text-teal-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Mascotas
                                    </Link>
                                    <Link
                                        href="/adopcion"
                                        className="text-lg font-medium hover:text-teal-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Adopción
                                    </Link>
                                    
                                    <Link
                                        href="home/#contacto"
                                        className="text-lg font-medium hover:text-teal-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Contacto
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="hidden md:flex items-center space-x-3">
                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="border-teal-600 text-teal-600 hover:bg-teal-50"
                            >
                                Iniciar Sesión
                            </Button>
                        </Link>

                    </div>
                </div>
            </div>
        </header>
    )
}