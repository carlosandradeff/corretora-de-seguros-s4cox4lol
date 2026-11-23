export const company = {
  name: 'Stop Seguros',
  tagline: 'Proteção e tranquilidade',
  phoneDisplay: '(62) 99243-5729',
  phoneDigits: '5562992435729',
  email: 'stopseguros@uol.com.br',
  address:
    'Av. Rio Verde, Qd. 97, Lt. 4, Sala 1906, Vila São Tomaz, Aparecida de Goiânia - GO, 74915-515',
  hours: 'Segunda a sexta, das 8h às 18h',
  cnpj: 'CNPJ: 33.634.817/0001-70',
}

export const whatsappUrl = (message?: string) => {
  const text = message ?? 'Olá! Vim pelo site da Stop Seguros e gostaria de falar com um corretor.'
  return `https://wa.me/${company.phoneDigits}?text=${encodeURIComponent(text)}`
}
