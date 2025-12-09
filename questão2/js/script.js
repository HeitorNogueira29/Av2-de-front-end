function calcularPlanos() {
    let idade = Number(document.getElementById("idade").value);
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    // Validações: valores numéricos e sem negativos / altura > 0
    if (isNaN(idade) || isNaN(peso) || isNaN(altura)) {
        alert('Por favor, preencha todos os campos com valores numéricos.');
        return;
    }

    if (idade < 0 || peso < 0 || altura <= 0) {
        alert('Valores inválidos: idade ou peso não podem ser negativos; altura deve ser maior que zero.');
        return;
    }

    let imc = peso / (altura * altura);

    // --- Operadora A ---
    let aBasico = 100 + (idade * 10 * (imc / 10));
    let aStandard = (150 + (idade * 15)) * (imc / 10);
    let aPremium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    // --- Operadora B ---
    let fator = 1;
    if (imc < 18.5) fator = 10;
    else if (imc < 25) fator = 1;
    else if (imc < 30) fator = 6;
    else if (imc < 35) fator = 10;
    else if (imc < 40) fator = 20;
    else fator = 30;

    let bBasico = 100 + (fator * 10 * (imc / 10));
    let bStandard = (150 + (fator * 15)) * (imc / 10);
    let bPremium = (200 - (imc * 10) + (fator * 20)) * (imc / 10);

    document.getElementById("resultadoPlanos").innerHTML = `
        <h3>Operadora A</h3>
        <p>Básico: ${aBasico.toFixed(2)}</p>
        <p>Standard: ${aStandard.toFixed(2)}</p>
        <p>Premium: ${aPremium.toFixed(2)}</p>

        <h3>Operadora B</h3>
        <p>Básico: ${bBasico.toFixed(2)}</p>
        <p>Standard: ${bStandard.toFixed(2)}</p>
        <p>Premium: ${bPremium.toFixed(2)}</p>
    `;
}
