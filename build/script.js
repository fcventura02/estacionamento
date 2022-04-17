import Patio from "./patio.js";
/*  */
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    const patio = new Patio();
    patio.render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        console.log({ nome, placa });
        if (!nome || !placa) {
            alert("os campos nome e placa são obrigatórios");
            return;
        }
        patio.adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
