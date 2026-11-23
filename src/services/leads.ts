import pb from '@/lib/pocketbase/client'

export type LeadInput = {
  name: string
  email: string
  phone: string
  insuranceType: string
  insuranceLabel: string
  message?: string
  source?: string
}

const acceptedTypes = new Set([
  'auto',
  'residencial',
  'vida',
  'saude',
  'empresarial',
  'viagem',
  'outro',
])

const normalizeInsuranceType = (type: string) => {
  const directMap: Record<string, string> = {
    'seguro-automovel': 'auto',
    'seguro-residencial': 'residencial',
    'seguro-de-vida': 'vida',
    'planos-de-saude': 'saude',
    'seguro-empresarial': 'empresarial',
    'seguro-viagem': 'viagem',
  }

  const mapped = directMap[type] ?? type
  return acceptedTypes.has(mapped) ? mapped : 'outro'
}

export async function createLead(input: LeadInput) {
  const normalizedType = normalizeInsuranceType(input.insuranceType)
  const context = [
    input.source ? `Origem: ${input.source}.` : '',
    input.insuranceLabel ? `Interesse: ${input.insuranceLabel}.` : '',
    input.message?.trim() ?? '',
  ]
    .filter(Boolean)
    .join('\n')

  return pb.collection('leads').create({
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    insurance_type: normalizedType,
    message: context,
  })
}
