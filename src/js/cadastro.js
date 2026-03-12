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

        const btnPdf = document.getElementById('btn-pdf')
        btnPdf.style.display = 'block'

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

document.getElementById('btn-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    function formatarData(data) {
        const partes = data.split('-')
        return partes[2] + '/' + partes[1] + '/' + partes[0]
    }

    function formatarSim(valor) {
        return valor === 'sim' ? 'Sim' : 'Não'
    }

    const imgIEADALPE = new Image()
    imgIEADALPE.src = 'src/img/IEADALPE.png'

    const imgDEJEADALPE = new Image()
    imgDEJEADALPE.src = 'src/img/Dejeadalpe.png'

    const imgOficial = new Image()
    imgOficial.src = 'src/img/dejeadalpe-oficial.png'

    imgOficial.onload = function() {
        doc.addImage(imgOficial, 'PNG', 0, 0, 210, 297)

        doc.addImage(imgIEADALPE, 'PNG', 15, 5, 30, 30)
        doc.addImage(imgDEJEADALPE, 'PNG', 165, 5, 30, 30)

        if (fotoBase64) {
            doc.addImage(fotoBase64, 'JPEG', 155, 45, 35, 45)
        }

        doc.setFontSize(14)
        doc.setTextColor(26, 58, 26)
        doc.text('Igreja Evangélica Assembleia de Deus', 105, 15, { align: 'center' })
        doc.text('Convenção em Abreu e Lima-PE', 105, 22, { align: 'center' })

        doc.setFontSize(12)
        doc.setTextColor(212, 160, 23)
        doc.text('DEJEADALPE', 105, 30, { align: 'center' })

        doc.setDrawColor(212, 160, 23)
        doc.line(15, 38, 195, 38)

        doc.setFontSize(11)
        doc.setTextColor(0, 0, 0)
        doc.text('Nome: ' + ultimoCadastro.nome, 20, 50)
        doc.text('Nascimento: ' + formatarData(ultimoCadastro.nascimento), 20, 60)
        doc.text('Idade: ' + ultimoCadastro.idade, 20, 70)
        doc.text('Naturalidade: ' + ultimoCadastro.naturalidade, 20, 80)
        doc.text('Nacionalidade: ' + ultimoCadastro.nacionalidade, 20, 90)
        doc.text('Congregação: ' + ultimoCadastro.congregacao, 20, 100)
        doc.text('Área: ' + ultimoCadastro.area, 20, 110)
        doc.text('Nome do Pai: ' + ultimoCadastro.nomePai, 20, 120)
        doc.text('Nome da Mãe: ' + ultimoCadastro.nomeMae, 20, 130)
        doc.text('Endereço: ' + ultimoCadastro.endereco, 20, 140)
        doc.text('Bairro: ' + ultimoCadastro.bairro, 20, 150)
        doc.text('Cidade: ' + ultimoCadastro.cidade, 20, 160)
        doc.text('Batismo Espírito: ' + formatarSim(ultimoCadastro.batismoEspirito), 20, 170)
        doc.text('Batismo Águas: ' + formatarSim(ultimoCadastro.batismoAguas), 20, 180)
        doc.text('Função: ' + ultimoCadastro.funcao, 20, 190)

        doc.setDrawColor(212, 160, 23)
        doc.line(15, 200, 195, 200)

        doc.save(ultimoCadastro.nome + '.pdf')
    }
})