const verSenha = document.getElementById('ver-senha');
const inputSenha = document.getElementById('senha');

verSenha.addEventListener('click', function() {
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text';
        verSenha.textContent = '👀';
    } else {
        inputSenha.type = 'password';
        verSenha.textContent = '👁';
    }
})

const formulario = document.querySelector('form')
const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbyY1_S5vtwQOg2lCg_2KDS2Bd-mrXtOnA0cUxSoD9l5WFVEzbV-SVyRi6w1I-xs7iUC/exec'

formulario.addEventListener('submit', function(event) {
    event.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    fetch(URL_SCRIPT + '?email=' + email + '&senha=' + senha)
    .then(response => response.json())
    .then(result => {
        if (result.resultado === 'sucesso') {
            window.location.href = 'index.html'
        } else {
            alert('Email ou senha incorretos!')
        }
    })
    .catch(error => {
        alert('Erro ao fazer login. Tente novamente.')
    })

})