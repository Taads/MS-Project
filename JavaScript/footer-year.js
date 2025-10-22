document.addEventListener('DOMContentLoaded', () => {
  // ========================
  // Footer Year
  // ========================
  const ano = document.getElementById('ano-atual');
  if (ano) ano.textContent = new Date().getFullYear();
});
