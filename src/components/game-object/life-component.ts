import { BaseGameObjectComponent } from "./base-game-object-component";
import { GameObject } from "../../common/types";

export class LifeComponent extends BaseGameObjectComponent {
    #maxLife: number;
    #curentLife: number;

    constructor(gameObject: GameObject, maxLife: number, currentLife = maxLife) {
        super(gameObject);
        this.#maxLife = maxLife;
        this.#curentLife = currentLife;
    }
    
    get life(): number {
        return this.#curentLife;
    }
    get maxLife(): number {
        return this.#maxLife;
    }

    public takeDamage(damage: number): void {
        if (this.#curentLife <= 0) {
            return;
        }
        this.#curentLife -= damage;
        if (this.#curentLife <= 0) {
            this.#curentLife = 0;
        }
    }

}