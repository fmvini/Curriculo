/* ============================================================
   TEMA — alternar entre dark e light
   ============================================================ */
 
function toggleTheme() {
    const html    = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
 
    html.setAttribute('data-theme', next);
    document.getElementById('theme-icon').textContent  = next === 'dark' ? '☀️' : '🌙';
    document.getElementById('theme-label').textContent = next === 'dark' ? 'LIGHT MODE' : 'DARK MODE';
 
    localStorage.setItem('theme', next);
}
 
// Restaurar preferência salva ao carregar a página
(function restoreTheme() {
    const saved = localStorage.getItem('theme');
    if (!saved) return;
 
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('theme-icon').textContent  = saved === 'dark' ? '☀️' : '🌙';
    document.getElementById('theme-label').textContent = saved === 'dark' ? 'LIGHT MODE' : 'DARK MODE';
})();
 
 
/* ============================================================
   FORMULÁRIO DE CONTATO — abre cliente de e-mail
   ============================================================ */
 
async function sendContact() {
    const name   = document.getElementById('sender-name').value.trim();
    const email  = document.getElementById('sender-email').value.trim();
    const reason = document.getElementById('sender-reason').value.trim();
    const status = document.getElementById('form-status');

    if (!name || !reason) {
        status.textContent = '// ERRO: Preencha seu nome e o motivo do contato.';
        status.className   = 'form-status error';
        return;
    }

    status.textContent = '// Enviando...';
    status.className   = 'form-status success';

    try {
        const response = await fetch('https://formspree.io/f/xlgoqzle', { // <- coloque seu endpoint aqui
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, message: reason })
        });

        if (response.ok) {
            status.textContent = '// Mensagem enviada com sucesso!';
            document.getElementById('sender-name').value   = '';
            document.getElementById('sender-email').value  = '';
            document.getElementById('sender-reason').value = '';
        } else {
            status.textContent = '// ERRO: Não foi possível enviar. Tente novamente.';
            status.className   = 'form-status error';
        }
    } catch (err) {
        status.textContent = '// ERRO: Sem conexão. Tente novamente.';
        status.className   = 'form-status error';
    }
}
 
 
/* ============================================================
   UX — Enter em inputs avança para o próximo campo
   ============================================================ */
 
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' || e.target.tagName !== 'INPUT') return;
 
    const inputs = [...document.querySelectorAll('input, textarea')];
    const idx    = inputs.indexOf(e.target);
 
    if (idx > -1 && inputs[idx + 1]) {
        e.preventDefault();
        inputs[idx + 1].focus();
    }
});