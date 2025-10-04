import { BaseGameObjectComponent } from "./base-game-object-component";
import { GameObject } from "../../common/types";

export class CollidingObjectsComponent extends BaseGameObjectComponent {
    #objects: GameObject[];

    constructor(gameObject: GameObject) {
        super(gameObject);
        this.#objects = [];
    }

    public add(object: GameObject): void {
        this.#objects.push(object);
    }

    public reset(): void {
        this.#objects = [];
    }

    get objects(): GameObject[] {
        return this.#objects;
    }
}