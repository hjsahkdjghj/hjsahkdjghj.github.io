document.getElementById('webhookForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const webhookUrl = document.getElementById('webhookUrl').value;
  const username = document.getElementById('username').value;
  const profileImage = document.getElementById('profileImage').value;
  const message = document.getElementById('message').value;
  const embedTitle = document.getElementById('embedTitle').value;
  const embedDescription = document.getElementById('embedDescription').value;
  const embedImage = document.getElementById('embedImage').value;
  const embedThumbnail = document.getElementById('embedThumbnail').value;
  const embedColor = document.getElementById('embedColor').value;
  const embedFooter = document.getElementById('embedFooter').value;
  const messageBox = document.getElementById('messageBox');

  // Construa o corpo da solicitação
  const payload = {
    content: message
  };

  // Adicione o nome de usuário se fornecido
  if (username) {
    payload.username = username;
  }

  // Adicione a URL da imagem de perfil se fornecida
  if (profileImage) {
    payload.avatar_url = profileImage;
  }

  // Adicione o embed se qualquer informação for fornecida
  if (embedTitle || embedDescription || embedImage || embedThumbnail || embedColor || embedFooter) {
    payload.embeds = [{
      title: embedTitle || undefined,
      description: embedDescription || undefined,
      image: {
        url: embedImage || undefined
      },
      thumbnail: {
        url: embedThumbnail || undefined
      },
      color: embedColor ? parseInt(embedColor.replace('#', ''), 16) : undefined,
      footer: {
        text: embedFooter || undefined
      }
    }];
  }

  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      messageBox.textContent = 'Mensagem enviada com sucesso!';
      messageBox.className = 'message success';
    } else {
      messageBox.textContent = 'Erro ao enviar mensagem.';
      messageBox.className = 'message error';
    }
  })
  .catch(error => {
    messageBox.textContent = 'Erro ao enviar mensagem.';
    messageBox.className = 'message error';
  });
});
