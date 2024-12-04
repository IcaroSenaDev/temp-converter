document.getElementById('formulario').addEventListener('submit', async (event) => {
  event.preventDefault(); // Impede o envio do formulário e recarregamento da página

  const valor = parseFloat(document.getElementById('valor').value);
  const de = document.getElementById('de').value;
  const para = document.getElementById('para').value;

  if (isNaN(valor)) {
    alert('Por favor, insira um valor válido.');
    return;
  }

  try {
    // Envia a requisição para a API
    const response = await fetch('/converter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ valor, de, para }),
    });

    const data = await response.json();

    // Exibe o resultado
    document.getElementById('resultado').innerText = `Resultado: ${data.resultado}`;
  } catch (error) {
    console.error('Erro ao comunicar com o servidor:', error);
    document.getElementById('resultado').innerText = 'Erro ao realizar a conversão.';
  }
});
