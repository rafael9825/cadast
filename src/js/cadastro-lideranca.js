const formulario = document.getElementById('form-lideranca')
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
    event.preventDefault()

    const senha = document.getElementById('senha').value
    const confirmarSenha = document.getElementById('confirmar-senha').value

    if (senha.length < 8 || senha.length > 20) {
        alert('A senha deve ter entre 8 e 20 caracteres!')
        return
    }

    if (!/[A-Z]/.test(senha)) {
        alert('A senha deve ter pelo menos uma letra maiúscula!')
        return
    }

    if (!/[a-z]/.test(senha)) {
        alert('A senha deve ter pelo menos uma letra minúscula!')
        return
    }

    if (!/[0-9]/.test(senha)) {
        alert('A senha deve ter pelo menos um número!')
        return
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senha)) {
        alert('A senha deve ter pelo menos um caractere especial!')
        return
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!')
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
        if (result.resultado === 'duplicado') {
            alert('❌ Este email já está cadastrado! Use outro email.')
            return
        }
        alert('✅ Cadastro realizado com sucesso!')
        formulario.reset()
    })
    .catch(error => {
        alert('Erro ao cadastrar. Tente novamente.')
    })
})