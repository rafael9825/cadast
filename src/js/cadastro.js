const formulario = document.getElementById('form-cadastro')
const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbyY1_S5vtwQOg2lCg_2KDS2Bd-mrXtOnA0cUxSoD9l5WFVEzbV-SVyRi6w1I-xs7iUC/exec'

let ultimoCadastro = {}
let fotoBase64 = ''

document.getElementById('foto').addEventListener('change', function() {
    const arquivo = this.files[0]
    if (arquivo) {
        const reader = new FileReader()
        reader.onload = function(e) {
            fotoBase64 = e.target.result
            const preview = document.getElementById('preview-foto')
            preview.src = fotoBase64
            preview.style.display = 'block'
            document.getElementById('texto-foto').style.display = 'none'
        }
        reader.readAsDataURL(arquivo)
    }
})

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault()

    if (!fotoBase64) {
        alert('📷 A foto é obrigatória! Por favor, tire uma foto para continuar.')
        return
    }

    const dados = {
        cartaoMembro: document.getElementById('cartao-membro').value,
        nome: document.getElementById('nome').value,
        nascimento: document.getElementById('nascimento').value,
        idade: document.getElementById('idade').value,
        naturalidade: document.getElementById('naturalidade').value,
        nacionalidade: document.getElementById('nacionalidade').value,
        congregacao: document.getElementById('congregacao').value,
        area: document.getElementById('area').value,
        grauInstrucao: document.getElementById('grau-instrucao').value,
        nomePai: document.getElementById('nome-pai').value,
        nomeMae: document.getElementById('nome-mae').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
        celula: document.getElementById('celula').value,
        frequentaEbd: document.getElementById('frequenta-ebd').value,
        frequentaDoutrina: document.getElementById('frequenta-doutrina').value,
        batismoEspirito: document.getElementById('batismo-espirito').value,
        batismoAguas: document.getElementById('batismo-aguas').value,
        evangelico: document.getElementById('evangelico').value,
        lazer: document.getElementById('lazer').value,
        aborrece: document.getElementById('aborrece').value,
        tratado: document.getElementById('tratado').value,
        corPreferida: document.getElementById('cor-preferida').value,
        gostaBiblia: document.getElementById('gosta-biblia').value,
        funcao: document.getElementById('funcao').options[document.getElementById('funcao').selectedIndex].text
    }

    fetch(URL_SCRIPT, {
        method: 'POST',
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(result => {
        const mensagem = document.getElementById('mensagem')
        mensagem.style.display = 'block'
        mensagem.className = 'sucesso'
        mensagem.textContent = 'Cadastro realizado com sucesso!'

        ultimoCadastro = { ...dados }

        formulario.reset()
        fotoBase64 = ''
        document.getElementById('preview-foto').style.display = 'none'
        document.getElementById('texto-foto').style.display = 'block'
    })
    .catch(error => {
        const mensagem = document.getElementById('mensagem')
        mensagem.style.display = 'block'
        mensagem.className = 'erro'
        mensagem.textContent = 'Erro ao cadastrar. Tente novamente.'
    })
})