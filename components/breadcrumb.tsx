import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbProps {
  items: string[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="px-6 pt-3 flex items-center text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight size={16} className="mx-2 text-black" />}
          <Link
            href="#"
            // TODO: Replace '#' with actual item.href if available

            className={`${
              index === items.length - 1 ? "text-gray-800 font-medium" : "text-black hover:text-gray-700"
            }`}
          >
            {item}
          </Link>
        </div>
      ))}
    </div>
  )
}
