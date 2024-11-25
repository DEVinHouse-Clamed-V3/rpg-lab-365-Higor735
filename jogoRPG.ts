// Classe Arma
class Arma {
  private readonly nome: string;
  private readonly descricao: string;
  private _dano: number;

  constructor(nome: string, dano: number, descricao: string) {
      this.nome = nome;
      this.descricao = descricao;

      if (dano < 0) {
          throw new Error("O dano não pode ser negativo.");
      }
      this._dano = dano;
  }

  getNome(): string {
      return this.nome;
  }

  getDescricao(): string {
      return this.descricao;
  }

  getDano(): number {
      return this._dano;
  }

  setDano(novoDano: number): void {
      if (novoDano < 0) {
          throw new Error("O dano não pode ser negativo.");
      }
      this._dano = novoDano;
  }
}

// Classe Personagem
class Personagem {
  private nome: string;
  private vida: number;
  private forca: number;
  private arma: Arma | null;

  constructor(nome: string, vida: number, forca: number) {
      this.nome = nome;
      this.vida = vida;
      this.forca = forca;
      this.arma = null;
  }

  getNome(): string {
      return this.nome;
  }

  getVida(): number {
      return this.vida;
  }

  setVida(vida: number): void {
      this.vida = vida;
  }

  equiparArma(arma: Arma): void {
      this.arma = arma;
      console.log(`${this.nome} equipou a arma ${arma.getNome()} com dano de ${arma.getDano()}.`);
  }

  atacar(alvo: Personagem): void {
      const chanceDeAcerto = Math.random() >= 0.5;
      if (!chanceDeAcerto) {
          console.log(`${this.nome} tentou atacar ${alvo.getNome()}, mas errou o ataque!`);
          return;
      }

      const dano = this.calcularDano();
      console.log(`${this.nome} atacou ${alvo.getNome()} causando ${dano} de dano!`);
      alvo.receberDano(dano);
  }

  receberDano(dano: number): void {
      this.vida -= dano;
      if (this.vida <= 0) {
          console.log(`${this.nome} foi derrotado!`);
      } else {
          console.log(`${this.nome} recebeu ${dano} de dano e agora tem ${this.vida} de vida restante.`);
      }
  }

  protected calcularDano(): number {
      return this.forca + (this.arma ? this.arma.getDano() : 0);
  }
}

// Classe Inimigo
class Inimigo extends Personagem {
  atacar(alvo: Personagem): void {
      const chanceDeAcerto = Math.random() >= 0.2;
      if (!chanceDeAcerto) {
          console.log(`${this.getNome()} tentou atacar ${alvo.getNome()}, mas errou o ataque!`);
          return;
      }

      const dano = this.calcularDano();
      console.log(`${this.getNome()} atacou ${alvo.getNome()} causando ${dano} de dano!`);
      alvo.receberDano(dano);
  }
}

// Classe Chefe
class Chefe extends Inimigo {
  private habilidadeEspecial: string;

  constructor(nome: string, vida: number, forca: number, habilidadeEspecial: string) {
      super(nome, vida, forca);
      this.habilidadeEspecial = habilidadeEspecial;
  }

  atacar(alvo: Personagem): void {
      const chanceDeAcerto = Math.random() >= 0.2;
      if (!chanceDeAcerto) {
          console.log(`${this.getNome()} tentou atacar ${alvo.getNome()}, mas errou o ataque!`);
          return;
      }

      const dano = this.calcularDano() * 2; // Dano dobrado
      console.log(`${this.getNome()} usou sua força imensa e atacou ${alvo.getNome()}, causando ${dano} de dano!`);
      alvo.receberDano(dano);
  }

  receberDano(dano: number): void {
      super.receberDano(dano);

      if (this.getVida() <= 0) {
          const chanceDeReagir = Math.random() <= 0.2;
          if (chanceDeReagir) {
              console.log(`${this.getNome()} está à beira da morte e ativa sua habilidade especial: ${this.habilidadeEspecial}!`);
              this.usarHabilidadeEspecial();
          } else {
              console.log(`${this.getNome()} foi finalmente derrotado.`);
          }
      }
  }

  usarHabilidadeEspecial(): void {
      console.log(`${this.getNome()} lança sua habilidade especial devastadora!`);
      // Exemplo de habilidade: Causar dano em área ou se curar.
  }
}

// Instanciando os objetos
const espada = new Arma("Espada Longa", 15, "Uma espada poderosa.");
const jogador = new Personagem("Arthur", 100, 25);
jogador.equiparArma(espada);

const goblin = new Inimigo("Goblin", 50, 10);
const dragao = new Chefe("Dragão Ancião", 200, 50, "Explosão de Fogo");

// Simulação do combate
console.log("\n=== Combate Iniciado ===");
jogador.atacar(goblin);
goblin.atacar(jogador);

console.log("\n=== Combate com o Chefe ===");
jogador.atacar(dragao);
dragao.atacar(jogador);
dragao.receberDano(180);
jogador.atacar(dragao); // Ataque final
