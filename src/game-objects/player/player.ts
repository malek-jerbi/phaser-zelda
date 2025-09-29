import * as Phaser from 'phaser'
import { Position } from "../../common/types";
import { PLAYER_ANIMATION_KEYS } from '../../common/assets';
import { InputComponent } from '../../components/input/input-component';
import { ControlsComponent } from '../../components/game-object/controls-component';
import { isArcadePhysicsBody } from '../../common/utils';

export type PlayerConfig = {
    scene: Phaser.Scene;
    position: Position;
    assetKey: string;
    frame?: number;
    controls: InputComponent;
}
export class Player extends Phaser.Physics.Arcade.Sprite {
    #controlsComponent: ControlsComponent;
    constructor(config: PlayerConfig) {
        const {scene, position, assetKey, frame} = config
        const {x, y} = position;
        super(scene, x, y, assetKey, frame || 0)

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.#controlsComponent = new ControlsComponent(this, config.controls);

        this.play({ key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1});

        config.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        config.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            config.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        });
    }

    update(): void {
        const controls = this.#controlsComponent.controls;
        if (controls.isUpDown) {
            this.play ({key: PLAYER_ANIMATION_KEYS.WALK_UP, repeat: -1}, true);
            this.#updateVelocity(false, -1);
        }
        else if (controls.isDownDown) {
            this.play ({key: PLAYER_ANIMATION_KEYS.WALK_DOWN, repeat: -1}, true);
            this.#updateVelocity(false, 1);
        }
        else {
            this.#updateVelocity(false, 0);
        }

        const isMovingVertically = controls.isUpDown || controls.isDownDown;
        const isMovingHorizontally = controls.isLeftDown || controls.isRightDown;
        const isMoving = isMovingVertically || isMovingHorizontally;
        
        if (controls.isLeftDown) {
            this.setFlipX(true);
            this.#updateVelocity(true, -1);
            if (!isMovingVertically) {
                this.play ({key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1}, true);
            }
        }
        else if (controls.isRightDown) {
            this.setFlipX(false);
            this.#updateVelocity(true, 1);
            if (!isMovingVertically) {
                this.play ({key: PLAYER_ANIMATION_KEYS.WALK_SIDE, repeat: -1}, true);
            }
        }
        else {
            this.#updateVelocity(true, 0);
        }

        if (!isMoving) {
            this.play ({key: PLAYER_ANIMATION_KEYS.IDLE_DOWN, repeat: -1}, true);
        }


    }

    #updateVelocity(isX: boolean, value: number): void {
        if (!isArcadePhysicsBody(this.body)) {
            return;
        }

        if (isX) {
            this.body.velocity.x = value * 80;
            return;
        } 
        this.body.velocity.y = value * 80;
        
    }

    
}