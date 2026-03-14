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
                return fetch(URL_SCRIPT + '?area=' + encodeURIComponent(area))
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

// USANDO DELEGAÇÃO DE EVENTOS PARA BTN-VOLTAR E BTN-PDF
document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'btn-voltar') {
        document.getElementById('detalhes-pessoa').style.display = 'none'
        document.getElementById('resultado-busca').style.display = 'block'
    }

    if (e.target && e.target.id === 'btn-pdf-consulta') {
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

        const imgIEADALPE = new Image()
        imgIEADALPE.src = 'src/img/IEADALPE.png'

        const imgDEJEADALPE = new Image()
        imgDEJEADALPE.src = 'src/img/Dejeadalpe.png'

        imgIEADALPE.onload = function () {
            doc.addImage(imgIEADALPE, 'PNG', 15, 5, 30, 30)
            doc.addImage(imgDEJEADALPE, 'PNG', 165, 5, 30, 30)

            // CABEÇALHO
            doc.setFontSize(16)
            doc.setTextColor(212, 160, 23)
            doc.text('Igreja Evangélica Assembleia de Deus', 105, 15, { align: 'center' })
            doc.setFontSize(13)
            doc.text('Com Sede em Abreu e Lima / PE', 105, 23, { align: 'center' })
            doc.setFontSize(11)
            doc.setTextColor(0, 0, 0)
            doc.text('PR. Presidente: Roberto José dos Santos Lucena', 105, 30, { align: 'center' })
            doc.text('Coord. Estadual: Iraci Soares de Souza Santos', 105, 37, { align: 'center' })
            doc.text('Superintendente: Pr. Kelvin Klain', 105, 44, { align: 'center' })

            doc.setDrawColor(212, 160, 23)
            doc.line(15, 48, 195, 48)

            doc.setFontSize(15)
            doc.setTextColor(212, 160, 23)
            doc.text('DEJEADALPE', 105, 55, { align: 'center' })

            doc.setDrawColor(212, 160, 23)
            doc.line(15, 59, 195, 59)

            // DADOS
            doc.setFontSize(13)

            function linha(rotulo, valor, y) {
                doc.setTextColor(212, 160, 23)
                doc.text(rotulo, 20, y)
                doc.setTextColor(0, 0, 0)
                doc.text(String(valor || '—'), 20 + doc.getTextWidth(rotulo) + 2, y)
            }

            linha('Nome:', pessoaSelecionada.nome, 70)
            linha('Nascimento:', formatarData(pessoaSelecionada.nascimento), 80)
            linha('Idade:', pessoaSelecionada.idade, 90)
            linha('Naturalidade:', pessoaSelecionada.naturalidade, 100)
            linha('Nacionalidade:', pessoaSelecionada.nacionalidade, 110)
            linha('Congregação:', pessoaSelecionada.congregacao, 120)
            linha('Área:', pessoaSelecionada.area, 130)
            linha('Grau de Instrução:', pessoaSelecionada.grauInstrucao, 140)
            linha('Nome do Pai:', pessoaSelecionada.nomePai, 150)
            linha('Nome da Mãe:', pessoaSelecionada.nomeMae, 160)
            linha('Endereço:', pessoaSelecionada.endereco, 170)
            linha('Bairro:', pessoaSelecionada.bairro, 180)
            linha('Cidade:', pessoaSelecionada.cidade, 190)
            linha('Batismo Espírito:', formatarSim(pessoaSelecionada.batismoEspirito), 200)
            linha('Batismo Águas:', formatarSim(pessoaSelecionada.batismoAguas), 210)
            linha('Função:', pessoaSelecionada.funcao, 220)

            doc.setDrawColor(212, 160, 23)
            doc.line(15, 226, 195, 226)

            doc.save(pessoaSelecionada.nome + '.pdf')
        }
    }
})