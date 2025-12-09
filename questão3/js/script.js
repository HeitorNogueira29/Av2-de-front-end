async function buscarClima() {
    let cidade = document.getElementById("cidade").value.trim();
    
    // Capitaliza a primeira letra de cada palavra
    cidade = cidade
        .toLowerCase()
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ');
    
    const climaDiv = document.getElementById("clima");

    try {
        // Geocoding
        const geo = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`
        );

        const geoData = await geo.json();

        if (!geoData.results) {
            climaDiv.innerHTML = "Cidade não encontrada.";
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        // Clima
        const climaReq = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code&timezone=auto`
        );

        const clima = await climaReq.json();
        const c = clima.current;

        climaDiv.innerHTML = `
            <h2>${cidade}</h2>
            Temperatura: ${c.temperature_2m}°C<br>
            Sensação: ${c.apparent_temperature}°C<br>
            Umidade: ${c.relative_humidity_2m}%<br>
            Código do clima: ${c.weather_code}<br>
        `;
    } catch (erro) {
        climaDiv.innerHTML = "Erro ao buscar dados.";
    }
}
