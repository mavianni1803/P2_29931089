function verificarCaptcha(event) {
    let response = grecaptcha.getResponse();
    if (response.length === 0) {
        console.log("Fallo en la recolección de datos. Completar Captcha.");
        event.preventDefault();
    }
}
document.getElementById("form").addEventListener("submit", verificarCaptcha);