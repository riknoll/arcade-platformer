namespace platformer {
    let _state: PlatformerState;

    const DATA_KEY = "%riknoll_arcade_platformer";

    export class PlatformerState {
        protected gravity: number;
        protected gravityDirection: number;
        protected controlledSprites: Sprite[];

        constructor() {
            game.currentScene().eventContext.registerFrameHandler(scene.PHYSICS_PRIORITY + 1, () => {
                this.update();
            });

            this.controlledSprites = [];
        }

        public setGravity(gravity: number) {
            this.gravity = gravity;
        }

        public setGravityForSprite(sprite: Sprite, gravity: number) {

        }

        public setGravityDirection(direction: number) {
            this.gravityDirection = direction;
        }

        public controlSprite(sprite: Sprite, speed: number) {
            this.controlledSprites.push(sprite);
            getDataForSprite(sprite).controlSpeed = speed;
        }

        public doJump(sprite: Sprite, height: number) {
            sprite.vy = - Math.sqrt(2 * height * this.gravity);
        }

        public isOnGround(sprite: Sprite): boolean {
            return sprite.isHittingTile(CollisionDirection.Bottom);
        }

        public isFacing(sprite: Sprite, direction: number) {
            return direction === FacingDirection.Left ? getDataForSprite(sprite).facingLeft : !(getDataForSprite(sprite).facingLeft);
        }

        public setAnimation(sprite: Sprite, animationType: number, frames: Image[], interval: number) {
            if (!getDataForSprite(sprite).animation) getDataForSprite(sprite).animation = {};
            getDataForSprite(sprite).animation[animationType] = {
                frames,
                interval
            };
        }

        public onSpriteHitsObstacle(kind: number, obstacle: number, handler: (sprite: Sprite, location: tiles.Location) => void) {

        }

        public onSpriteApproachesLedge(kind: number, handler: (sprite: Sprite, location: tiles.Location) => void) {

        }

        public onSpriteLandsOnTopOf(kind1: number, kind2: number, handler: (sprite: Sprite, otherSprite: Sprite) => void) {
        
        }

        protected update() {
            for (const sprite of getActualSprites()) {
                getDataForSprite(sprite);
                sprite.ay = this.gravity;
            }

            this.updateControlledSprites();
            this.updateAnimations();
        }

        protected updateControlledSprites() {
            for (const sprite of this.controlledSprites) {
                sprite.vx = 0;
                if (controller.left.isPressed()) {
                    sprite.vx -= getDataForSprite(sprite).controlSpeed;
                }
                if (controller.right.isPressed()) {
                    sprite.vx += getDataForSprite(sprite).controlSpeed;
                }

                if (sprite.vx !== 0) {
                    getDataForSprite(sprite).facingLeft = sprite.vx < 0;
                }
            }
        }

        protected updateAnimations() {
            for (const sprite of getActualSprites()) {
                const animationState = getDataForSprite(sprite).animation
                if (getDataForSprite(sprite).animation) {
                    if (this.isFacing(sprite, FacingDirection.Left)) {
                        if (this.isOnGround(sprite)) {
                            if (sprite.vx === 0) {
                                // Idle left
                                if (getDataForSprite(sprite).animation[AnimationType.IdleLeft]) {
                                    animation.runImageAnimation(sprite, getDataForSprite(sprite).animation[AnimationType.IdleLeft].frames, getDataForSprite(sprite).animation[AnimationType.IdleLeft].interval, true);
                                }
                            }
                            else {
                                // Walking left
                                animation.runImageAnimation(sprite, getDataForSprite(sprite).animation[AnimationType.WalkingLeft].frames, getDataForSprite(sprite).animation[AnimationType.WalkingLeft].interval, true);

                            }
                        }
                        else {
                            // Jumping left
                            animation.runImageAnimation(sprite, getDataForSprite(sprite).animation[AnimationType.JumpingLeft].frames, getDataForSprite(sprite).animation[AnimationType.JumpingLeft].interval, true);

                        }
                    }
                    else {
                        if (this.isOnGround(sprite)) {
                            if (sprite.vx === 0) {
                                // Idle right
                                animation.runImageAnimation(sprite, getDataForSprite(sprite).animation[AnimationType.IdleRight].frames, getDataForSprite(sprite).animation[AnimationType.IdleRight].interval, true);

                            }
                            else {
                                // Walking right
                                animation.runImageAnimation(sprite, getDataForSprite(sprite).animation[AnimationType.WalkingRight].frames, getDataForSprite(sprite).animation[AnimationType.WalkingRight].interval, true);

                            }
                        }
                        else {
                            // Jumping right
                            animation.runImageAnimation(sprite, getDataForSprite(sprite).animation[AnimationType.JumpingRight].frames, getDataForSprite(sprite).animation[AnimationType.IdleLeft].interval, true);

                        }
                    }
                }
            }
        }
    }

    function getDataForSprite(sprite: Sprite) {
        if (!sprite.data[DATA_KEY]) {
            sprite.data[DATA_KEY] = {
                facingLeft: true
            };
        }
        return sprite.data[DATA_KEY];
    }

    function getActualSprites() {
        const allSprites = game.currentScene().allSprites;
        const actualSprites: Sprite[] = allSprites.filter(s => !!(s as any).data) as Sprite[];
        return actualSprites;
    }

    export function state() {
        if (!_state) _state = new PlatformerState();

        return _state;
    }
}