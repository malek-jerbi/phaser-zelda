import { BaseGameObjectComponent } from "./base-game-object-component";
import { GameObject } from "../../common/types";

export class SpeedComponent extends BaseGameObjectComponent {
    #speed: number;

    constructor(gameObject: GameObject, speed: number) {
        super(gameObject);
        this.#speed = speed;
    }

    get speed(): number {
        return this.#speed;
    }
}