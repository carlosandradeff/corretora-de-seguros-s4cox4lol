/* ==========================================================================
   STOP SEGUROS — JAVASCRIPT TRADICIONAL (vanilla, sem dependências)
   Funciona abrindo o arquivo .html por duplo clique (protocolo file://),
   sem servidor e sem backend.
   --------------------------------------------------------------------------
   ÍNDICE
   1. Menu hambúrguer (mobile)
   2. Header que ganha sombra ao rolar a página
   3. Acordeão de FAQ
   4. Carrossel de depoimentos
   5. Validação e confirmação local do formulário de cotação
   6. Ano atual no rodapé
   ========================================================================== */

'use strict'

/* --------------------------------------------------------------------------
   1. MENU HAMBÚRGUER (MOBILE)
   O botão .botao-menu alterna a classe .aberto no próprio botão (vira um X)
   e no .menu-principal (que aparece deslizando abaixo do header).
   -------------------------------------------------------------------------- */
;(function configurarMenuMobile() {
  var botao = document.querySelector('.botao-menu')
  var menu = document.querySelector('.menu-principal')
  if (!botao || !menu) return

  botao.addEventListener('click', function () {
    var aberto = menu.classList.toggle('aberto')
    botao.classList.toggle('aberto', aberto)
    // Acessibilidade: informa aos leitores de tela se o menu está expandido
    botao.setAttribute('aria-expanded', aberto ? 'true' : 'false')
  })

  // Fecha o menu ao clicar em qualquer link (navegação por âncora/página)
  menu.addEventListener('click', function (evento) {
    if (evento.target.tagName === 'A') {
      menu.classList.remove('aberto')
      botao.classList.remove('aberto')
      botao.setAttribute('aria-expanded', 'false')
    }
  })
})()

/* --------------------------------------------------------------------------
   2. HEADER COM SOMBRA AO ROLAR
   Adiciona a classe .rolou ao header quando a página passa de 10 pixels,
   dando profundidade ao cabeçalho fixo.
   -------------------------------------------------------------------------- */
;(function configurarHeaderAoRolar() {
  var header = document.querySelector('.site-header')
  if (!header) return

  function atualizar() {
    header.classList.toggle('rolou', window.scrollY > 10)
  }

  window.addEventListener('scroll', atualizar, { passive: true })
  atualizar()
})()

/* --------------------------------------------------------------------------
   3. ACORDEÃO DE FAQ
   Cada .faq-item tem um botão .faq-pergunta e uma div .faq-resposta.
   Clicar na pergunta abre a resposta e fecha as outras (comportamento de
   acordeão), girando o ícone "+" para um "×".
   -------------------------------------------------------------------------- */
;(function configurarFaq() {
  var itens = document.querySelectorAll('.faq-item')
  if (itens.length === 0) return

  itens.forEach(function (item) {
    var pergunta = item.querySelector('.faq-pergunta')
    var resposta = item.querySelector('.faq-resposta')
    if (!pergunta || !resposta) return

    pergunta.addEventListener('click', function () {
      var jaAberto = item.classList.contains('aberto')

      // Fecha todos os itens antes de abrir o clicado
      itens.forEach(function (outro) {
        outro.classList.remove('aberto')
        var p = outro.querySelector('.faq-pergunta')
        var r = outro.querySelector('.faq-resposta')
        if (p) p.setAttribute('aria-expanded', 'false')
        if (r) r.hidden = true
      })

      if (!jaAberto) {
        item.classList.add('aberto')
        pergunta.setAttribute('aria-expanded', 'true')
        resposta.hidden = false
      }
    })
  })
})()

/* --------------------------------------------------------------------------
   4. CARROSSEL DE DEPOIMENTOS
   A .carrossel-trilha é um flexbox horizontal; mover o carrossel é
   translating a trilha em -100% por slide a cada passo. Inclui botões
   anterior/próximo, pontos de navegação e volta automática ao início.
   -------------------------------------------------------------------------- */
;(function configurarCarrossel() {
  var carrossel = document.querySelector('.carrossel')
  if (!carrossel) return

  var trilha = carrossel.querySelector('.carrossel-trilha')
  var slides = carrossel.querySelectorAll('.carrossel-slide')
  var botaoAnterior = carrossel.querySelector('[data-anterior]')
  var botaoProximo = carrossel.querySelector('[data-proximo]')
  var pontos = carrossel.querySelectorAll('.carrossel-ponto')
  var indiceAtual = 0
  var temporizador = null
  var INTERVALO_MS = 7000

  if (!trilha || slides.length === 0) return

  function mostrarSlide(indice) {
    // Índice circular: passa do último volta para o primeiro
    indiceAtual = (indice + slides.length) % slides.length
    trilha.style.transform = 'translateX(-' + indiceAtual * 100 + '%)'

    // Marca o ponto ativo correspondente
    pontos.forEach(function (ponto, i) {
      ponto.classList.toggle('ativo', i === indiceAtual)
      ponto.setAttribute('aria-current', i === indiceAtual ? 'true' : 'false')
    })
  }

  function reiniciarTemporizador() {
    clearInterval(temporizador)
    temporizador = setInterval(function () {
      mostrarSlide(indiceAtual + 1)
    }, INTERVALO_MS)
  }

  if (botaoAnterior) {
    botaoAnterior.addEventListener('click', function () {
      mostrarSlide(indiceAtual - 1)
      reiniciarTemporizador()
    })
  }

  if (botaoProximo) {
    botaoProximo.addEventListener('click', function () {
      mostrarSlide(indiceAtual + 1)
      reiniciarTemporizador()
    })
  }

  pontos.forEach(function (ponto, i) {
    ponto.addEventListener('click', function () {
      mostrarSlide(i)
      reiniciarTemporizador()
    })
  })

  mostrarSlide(0)
  reiniciarTemporizador()
})()

/* --------------------------------------------------------------------------
   5. FORMULÁRIO DE COTAÇÃO — VALIDAÇÃO E CONFIRMAÇÃO LOCAL
   Não envia dados a nenhum servidor: valida os campos necessários
   (nome, e-mail, telefone, tipo de seguro e consentimento) e, se tudo
   estiver preenchido, esconde o formulário e mostra a mensagem de
   confirmação. Se houver erro, marca os campos .invalido com mensagens.
   -------------------------------------------------------------------------- */
;(function configurarFormulario() {
  var form = document.querySelector('.form-cotacao')
  if (!form) return

  var mensagemSucesso = document.querySelector('.form-mensagem')

  // Mostra/esconde a mensagem de erro de um campo
  function marcarCampo(campo, invalido) {
    var container = campo.closest('.form-campo')
    if (!container) return
    container.classList.toggle('invalido', invalido)
    campo.setAttribute('aria-invalid', invalido ? 'true' : 'false')
  }

  // Validações específicas por tipo de campo
  function validarCampo(campo) {
    var valor = campo.value.trim()

    if (campo.hasAttribute('required') && valor === '') {
      return 'Este campo é necessário.'
    }

    if (campo.type === 'email' && valor !== '') {
      // Regex simples: algo@algo.alguma-coisa
      var padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
      if (!padraoEmail.test(valor)) {
        return 'Digite um e-mail válido, como nome@exemplo.com.br'
      }
    }

    if (campo.id === 'telefone' && valor !== '') {
      // Remove tudo que não é dígito; telefone brasileiro tem 10 ou 11 números
      var digitos = valor.replace(/\D/g, '')
      if (digitos.length < 10 || digitos.length > 11) {
        return 'Digite DDD + número (10 ou 11 dígitos), como (11) 99999-9999'
      }
    }

    return '' // string vazia = campo válido
  }

  // Ao corrigir um campo, remove imediatamente a marcação de erro
  form.querySelectorAll('input, select, textarea').forEach(function (campo) {
    campo.addEventListener('input', function () {
      if (campo.closest('.form-campo')) {
        marcarCampo(campo, false)
      }
    })
  })

  form.addEventListener('submit', function (evento) {
    evento.preventDefault() // nunca envia de verdade: é tudo local

    var primeiroInvalido = null

    // Percorre todos os campos necessários e valida um a um
    form.querySelectorAll('input, select, textarea').forEach(function (campo) {
      // Ignora o checkbox de consentimento nesta etapa (validado abaixo)
      if (campo.type === 'checkbox') return

      var erro = validarCampo(campo)
      marcarCampo(campo, erro !== '')
      if (erro !== '' && !primeiroInvalido) primeiroInvalido = campo
    })

    // O consentimento é obrigatório: precisa estar marcado
    var consentimento = form.querySelector('#consentimento')
    if (consentimento && !consentimento.checked) {
      var containerConsentimento = consentimento.closest('.form-campo')
      if (containerConsentimento) containerConsentimento.classList.add('invalido')
      if (!primeiroInvalido) primeiroInvalido = consentimento
    }

    // Se algo falhou, foca o primeiro campo com erro para corrigir
    if (primeiroInvalido) {
      primeiroInvalido.focus()
      return
    }

    // Tudo certo: esconde o formulário e mostra a confirmação
    if (mensagemSucesso) {
      form.hidden = true
      mensagemSucesso.classList.add('visivel')
      mensagemSucesso.setAttribute('tabindex', '-1')
      mensagemSucesso.focus()
    } else {
      form.reset()
    }
  })
})()

/* --------------------------------------------------------------------------
   6. ANO ATUAL NO RODAPÉ
   Mantém o ano de copyright sempre atualizado sem editar o HTML.
   -------------------------------------------------------------------------- */
;(function atualizarAno() {
  var ano = document.querySelector('[data-ano]')
  if (ano) ano.textContent = String(new Date().getFullYear())
})()
