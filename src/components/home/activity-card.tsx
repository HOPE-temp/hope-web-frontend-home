import type { ReactNode } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ActivityCardProps {
  icon: ReactNode
  title: string
  description: string
  bgColor: string
}

export default function ActivityCard({ icon, title, description, bgColor }: ActivityCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow w-full max-w-xs mx-auto sm:max-w-none">
      <CardHeader className="flex flex-col items-center">
        <div className={`${bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>{icon}</div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-center">{description}</p>
      </CardContent>
    </Card>
  )
}
