/* Café da Claudinha — script.js
   Uso restrito: menu mobile + validação do formulário de contato (front-end). */

(function () {
  "use strict";

  // --- Menu mobile simples ---
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
  }

  // --- Formulário de contato (UC04 / RF04) ---
  var form = document.getElementById("contact-form");
  if (!form) return;

  var nome = document.getElementById("nome");
  var email = document.getElementById("email");
  var mensagem = document.getElementById("mensagem");
  var feedback = document.getElementById("form-feedback");

  function setError(input, errorId, show) {
    var el = document.getElementById(errorId);
    if (el) el.classList.toggle("visible", !!show);
    if (input) input.setAttribute("aria-invalid", show ? "true" : "false");
  }

  function isEmailValid(value) {
    // Validação básica de formato: algo@algo.algo
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function showFeedback(type, text) {
    feedback.className = "form-feedback " + type;
    feedback.textContent = text;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // sem backend: impede recarregamento

    var nomeOk = nome.value.trim().length > 0;
    var emailOk = isEmailValid(email.value.trim());
    var mensagemOk = mensagem.value.trim().length > 0;

    setError(nome, "erro-nome", !nomeOk);
    setError(email, "erro-email", !emailOk);
    setError(mensagem, "erro-mensagem", !mensagemOk);

    if (!nomeOk || !emailOk || !mensagemOk) {
      showFeedback("error", "Verifique os campos destacados e tente novamente.");
      return;
    }

    showFeedback("success", "Mensagem enviada com sucesso!");
    form.reset();
  });

  // Limpa erro do campo enquanto o usuário digita
  [nome, email, mensagem].forEach(function (input) {
    input.addEventListener("input", function () {
      feedback.className = "form-feedback";
      feedback.textContent = "";
    });
  });
})();
