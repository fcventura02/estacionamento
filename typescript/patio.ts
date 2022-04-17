interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date | string;
}
class Patio {
    $ = (query: string): HTMLInputElement | null =>
        document.querySelector(query);
    constructor() {}
    calcTempo(mil: number) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor(min % 60000);

        return `${min}m e ${sec}s`;
    }
    remover(placa: string) {
        const { entrada, nome } = this.ler().find(
            (veiculo) => veiculo.placa === placa
        );

        const tempo = this.calcTempo(
            new Date().getTime() - new Date(entrada).getTime()
        );

        if (
            !confirm(
                `O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`
            )
        )
            return;
        this.salvar(this.ler().filter((veiculo) => veiculo.placa != placa));
    }
    render() {
        this.$("#patio")!.innerHTML = "";
        const patio = this.ler();

        if (patio.length) {
            patio.forEach((veiculo) => this.adicionar(veiculo, false));
        }
    }
    ler(): Veiculo[] {
        return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }
    salvar(veiculos: Veiculo[]) {
        localStorage.setItem("patio", JSON.stringify(veiculos));
    }
    adicionar(veiculo: Veiculo, salvo?: boolean) {
        const row = document.createElement("tr");
        var convertDate = new Date(veiculo.entrada);
        row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${convertDate.toLocaleDateString(
                    "pt-BR"
                )} - ${convertDate.toLocaleTimeString()}</td>
                <td>
                    <button class="delete" data-placa="${
                        veiculo.placa
                    }"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </td> 
            `;
        row.querySelector(".delete")?.addEventListener(
            "click",
            (e: PointerEvent | any) => {
                this.remover(veiculo.placa);
                this.render();
            }
        );
        this.$("#patio")?.appendChild(row);
        salvo && this.salvar([...this.ler(), veiculo]);
    }
}

export default Patio;
