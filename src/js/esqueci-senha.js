emailjs.init('XBjMBqkat6g3XC12U')

const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbyY1_S5vtwQOg2lCg_2KDS2Bd-mrXtOnA0cUxSoD9l5WFVEzbV-SVyRi6w1I-xs7iUC/exec'

document.getElementById('form-recuperar').addEventListener('submit', function(evento) {
    evento.preventDefault()

    const email = document.getElementById('email').value
    const mensagem = document.getElementById('mensagem')

    fetch(URL_SCRIPT + '?email=' + email)
    .then(response => response.json())
    .then(result => {
        if (result.resultado === 'sucesso') {
            emailjs.send('service_tdq09ej', 'template_1ydd81n', {
                email_destino: email,
                senha: result.senha
            })
            .then(function() {
                mensagem.style.display = 'block'
                mensagem.className = 'sucesso'
                mensagem.textContent = 'Senha enviada para o seu email!'
            })
            .catch(function() {
                mensagem.style.display = 'block'
                mensagem.className = 'erro'
                mensagem.textContent = 'Erro ao enviar email. Tente novamente.'
            })
        } else {
            mensagem.style.display = 'block'
            mensagem.className = 'erro'
            mensagem.textContent = 'Email não encontrado!'
        }
    })
    .catch(error => {
        mensagem.style.display = 'block'
        mensagem.className = 'erro'
        mensagem.textContent = 'Erro ao buscar email. Tente novamente.'
    })
})