const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbyY1_S5vtwQOg2lCg_2KDS2Bd-mrXtOnA0cUxSoD9l5WFVEzbV-SVyRi6w1I-xs7iUC/exec'

let pessoaSelecionada = {}

// VER SENHA
document.getElementById('ver-senha-consulta').addEventListener('click', function () {
    const input = document.getElementById('senha-consulta')
    input.type = input.type === 'password' ? 'text' : 'password'
})

// LOGIN + BUSCA
document.getElementById('form-consulta-login').addEventListener('submit', function (e) {
    e.preventDefault()

    const email = document.getElementById('email-consulta').value.trim()
    const senha = document.getElementById('senha-consulta').value.trim()
    const area = document.getElementById('area-consulta').value.trim()
    const mensagem = document.getElementById('mensagem-consulta')

    mensagem.textContent = 'Verificando...'
    mensagem.style.color = 'var(--cor-dourado)'

    fetch(URL_SCRIPT + '?email=' + encodeURIComponent(email) + '&senha=' + encodeURIComponent(senha))
        .then(response => response.json())
        .then(result => {
            if (result.resultado === 'sucesso') {
                return fetch(URL_SCRIPT + '?area=' + encodeURIComponent('Área ' + area))
                    .then(response => response.json())
                    .then(resultArea => {
                        if (resultArea.resultado === 'sucesso' && resultArea.dados.length > 0) {
                            document.getElementById('tela-login').style.display = 'none'
                            document.getElementById('tela-resultado').style.display = 'block'

                            window.listaPessoas = resultArea.dados
                            mostrarLista(area, resultArea.dados)
                        } else {
                            mensagem.textContent = 'Nenhuma pessoa encontrada nessa área!'
                            mensagem.style.color = '#ff6b6b'
                        }
                    })
            } else {
                mensagem.textContent = 'Email ou senha incorretos!'
                mensagem.style.color = '#ff6b6b'
            }
        })
        .catch(error => {
            mensagem.textContent = 'Erro ao conectar. Tente novamente.'
            mensagem.style.color = '#ff6b6b'
        })
})

function mostrarLista(area, dados) {
    const resultadoBusca = document.getElementById('resultado-busca')
    let html = `<p class="titulo-resultado">Área ${area} — ${dados.length} pessoa(s) encontrada(s)</p>`
    html += '<div class="lista-pessoas">'
    dados.forEach(function (pessoa, index) {
        html += `
        <div class="card-pessoa" onclick="verDetalhes(${index})">
            <span>👤</span>
            <p>${pessoa.nome}</p>
        </div>`
    })
    html += '</div>'
    resultadoBusca.innerHTML = html
}

function verDetalhes(index) {
    pessoaSelecionada = window.listaPessoas[index]

    document.getElementById('resultado-busca').style.display = 'none'
    document.getElementById('detalhes-pessoa').style.display = 'block'

    function formatarSim(valor) {
        return valor === 'sim' ? 'Sim' : 'Não'
    }

    function formatarData(data) {
        if (!data) return '—'
        const partes = String(data).split('-')
        if (partes.length === 3) return partes[2] + '/' + partes[1] + '/' + partes[0]
        return data
    }

    const html = `
        <p class="info-titulo">👤 ${pessoaSelecionada.nome}</p>
        <div class="info-grid">
            <div class="info-item"><span>Nº Cartão</span><span>${pessoaSelecionada.cartaoMembro || '—'}</span></div>
            <div class="info-item"><span>Nascimento</span><span>${formatarData(pessoaSelecionada.nascimento)}</span></div>
            <div class="info-item"><span>Idade</span><span>${pessoaSelecionada.idade || '—'}</span></div>
            <div class="info-item"><span>Naturalidade</span><span>${pessoaSelecionada.naturalidade || '—'}</span></div>
            <div class="info-item"><span>Nacionalidade</span><span>${pessoaSelecionada.nacionalidade || '—'}</span></div>
            <div class="info-item"><span>Congregação</span><span>${pessoaSelecionada.congregacao || '—'}</span></div>
            <div class="info-item"><span>Área</span><span>${pessoaSelecionada.area || '—'}</span></div>
            <div class="info-item"><span>Grau de Instrução</span><span>${pessoaSelecionada.grauInstrucao || '—'}</span></div>
            <div class="info-item"><span>Nome do Pai</span><span>${pessoaSelecionada.nomePai || '—'}</span></div>
            <div class="info-item"><span>Nome da Mãe</span><span>${pessoaSelecionada.nomeMae || '—'}</span></div>
            <div class="info-item"><span>Endereço</span><span>${pessoaSelecionada.endereco || '—'}</span></div>
            <div class="info-item"><span>Bairro</span><span>${pessoaSelecionada.bairro || '—'}</span></div>
            <div class="info-item"><span>Cidade</span><span>${pessoaSelecionada.cidade || '—'}</span></div>
            <div class="info-item"><span>Estado</span><span>${pessoaSelecionada.estado || '—'}</span></div>
            <div class="info-item"><span>CEP</span><span>${pessoaSelecionada.cep || '—'}</span></div>
            <div class="info-item"><span>Célula</span><span>${pessoaSelecionada.celula || '—'}</span></div>
            <div class="info-item"><span>Frequenta EBD</span><span>${formatarSim(pessoaSelecionada.frequentaEbd)}</span></div>
            <div class="info-item"><span>Frequenta Doutrina</span><span>${formatarSim(pessoaSelecionada.frequentaDoutrina)}</span></div>
            <div class="info-item"><span>Batismo Espírito</span><span>${formatarSim(pessoaSelecionada.batismoEspirito)}</span></div>
            <div class="info-item"><span>Batismo Águas</span><span>${formatarSim(pessoaSelecionada.batismoAguas)}</span></div>
            <div class="info-item"><span>Evangélico</span><span>${formatarSim(pessoaSelecionada.evangelico)}</span></div>
            <div class="info-item"><span>Lazer</span><span>${pessoaSelecionada.lazer || '—'}</span></div>
            <div class="info-item"><span>O que aborrece</span><span>${pessoaSelecionada.aborrece || '—'}</span></div>
            <div class="info-item"><span>Como ser tratado</span><span>${pessoaSelecionada.tratado || '—'}</span></div>
            <div class="info-item"><span>Cor preferida</span><span>${pessoaSelecionada.corPreferida || '—'}</span></div>
            <div class="info-item"><span>Gosta da Bíblia</span><span>${formatarSim(pessoaSelecionada.gostaBiblia)}</span></div>
            <div class="info-item"><span>Função</span><span>${pessoaSelecionada.funcao || '—'}</span></div>
        </div>
    `
    document.getElementById('info-pessoa').innerHTML = html
}

document.getElementById('btn-voltar').addEventListener('click', function () {
    document.getElementById('detalhes-pessoa').style.display = 'none'
    document.getElementById('resultado-busca').style.display = 'block'
})

document.getElementById('btn-pdf-consulta').addEventListener('click', function () {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    function formatarData(data) {
        if (!data) return '—'
        const partes = String(data).split('-')
        if (partes.length === 3) return partes[2] + '/' + partes[1] + '/' + partes[0]
        return data
    }

    function formatarSim(valor) {
        return valor === 'sim' ? 'Sim' : 'Não'
    }

    const imgOficial = new Image()
    imgOficial.src = 'src/img/dejeadalpe-oficial.png'

    const imgIEADALPE = new Image()
    imgIEADALPE.src = 'src/img/IEADALPE.png'

    const imgDEJEADALPE = new Image()
    imgDEJEADALPE.src = 'src/img/Dejeadalpe.png'

    imgOficial.onload = function () {
        doc.addImage(imgOficial, 'PNG', 0, 0, 210, 297)
        doc.addImage(imgIEADALPE, 'PNG', 15, 5, 30, 30)
        doc.addImage(imgDEJEADALPE, 'PNG', 165, 5, 30, 30)

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
        doc.text('Nome: ' + (pessoaSelecionada.nome || '—'), 20, 50)
        doc.text('Nascimento: ' + formatarData(pessoaSelecionada.nascimento), 20, 60)
        doc.text('Idade: ' + (pessoaSelecionada.idade || '—'), 20, 70)
        doc.text('Naturalidade: ' + (pessoaSelecionada.naturalidade || '—'), 20, 80)
        doc.text('Nacionalidade: ' + (pessoaSelecionada.nacionalidade || '—'), 20, 90)
        doc.text('Congregação: ' + (pessoaSelecionada.congregacao || '—'), 20, 100)
        doc.text('Área: ' + (pessoaSelecionada.area || '—'), 20, 110)
        doc.text('Nome do Pai: ' + (pessoaSelecionada.nomePai || '—'), 20, 120)
        doc.text('Nome da Mãe: ' + (pessoaSelecionada.nomeMae || '—'), 20, 130)
        doc.text('Endereço: ' + (pessoaSelecionada.endereco || '—'), 20, 140)
        doc.text('Bairro: ' + (pessoaSelecionada.bairro || '—'), 20, 150)
        doc.text('Cidade: ' + (pessoaSelecionada.cidade || '—'), 20, 160)
        doc.text('Batismo Espírito: ' + formatarSim(pessoaSelecionada.batismoEspirito), 20, 170)
        doc.text('Batismo Águas: ' + formatarSim(pessoaSelecionada.batismoAguas), 20, 180)
        doc.text('Função: ' + (pessoaSelecionada.funcao || '—'), 20, 190)

        doc.setDrawColor(212, 160, 23)
        doc.line(15, 200, 195, 200)

        doc.save(pessoaSelecionada.nome + '.pdf')
    }
})