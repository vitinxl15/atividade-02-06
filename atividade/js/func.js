$(document).ready(function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    $("#nomeLogado").text(usuario.name);
    $("#cargo").text(usuario.cargo);
    if(usuario.cargo == "funcionario"){
    listarUsuarios();
    
    function listarUsuarios() {
        $.ajax({
            url: "http://localhost:3000/usuarios",
            method: "GET",
            dataType: "json",
            success: (dado) => {
                let tabela = "";
                dado.forEach(usuario => {
                    if(usuario.name == $("#nomeLogado").text()){
                    tabela += `
                    <tr>
                        <td>${usuario.name}</td>
                        <td>${usuario.email}</td>
                        <td>
                            <button class="editar" data-id="${usuario.id}">Editar</button>
                        </td>
                    </tr>`;
                }
                });
                $("#ListaUsuarios").html(tabela);
            },
            error: () => {
                mensagem("Ocorreu um erro ao listar os usuários", true);
            }
        });
        
    }
     listarUsuarios();
    }
   
    if(usuario.cargo == "supervisor"){
    listarUsuariosSup();
    
    function listarUsuariosSup() {
        $.ajax({
            url: "http://localhost:3000/usuarios",
            method: "GET",
            dataType: "json",
            success: (dado) => {
                let tabela = "";
                dado.forEach(usuario => {
                    if(usuario.name == $("#nomeLogado").text()){
                    tabela += `
                    <tr>
                        <td>${usuario.name}</td>
                        <td>${usuario.email}</td>
                        <td style="border: none;">
                            <button class="editar" data-id="${usuario.id}">Editar</button>
                        </td>
                    </tr>`;
                }
                if(usuario.name != $("#nomeLogado").text()){
                    tabela += `
                    <tr>
                        <td>${usuario.name}</td>
                        <td>${usuario.email}</td>
                        
                    </tr>`;
                
                }
                });
                $("#ListaUsuarios").html(tabela);
            },
            error: () => {
                mensagem("Ocorreu um erro ao listar os usuários", true);
            }
        });
    }
}
     $("#formUser").submit(function (e) {
    e.preventDefault();

    const id = $('#idUsuario').val();
    const nome = $('#name').val();
    const email = $('#email').val();
    const cargo = usuario.cargo;
    const password = usuario.password;


    console.log("Enviando PUT para usuário:", id);

    $.ajax({
        url: `http://localhost:3000/usuarios/${id}`,
        method: "PATCH",
        contentType: "application/json",
        data: JSON.stringify({
            name: nome,
            email: email,
            cargo: cargo,
            password: password


        }),
        success: function () {
            mensagem("Usuário atualizado com sucesso!", false);

            // Atualiza localStorage se for o próprio usuário
            const usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado"));
            if (usuarioAtual.id == id) {
                usuarioAtual.email = email;
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtual));
            }

            listarUsuarios();
        },
        error: function () {
            mensagem("Erro ao atualizar usuário.", true);
        }
    });
});

    $(document).on('click', '.editar', function () {
        const id = $(this).data("id");
        $.ajax({
            url: `http://localhost:3000/usuarios/${id}`,
            method: "GET",
            dataType: "json",
            success: function (dado) {
                $('#idUsuario').val(dado.id);
                $('#name').val(dado.name);
                $('#email').val(dado.email);
            },
            error: function () {
                mensagem("Ocorreu um erro ao editar o usuário", true);
            }
        });
    });
    
    
});