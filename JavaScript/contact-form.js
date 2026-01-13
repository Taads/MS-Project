/**
 * JavaScript para preencher automaticamente o formulário de contato
 * quando o usuário vem de um link de serviço específico
 * Arquivo: contact-form.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // Função para obter parâmetros da URL (funciona com query string antes ou depois do hash)
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    // Procura tanto na URL completa quanto na parte antes do hash
    const url = window.location.href.split('#')[0];
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Verifica se há parâmetro de serviço na URL
  const servico = getUrlParameter('servico');
  
  if (servico) {
    // Função para preencher o formulário e fazer scroll
    function preencherFormulario() {
      const mensagemField = document.getElementById('mensagem');
      
      if (mensagemField) {
        // Preenche o campo com a mensagem pré-definida
        const mensagemPredefinida = `Gostaria de solicitar o orçamento para ${servico}. `;
        mensagemField.value = mensagemPredefinida;
        
        // Posiciona o cursor no final do texto
        mensagemField.focus();
        mensagemField.setSelectionRange(mensagemPredefinida.length, mensagemPredefinida.length);
        
        // Scroll suave até a seção de contato
        const contatoSection = document.getElementById('contato');
        if (contatoSection) {
          const headerOffset = 100;
          const elementPosition = contatoSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // Se o campo ainda não existe, tenta novamente após um delay
        setTimeout(preencherFormulario, 100);
      }
    }

    // Aguarda um pouco para garantir que o DOM está totalmente carregado
    setTimeout(preencherFormulario, 300);
  }
});

