$(document).ready(function () {
    const API_URL = "http://localhost:3000/usuarios";

    function mensagem(msg, isError = false){
        $("#mensagem").text(msg).toggleClass("erro", isError);
        setTimeout(() => $("#mensagem").text(""), 3000);
    }
     const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
      $("#nomeLogado").text(usuario.name);

    function listarUsuarios(){
        $.ajax({
            url: API_URL,
            method: "GET",
            dataType: "json",
            success: function (dado) {
                let tabela ="";
                dado.forEach(usuario => {
                    tabela += `
                    <tr>
                    <td>${usuario.name}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.cargo}</td>
                    <td>
                    <button class="editar" data-id="${usuario.id}">Editar</button>
                    <button class="excluir" data-id="${usuario.id}">Excluir</button>
                    </td>
                    </tr>
                    `;
                   
                });
                 $("#ListaUsuarios").html(tabela);
            },
             error: function () {
                mensagem("Ocorreu um erro ao listar os usuários", true);
            }
        });
    }
    listarUsuarios();
    $("#formUser").submit(function (evento) {
        evento.preventDefault();
        const id = $('#idUsuario').val();
        const name =$('#name').val();
        const email =$('#email').val();
        const cargo =$('#funcao').val();
        if(!name || !email || !cargo){
            mensagem("Preencha todos os campos", true);
            return;
      
        }
        const dadosUser = {name, email, cargo};
        if(id){
            $.ajax({

                url: `${API_URL}/${id}`,
                method: "PATCH",
                contentType: "application/json",
                data: JSON.stringify(dadosUser),
                success: function () {
                    mensagem("Usuário atualizado com sucesso");
                    $('#formUser')[0].reset();
                    $('#idUsuario').val('');
                    listarUsuarios();
                },
                error: function () {
                    mensagem("Ocorreu um erro ao atualizar o usuário", true);
                }
            })
        }else{
            $.ajax({
                url: API_URL,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(dadosUser),
                dataType: "json",
                success: function () {
                    mensagem("Usuário criado com sucesso");
                    $('#formUser')[0].reset();
                    listarUsuarios();
                },
                error: function () {
                    mensagem("Ocorreu um erro ao cadastrar o usuário", true);
                }
                 
            });
            
        }
    });
    $(document).on('click', '.excluir', function (e) {
        e.preventDefault();
        const id = $(this).data("id");
        $.ajax({
            url: `${API_URL}/${id}`,
            method: "DELETE",
            success: function () {
                mensagem("Usuário removido com sucesso");
                listarUsuarios();
            },
            error: function () {
                mensagem("Ocorreu um erro ao remover o usuário", true);
            }
        });
    });
    $(document).on('click','.editar', function(){
        const id = $(this).data("id");
        $.ajax({
            url: `${API_URL}/${id}`,
            method: "GET",
            dataType: "json",
            success: function (dado) {
                $('#idUsuario').val(dado.id);
                $('#name').val(dado.name);
                $('#email').val(dado.email);
                $('#cargo').val(dado.cargo);
            },
            error: function () {
            }
        });
    });
})