const formulario = document.getElementById('form-lideranca');
const botoesVerSenha = document.querySelectorAll('.ver-senha')

botoesVerSenha.forEach(function(botao) {
    botao.addEventListener('click', function() {
        const input = botao.previousElementSibling
        if (input.type === 'password') {
            input.type = 'text'
            botao.textContent = '👀'
        } else {
            input.type = 'password'
            botao.textContent = '👁'
        }
    })
})

const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbyY1_S5vtwQOg2lCg_2KDS2Bd-mrXtOnA0cUxSoD9l5WFVEzbV-SVyRi6w1I-xs7iUC/exec'


formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.!')
        return
    }

    const dados = {
        tipo: 'lideranca',
        cargo: document.getElementById('cargo').value,
        email: document.getElementById('email').value,
        senha: senha
    }

    fetch(URL_SCRIPT, {
        method: 'POST',
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(result => {
        alert('Cadastro realizado com sucesso!')
        formulario.reset()
    })
    .catch(error => {
        alert('Erro ao cadastrar. Tente novamente.')
    })
})
    