$(document).ready(function () {
    const API_URL = "http://localhost:3000/usuarios";
    $("#formUserLogin").submit(function (evento) {
        evento.preventDefault();
        const email = $('#email').val();
        const senha = $('#senha').val();
        if(!email || !senha){
            mensagem("Preencha todos os campos", true);
            return;
        }
        $.ajax({
            url: `${API_URL}?email=${email}&senha=${senha}`,
            method: "GET",
            dataType: "json",
            success: function (dado) {
                if(dado.length > 0){
                    $("#nomeLogado").text(dado[0].name);
                    $("#cargo").text(dado[0].cargo);
                    
                         localStorage.setItem("usuarioLogado", JSON.stringify(dado[0]));
                        if(dado[0].cargo == "Adm" ){
                            window.location.href = "../adm.html";
                        }else{
                       

                        window.location.href = "func.html";
                        }
                    
                }else{
                    mensagem("Email ou senha incorretos", true);
                }
            },
            error: function () {
                mensagem("Ocorreu um erro ao realizar o login", true);
            }
        });
    })
  
    $("#formUserCadastro").submit(function (evento) {
        evento.preventDefault();
        const name =$('#name').val();
        const email =$('#email').val();
        const senha =$('#senha').val();
        if(!name || !email || !senha){
            mensagem("Preencha todos os campos", true);
            return;
        }

        const dadosUser = {name, email, senha};
            $.ajax({
                url: API_URL,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(dadosUser),
                dataType: "json",
                success: function () {
                    
                        window.location.href = "login.html";
                    
                },
                error: function () {
                    mensagem("Ocorreu um erro ao cadastrar o usuário", true);
                }
                 
            });
            
    });
});