import { useState, type FormEvent } from 'react'
import { Loader2, Send, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { insurances, findInsurance } from '@/data/insurances'
import { createLead } from '@/services/leads'
import { cn } from '@/lib/utils'

type LeadFormProps = {
  initialType?: string
  compact?: boolean
  source: string
  className?: string
  defaultMessage?: string
}

type FormState = {
  name: string
  email: string
  phone: string
  insuranceType: string
  message: string
}
type Errors = Partial<Record<keyof FormState, string>>

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const normalizeInitialType = (value?: string) => {
  if (!value) return ''
  const bySlug = findInsurance(value)
  if (bySlug) return bySlug.slug
  if (value === 'outro') return 'outro'
  const byType = insurances.find((item) => item.type === value)
  return byType?.slug ?? ''
}

export function LeadForm({
  initialType,
  compact = false,
  source,
  className,
  defaultMessage = '',
}: LeadFormProps) {
  const { toast } = useToast()
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    insuranceType: normalizeInitialType(initialType),
    message: defaultMessage,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const next: Errors = {}
    if (form.name.trim().length < 3) next.name = 'Informe seu nome completo.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Informe um e-mail válido.'
    if (form.phone.replace(/\D/g, '').length < 10)
      next.phone = 'Informe um telefone ou WhatsApp válido.'
    if (!form.insuranceType) next.insuranceType = 'Selecione o tipo de seguro.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setLoading(true)
    const insurance = findInsurance(form.insuranceType)
    try {
      await createLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        insuranceType: insurance?.type ?? 'outro',
        insuranceLabel: insurance?.title ?? 'Outras soluções',
        message: form.message,
        source,
      })
      setSuccess(true)
      toast({
        title: 'Solicitação recebida!',
        description: 'Um corretor entrará em contato em até 24h.',
      })
    } catch {
      toast({
        variant: 'destructive',
        title: 'Não foi possível enviar agora',
        description: 'Revise os dados ou fale conosco pelo WhatsApp.',
      })
    } finally {
      setLoading(false)
    }
  }

  const setField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  if (success) {
    return (
      <div
        className={cn(
          'flex min-h-[340px] flex-col items-center justify-center rounded-2xl bg-[#F4F8FE] p-8 text-center',
          className,
        )}
        role="status"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DCE9FB] text-[#1565D8]">
          <ShieldCheck className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-extrabold text-[#0A2E6E]">Recebemos sua solicitação!</h3>
        <p className="mt-3 max-w-md leading-7 text-[#5A6B85]">
          Um corretor entrará em contato em até 24h para entender suas necessidades e apresentar as
          melhores opções.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className={cn('space-y-5', className)}>
      <div className={cn(!compact && 'grid gap-5 sm:grid-cols-2')}>
        <Field label="Nome completo" error={errors.name}>
          <Input
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            placeholder="Como podemos chamar você?"
            aria-invalid={!!errors.name}
            className="form-control"
          />
        </Field>
        <Field label="E-mail" error={errors.email}>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            placeholder="voce@email.com.br"
            aria-invalid={!!errors.email}
            className="form-control"
          />
        </Field>
      </div>
      <div className={cn(!compact && 'grid gap-5 sm:grid-cols-2')}>
        <Field label="Telefone / WhatsApp" error={errors.phone}>
          <Input
            value={form.phone}
            onChange={(e) => setField('phone', formatPhone(e.target.value))}
            placeholder="(62) 99999-9999"
            inputMode="tel"
            aria-invalid={!!errors.phone}
            className="form-control"
          />
        </Field>
        <Field label="Tipo de seguro" error={errors.insuranceType}>
          <Select
            value={form.insuranceType}
            onValueChange={(value) => setField('insuranceType', value)}
          >
            <SelectTrigger className="form-control">
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              {insurances.map((item) => (
                <SelectItem key={item.slug} value={item.slug}>
                  {item.title}
                </SelectItem>
              ))}
              <SelectItem value="outro">Outro assunto</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      {!compact && (
        <Field label="Mensagem (opcional)" error={errors.message}>
          <Textarea
            value={form.message}
            onChange={(e) => setField('message', e.target.value)}
            placeholder="Conte brevemente o que você precisa."
            className="min-h-28 resize-none rounded-xl border-blue-100 focus-visible:ring-[#1565D8]"
          />
        </Field>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-[#1565D8] px-6 font-bold hover:bg-[#0F4FB0]"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            {compact ? 'Quero minha cotação' : 'Enviar solicitação'}{' '}
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      <p className="text-center text-xs leading-5 text-[#73829A]">
        Ao enviar, você concorda com nossa Política de Privacidade. Seus dados são usados somente
        para este atendimento.
      </p>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-[#1B2A44]">{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-[#D64545]">{error}</p>}
    </div>
  )
}
