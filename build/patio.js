class Patio {
    constructor() {
        this.$ = (query) => document.querySelector(query);
    }
    calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor(min % 60000);
        return `${min}m e ${sec}s`;
    }
    remover(placa) {
        const { entrada, nome } = this.ler().find((veiculo) => veiculo.placa === placa);
        const tempo = this.calcTempo(new Date().getTime() - new Date(entrada).getTime());
        if (!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
            return;
        this.salvar(this.ler().filter((veiculo) => veiculo.placa != placa));
    }
    render() {
        this.$("#patio").innerHTML = "";
        const patio = this.ler();
        if (patio.length) {
            patio.forEach((veiculo) => this.adicionar(veiculo, false));
        }
    }
    ler() {
        return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }
    salvar(veiculos) {
        localStorage.setItem("patio", JSON.stringify(veiculos));
    }
    adicionar(veiculo, salvo) {
        var _a, _b;
        const row = document.createElement("tr");
        var convertDate = new Date(veiculo.entrada);
        row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${convertDate.toLocaleDateString("pt-BR")} - ${convertDate.toLocaleTimeString()}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </td> 
            `;
        (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
            this.remover(veiculo.placa);
            this.render();
        });
        (_b = this.$("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
        salvo && this.salvar([...this.ler(), veiculo]);
    }
}
export default Patio;
