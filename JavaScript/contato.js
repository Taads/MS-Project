
  // Script para exibir mensagem de sucesso sem recarregar a página
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[action*="formspree.io"]');

    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const successMessage = form.querySelector('.form-success');

        try {
          const data = new FormData(form);
          const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            form.reset();
            if (successMessage) {
              successMessage.style.display = 'block';
              setTimeout(() => successMessage.style.display = 'none', 6000);
            }
          } else {
            alert("Ocorreu um erro. Tente novamente mais tarde.");
          }
        } catch (error) {
          alert("Erro ao enviar. Verifique sua conexão.");
        }
      });
    });
  });
