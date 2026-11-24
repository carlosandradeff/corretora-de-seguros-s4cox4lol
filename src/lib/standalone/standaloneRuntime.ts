/** Estilos extras do arquivo exportado: menu mobile (drawer), aviso e confirmação do formulário. */
export const STANDALONE_CSS = `
#sx-drawer{position:fixed;inset:0;z-index:100;display:none}
#sx-drawer.sx-open{display:block}
#sx-drawer .sx-overlay{position:absolute;inset:0;background:rgba(6,30,75,.55);animation:sx-fade .25s ease-out}
#sx-drawer .sx-panel{position:absolute;top:0;right:0;bottom:0;width:min(100%,28rem);background:#fff;overflow-y:auto;display:flex;flex-direction:column;animation:sx-slide .3s ease-out;box-shadow:-20px 0 60px rgba(10,46,110,.2)}
#sx-drawer .sx-head{display:flex;align-items:center;justify-content:space-between;padding:1.25rem;border-bottom:1px solid #DCE9FB}
#sx-drawer .sx-brand{font-weight:800;color:#0A2E6E;font-size:1.125rem}
#sx-drawer .sx-x{font-size:2rem;line-height:1;background:none;border:0;cursor:pointer;color:#0A2E6E;padding:.25rem .5rem}
#sx-drawer .sx-nav{flex:1;padding:1.5rem}
#sx-drawer .sx-link{display:block;border-bottom:1px solid #EAF2FD;padding:1rem 0;font-size:1.125rem;font-weight:700;color:#0A2E6E;text-decoration:none}
#sx-drawer .sx-sub{padding:.45rem 1rem;font-size:.9rem;font-weight:600;color:#43536B;border-bottom:0}
#sx-drawer .sx-cta{display:grid;gap:.75rem;background:#F4F8FE;padding:1.5rem}
#sx-drawer .sx-btn{display:flex;align-items:center;justify-content:center;height:3rem;border-radius:.75rem;background:#1565D8;color:#fff;font-weight:700;text-decoration:none}
#sx-drawer .sx-wa{background:#fff;color:#138A44;border:2px solid #25D366}
#sx-notice{position:fixed;left:50%;bottom:6rem;transform:translateX(-50%);z-index:110;width:min(92vw,30rem);background:#0A2E6E;color:#fff;padding:.9rem 1.25rem;border-radius:1rem;font-size:.9rem;line-height:1.5;box-shadow:0 16px 40px rgba(10,46,110,.3);opacity:0;transition:opacity .25s;pointer-events:none}
#sx-notice.sx-show{opacity:1}
@keyframes sx-fade{from{opacity:0}to{opacity:1}}
@keyframes sx-slide{from{transform:translateX(100%)}to{transform:none}}
.sx-success{display:flex;min-height:340px;flex-direction:column;align-items:center;justify-content:center;border-radius:1rem;background:#F4F8FE;padding:2rem;text-align:center}
.sx-success h3{margin-top:1.25rem;font-size:1.5rem;font-weight:800;color:#0A2E6E}
.sx-success p{margin-top:.75rem;max-width:28rem;line-height:1.75;color:#5A6B85}
.sx-success a{margin-top:1rem;color:#1565D8;font-weight:700;text-decoration:underline}
/* Placeholder de imagem (o export não embute imagens): reserva o mesmo box da imagem */
.sx-img-placeholder{display:flex;align-items:center;justify-content:center;background:#EAF2FD;color:#8FA9CE;overflow:hidden}
.sx-img-placeholder::before{content:"Imagem";font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.sx-img-placeholder[aria-label=""]::before,.sx-img-placeholder:not([aria-label])::before{content:""}
`

/** Comportamento do arquivo exportado (JS puro, sem dependências).
 *  Lê window.__SX__ com: testimonials, testimonialIndex, whatsapp. */
export const STANDALONE_JS = `
(function () {
  var data = window.__SX__ || { testimonials: [], testimonialIndex: 0, whatsapp: '#' };
  var doc = document;
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  // Links de outras páginas: o arquivo é único, então mostramos um aviso em vez de quebrar em 404
  var noticeTimer = 0;
  function showNotice() {
    var el = doc.getElementById('sx-notice');
    if (!el) {
      el = doc.createElement('div');
      el.id = 'sx-notice';
      el.setAttribute('role', 'status');
      doc.body.appendChild(el);
    }
    el.textContent = 'Esta página é um arquivo separado do site. Para abri-la, baixe-a pelo botão Download no rodapé da página desejada ou acesse o site publicado.';
    el.classList.add('sx-show');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(function () { el.classList.remove('sx-show'); }, 5000);
  }
  doc.addEventListener('click', function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest('a[data-sx-route]') : null;
    if (!link) return;
    event.preventDefault();
    showNotice();
  });

  // Menu mobile (drawer): abre pelo hambúrguer, fecha pelo X, pelo fundo, por links ou Escape
  var drawer = doc.getElementById('sx-drawer');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('sx-open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    doc.body.style.overflow = open ? 'hidden' : '';
  }
  each(doc.querySelectorAll('[data-sx-open]'), function (el) {
    el.addEventListener('click', function () { setDrawer(true); });
  });
  each(doc.querySelectorAll('[data-sx-close]'), function (el) {
    el.addEventListener('click', function () { setDrawer(false); });
  });
  if (drawer) {
    drawer.addEventListener('click', function (event) {
      var target = event.target;
      if (target && target.closest && target.closest('a')) setDrawer(false);
    });
  }
  doc.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setDrawer(false);
  });

  // Perguntas frequentes (acordeão)
  each(doc.querySelectorAll('[data-sx-faq]'), function (trigger) {
    trigger.addEventListener('click', function () {
      var id = trigger.getAttribute('aria-controls');
      var panel = id ? doc.getElementById(id) : null;
      var item = trigger.parentElement && trigger.parentElement.parentElement;
      var open = trigger.getAttribute('aria-expanded') !== 'true';
      var state = open ? 'open' : 'closed';
      trigger.setAttribute('aria-expanded', String(open));
      trigger.setAttribute('data-state', state);
      if (item) item.setAttribute('data-state', state);
      if (panel) {
        panel.hidden = !open;
        panel.setAttribute('data-state', state);
      }
    });
  });

  // Depoimentos (carrossel com troca automática a cada 6s, como no site)
  var quoteEl = doc.querySelector('blockquote');
  var list = data.testimonials || [];
  if (quoteEl && list.length > 0) {
    var nameEl = quoteEl.nextElementSibling;
    var cityEl = nameEl ? nameEl.nextElementSibling : null;
    var dots = Array.prototype.slice.call(doc.querySelectorAll('[aria-label^="Ver depoimento"]'));
    var index = data.testimonialIndex || 0;
    var timer = 0;
    var show = function (n) {
      index = ((n % list.length) + list.length) % list.length;
      var item = list[index];
      quoteEl.textContent = '\u201C' + item.quote + '\u201D';
      if (nameEl) nameEl.textContent = item.name;
      if (cityEl) cityEl.textContent = item.city;
      dots.forEach(function (dot, i) {
        var on = i === index;
        dot.classList.toggle('w-7', on);
        dot.classList.toggle('bg-[#1565D8]', on);
        dot.classList.toggle('w-2', !on);
        dot.classList.toggle('bg-blue-200', !on);
      });
    };
    var restart = function () {
      clearInterval(timer);
      if (list.length > 1) timer = setInterval(function () { show(index + 1); }, 6000);
    };
    var prev = doc.querySelector('[aria-label="Depoimento anterior"]');
    var next = doc.querySelector('[aria-label="Próximo depoimento"]');
    if (prev) prev.addEventListener('click', function () { show(index - 1); restart(); });
    if (next) next.addEventListener('click', function () { show(index + 1); restart(); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); restart(); });
    });
    show(index);
    restart();
  }

  // Formulários: validação local e confirmação. O envio real só acontece no site publicado.
  var formatPhone = function (value) {
    var digits = value.replace(/D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
    if (digits.length <= 10) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
  };
  each(doc.querySelectorAll('form'), function (form) {
    var field = function (name) { return form.elements.namedItem(name); };
    var phone = field('phone');
    if (phone) {
      phone.addEventListener('input', function () { phone.value = formatPhone(phone.value); });
    }
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      each(form.querySelectorAll('[data-sx-error]'), function (el) { el.remove(); });
      var value = function (name) { var el = field(name); return el ? el.value : ''; };
      var rules = [
        ['name', value('name').trim().length >= 3, 'Informe seu nome completo.'],
        ['email', /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value('email')), 'Informe um e-mail válido.'],
        ['phone', value('phone').replace(/\\D/g, '').length >= 10, 'Informe um telefone ou WhatsApp válido.'],
        ['insuranceType', value('insuranceType') !== '', 'Selecione o tipo de seguro.']
      ];
      var invalid = rules.filter(function (rule) { return !rule[1]; });
      rules.forEach(function (rule) {
        var el = field(rule[0]);
        if (el) el.setAttribute('aria-invalid', rule[1] ? 'false' : 'true');
      });
      invalid.forEach(function (rule) {
        var el = field(rule[0]);
        if (!el || !el.parentElement) return;
        var message = doc.createElement('p');
        message.setAttribute('data-sx-error', '');
        message.className = 'text-xs font-medium text-[#D64545]';
        message.textContent = rule[2];
        el.parentElement.appendChild(message);
      });
      if (invalid.length > 0) {
        var first = field(invalid[0][0]);
        if (first) first.focus();
        return;
      }
      var box = doc.createElement('div');
      box.className = 'sx-success';
      box.setAttribute('role', 'status');
      var title = doc.createElement('h3');
      title.textContent = 'Recebemos sua solicitação!';
      var notice = doc.createElement('p');
      notice.textContent = 'Esta é a cópia offline da página: aqui a solicitação não é enviada. O envio real acontece somente no site publicado. Para falar agora, use o WhatsApp.';
      var wa = doc.createElement('a');
      wa.href = data.whatsapp;
      wa.target = '_blank';
      wa.rel = 'noreferrer';
      wa.textContent = 'Falar no WhatsApp';
      box.appendChild(title);
      box.appendChild(notice);
      box.appendChild(wa);
      form.replaceWith(box);
    });
  });
})();
`
