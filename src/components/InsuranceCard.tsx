import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Insurance } from '@/data/insurances'

export function InsuranceCard({ insurance }: { insurance: Insurance }) {
  const Icon = insurance.icon

  return (
    <Link
      to={`/${insurance.slug}`}
      className="group overflow-hidden rounded-[22px] border border-blue-100/80 bg-white shadow-[0_8px_30px_rgba(10,46,110,0.07)] transition duration-200 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(10,46,110,0.14)]"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={insurance.image}
          alt={insurance.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E6E]/65 to-transparent" />
        <span className="absolute bottom-4 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1565D8] shadow-lg">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#0A2E6E]">{insurance.title}</h3>
        <p className="mt-3 min-h-[52px] text-sm leading-6 text-[#5A6B85]">
          {insurance.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#1565D8]">
          Conheça a proteção{' '}
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </Link>
  )
}
