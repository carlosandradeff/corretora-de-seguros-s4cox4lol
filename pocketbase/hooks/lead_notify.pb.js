onRecordCreateRequest((e) => {
  const escapeHtml = (value) =>
    String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#039;')

  e.record.set('status', 'novo')
  e.next()

  const recipient = $os.getenv('STOP_LEADS_EMAIL')
  if (!recipient) {
    console.warn('STOP_LEADS_EMAIL não configurado; notificação do lead não enviada.')
    return
  }

  try {
    const name = escapeHtml(e.record.getString('name'))
    const email = escapeHtml(e.record.getString('email'))
    const phone = escapeHtml(e.record.getString('phone'))
    const insuranceType = escapeHtml(e.record.getString('insurance_type'))
    const messageText = escapeHtml(e.record.getString('message')) || 'Não informada'

    const message = new MailerMessage({
      from: {
        address: e.app.settings().meta.senderAddress,
        name: e.app.settings().meta.senderName || 'Stop Seguros',
      },
      to: [{ address: recipient }],
      subject: 'Novo pedido de cotação — ' + name,
      html: `
        <div style="font-family:Arial,sans-serif;color:#1B2A44;line-height:1.6;max-width:620px">
          <h2 style="color:#0A2E6E">Novo lead recebido pelo site</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone}</p>
          <p><strong>Tipo:</strong> ${insuranceType}</p>
          <p><strong>Mensagem:</strong><br>${messageText}</p>
          <p style="color:#5A6B85;font-size:13px">Registro: ${escapeHtml(e.record.id)}</p>
        </div>
      `,
    })

    e.app.newMailClient().send(message)
  } catch (error) {
    console.error('Falha ao enviar a notificação do novo lead:', error)
  }
}, 'leads')
