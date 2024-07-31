function add_pet(index) {

    container = document.getElementsByClassName("form-pet")[index];

    container.innerHTML += "<br> <div class='row'>\
                                <div class='col-md'>\
                                    <input class='form-control' name='pet' type='text' placeholder='Pet'>\
                                </div>\
                                <div class='col-md'>\
                                    <select class='form-control'name='especie'>\
                                        <option value='cachorro'>Cachorro</option>\
                                        <option value='gato'>Gato</option>\
                                        <option value='passaro'>Pássaro</option>\
                                        <option value='hamster'>Hamster</option>\
                                    </select>\
                                </div>\
                                <div class='col-md'>\
                                    <input class='form-control' name='raca' type='text' placeholder='Raça'>\
                                </div>\
                                <div class='col-md'>\
                                    <input class='form-control' type='text' name='idade' placeholder='Idade'>\
                                </div>\
                            </div>";
}

function exibir_form(tipo) {
    add_cliente = document.getElementById("adicionar-cliente");
    att_cliente = document.getElementById("att_cliente");

    if (tipo == "1") {
        att_cliente.style.display = "none";
        add_cliente.style.display = "block";
    } else if (tipo == "2") {
        add_cliente.style.display = "none";
        att_cliente.style.display = "block";
        dados_cliente();
    }
}

function dados_cliente() {
    cliente = document.getElementById("cliente-select");
    csrf_token = document.querySelector("[name=csrfmiddlewaretoken]").value;
    id_cliente = cliente.value;

    data = new FormData();
    data.append("id_cliente", id_cliente);

    fetch("/clientes/atualiza_cliente/", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrf_token,
        },
        body: data,
    })
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            document.getElementById("form-att-cliente").style.display = "block";

            id = data["cliente_id"];

            nome = document.getElementById("nome");
            nome.value = data["cliente"]["nome"];

            sobrenome = document.getElementById("sobrenome");
            sobrenome.value = data["cliente"]["sobrenome"];

            cpf = document.getElementById("cpf");
            cpf.value = data["cliente"]["cpf"];

            email = document.getElementById("email");
            email.value = data["cliente"]["email"];

            div_pets = document.getElementsByClassName("form-pet")[1];
            div_pets.innerHTML = "";

            for (i = 0; i < data["pets"].length; i++) {
                div_pets.innerHTML +=
                    "<form action='/clientes/update_pet/" +
                    data["pets"][i]["id"] +
                    "' method='POST'>\
                <div class='row'>\
                        <div class='col-md'>\
                            <input class='form-control' name='pet' type='text' value='" +
                    data["pets"][i]["fields"]["pet"] +
                    "'>\
                        </div>\
                        <div class='col-md'>\
                            <select class='form-control'name='especie' value='" +
                    data["pets"][i]["fields"]["especie"] +
                    "'>\
                                <option value='cachorro'>Cachorro</option>\
                                <option value='gato'>Gato</option>\
                                <option value='passaro'>Pássaro</option>\
                                <option value='hamster'>Hamster</option>\
                            </select>\
                        </div>\
                        <div class='col-md'>\
                            <input class='form-control' name='raca' type='text' value='" +
                    data["pets"][i]["fields"]["raca"] +
                    "'>\
                        </div>\
                        <div class='col-md'>\
                            <input class='form-control' type='text' name='idade' value='" +
                    data["pets"][i]["fields"]["idade"] +
                    "' >\
                        </div>\
                        <div class='col-md'>\
                            <input class='btn btn-lg btn-success' type='submit'>\
                        </div>\
                    </form>\
                    <div class='col-md'>\
                        <a href='/clientes/excluir_pet/" + data["pets"][i]["id"] + "' class='btn btn-lg btn-danger'>EXCLUIR</a>\
                    </div>\
                </div><br>";
            }

            document.getElementById("att-btn").href = "clientes/update_cliente/" + id;
        });
}

function update_cliente() {
    cliente = document.getElementById("cliente-select");
    csrf_token = document.querySelector("[name=csrfmiddlewaretoken]").value;
    id = cliente.value;

    nome = document.getElementById("nome").value;
    sobrenome = document.getElementById("sobrenome").value;
    email = document.getElementById("email").value;
    cpf = document.getElementById("cpf").value;

    fetch("/clientes/update_cliente/" + id, {
        method: "POST",
        headers: {
            "X-CSRFToken": csrf_token,
        },
        body: JSON.stringify({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            cpf: cpf,
        }),
    })
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            if (data["status"] == "200") {
                nome = data["nome"];
                sobrenome = data["sobrenome"];
                email = data["email"];
                cpf = data["cpf"];
                console.log("Dados alterados com sucesso");
            } else {
                console.log("Ocorreu algum erro");
            }
        });
}
