import Patio from "./patio"
/*  */
(function () {
    const $ = (query: string): HTMLInputElement | null =>
        document.querySelector(query);
    const patio = new Patio()
    patio.render();

    $("#cadastrar")?.addEventListener("click", function () {
        const nome = $("#nome")?.value;
        const placa = $("#placa")?.value;
        console.log({ nome, placa });
        if (!nome || !placa) {
            alert("os campos nome e placa são obrigatórios");
            return;
        }

        patio.adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
