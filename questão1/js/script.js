// Alterna entre os formulários de serviço
const tipoServico = document.getElementById("tipoServico");
const areaInterpretacao = document.getElementById("areaInterpretacao");
const areaTraducao = document.getElementById("areaTraducao");

tipoServico.addEventListener("change", function () {
    areaInterpretacao.style.display = this.value === "interpretacao" ? "block" : "none";
    areaTraducao.style.display = this.value === "traducao" ? "block" : "none";
});

// Função principal
function calcular() {
    if (tipoServico.value === "interpretacao") {
        calcularInterpretacao();
    } else if (tipoServico.value === "traducao") {
        calcularTraducao();
    } else {
        document.getElementById("resultado").innerHTML =
            "<p>Selecione um tipo de serviço.</p>";
    }
}

// ------- Cálculo de INTERPRETAÇÃO ---------
function calcularInterpretacao() {
    let tempo = Number(document.getElementById("tempoEvento").value);
    let tipoEvento = document.getElementById("tipoEvento").value;
    let gravado = document.getElementById("gravado").value;

    let valorHora = tipoEvento === "artistico" ? 192 : 144;
    let interpretes = tempo <= 60 ? 1 : 2;

    let horas = tempo / 60;
    let valorTotalHoras = valorHora * horas * interpretes;

    let direitoImagem = gravado === "sim" ? valorTotalHoras * 0.10 : 0;
    let total = valorTotalHoras + direitoImagem;
    let imposto = total * 0.155;

    document.getElementById("resultado").innerHTML = `
        <h3>Resultado - Interpretação</h3>
        <p>Valor/hora: R$ ${valorHora.toFixed(2)}</p>
        <p>Intérpretes: ${interpretes}</p>
        <p>Horas totais: ${horas.toFixed(2)}</p>
        <p>Valor total das horas: R$ ${valorTotalHoras.toFixed(2)}</p>
        <p>Direito de imagem: R$ ${direitoImagem.toFixed(2)}</p>
        <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
        <p>Impostos (15,5%): R$ ${imposto.toFixed(2)}</p>
    `;
}

// ------- Cálculo de TRADUÇÃO ---------
function calcularTraducao() {
    let tipoMaterial = document.getElementById("tipoMaterial").value;
    let tempo = Number(document.getElementById("tempoVideo").value);
    let legendagem = document.getElementById("legendagem").value;

    let valorMinuto;

    if (tipoMaterial === "propaganda") {
        valorMinuto = 250;
    } else {
        valorMinuto = legendagem === "sim" ? 96 : 60;
    }

    let total = valorMinuto * tempo;
    let direitoImagem = total * 0.30;
    let totalFinal = total + direitoImagem;
    let imposto = totalFinal * 0.155;

    document.getElementById("resultado").innerHTML = `
        <h3>Resultado - Tradução</h3>
        <p>Valor/minuto: R$ ${valorMinuto.toFixed(2)}</p>
        <p>Tempo total: ${tempo} min</p>
        <p>Valor total: R$ ${total.toFixed(2)}</p>
        <p>Direito de imagem (30%): R$ ${direitoImagem.toFixed(2)}</p>
        <p><strong>Total a pagar: R$ ${totalFinal.toFixed(2)}</strong></p>
        <p>Impostos (15,5%): R$ ${imposto.toFixed(2)}</p>
    `;
}
