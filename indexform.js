document.getElementById('devForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Pega os valores do formulário
    const formData = new FormData(this);
    
    // Envia o formulário usando Fetch API
    fetch('https://formspree.io/f/{your_form_id}', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Formulário enviado com sucesso!');
            this.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Ocorreu um erro ao enviar o formulário.');
                }
            });
        }
    }).catch(error => {
        alert('Ocorreu um erro ao enviar o formulário.');
    });
});
