
//% block=Platformer color=#ccab64
namespace platformer {
    export enum GravityDirection {
        //% block="up"
        Up,
        //% block="right"
        Right,
        //% block="down"
        Down,
        //% block="left"
        Left,
    }

    export enum FacingDirection {
        //% block="right"
        Right,
        //% block="left"
        Left,
    }

    export enum AnimationType {
        //% block="walking left"
        WalkingLeft,
        //% block="walking right"
        WalkingRight,
        //% block="jumping left"
        JumpingLeft,
        //% block="jumping right"
        JumpingRight,
        //% block="idle left"
        IdleLeft,
        //% block="idle right"
        IdleRight
    }

    export enum ObstacleType {
        //% block="ground"
        Ground,
        //% block="ceiling"
        Ceiling,
        //% block="left wall"
        LeftWall,
        //% block="right wall"
        RightWall
    }

    //% blockId=platformer_set_gravity
    //% block="set gravity to $gravity"
    //% gravity.defl=500
    //% group="Gravity"
    //% weight=100
    export function setGravity(gravity: number) {
        state().setGravity(gravity);
    }

    //% blockId=platformer_set_gravity_for_sprite
    //% block="set gravity for $sprite to $gravity"
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% gravity.defl=500
    //% group="Gravity"
    //% weight=80
    export function setGravityForSprite(sprite: Sprite, gravity: number) {
        state().setGravityForSprite(sprite, gravity);
    }

    //% blockId=platformer_set_gravity_direction
    //% block="set gravity direction to $direction"
    //% direction.shadow=platformer_gravity_direction_picker
    //% group="Gravity"
    //% weight=60
    export function setGravityDirection(direction: number) {
        state().setGravityDirection(direction);
    }

    //% blockId=platformer_control_sprite
    //% block="control $sprite with speed $speed"
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% speed.defl=70
    //% group="Actions"
    //% weight=100
    export function controlSprite(sprite: Sprite, speed: number) {
        state().controlSprite(sprite, speed);
    }

    //% blockId=platformer_do_jump
    //% block="$sprite jump $height pixels"
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% height.defl=32
    //% group="Actions"
    //% weight=90
    export function doJump(sprite: Sprite, height: number) {
        state().doJump(sprite, height)
    }

    //% blockId=platformer_is_on_ground
    //% block="$sprite is on ground"
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% group="Actions"
    //% weight=80
    export function isOnGround(sprite: Sprite): boolean {
        return state().isOnGround(sprite);
    }

    //% blockId=platformer_is_facing
    //% block="$sprite is facing $direction"
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% direction.shadow=platformer_facing_direction_picker
    //% group="Actions"
    //% weight=60
    export function isFacing(sprite: Sprite, direction: number) {
        return state().isFacing(sprite, direction);
    }


    //% blockId=platformer_set_animation
    //% block="animate $sprite when $animationType frames $frames interval (ms) $interval"
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% frames.shadow=animation_editor
    //% interval.defl=200
    //% animationType.shadow=platformer_animation_type_picker
    //% group="Actions"
    //% weight=50
    export function setAnimation(sprite: Sprite, animationType: number, frames: Image[], interval: number) {
        state().setAnimation(sprite, animationType, frames, interval);
    }


    //% blockId=platformer_on_sprite_hits_obstacle
    //% block="on $sprite of kind $kind hits $obstacle at $location"
    //% kind.shadow=spritekind
    //% obstacle.shadow=platformer_obstacle_type_picker
    //% draggableParameters=reporter
    //% group="Events"
    //% weight=100
    export function onSpriteHitsObstacle(kind: number, obstacle: number, handler: (sprite: Sprite, location: tiles.Location) => void) {
        state().onSpriteHitsObstacle(kind, obstacle, handler);
    }

    //% blockId=platformer_on_sprite_approaches_ledge
    //% block="on $sprite of kind $kind approaches ledge at $location"
    //% kind.shadow=spritekind
    //% draggableParameters=reporter
    //% group="Events"
    //% weight=80
    export function onSpriteApproachesLedge(kind: number, handler: (sprite: Sprite, location: tiles.Location) => void) {
        state().onSpriteApproachesLedge(kind, handler);
    }

    //% blockId=platformer_on_sprite_lands_on_top_of
    //% block="on $sprite of kind $kind1 lands on top of $otherSprite of kind $kind2"
    //% kind1.shadow=spritekind
    //% kind2.shadow=spritekind
    //% draggableParameters=reporter
    //% group="Events"
    //% weight=60
    export function onSpriteLandsOnTopOf(kind1: number, kind2: number, handler: (sprite: Sprite, otherSprite: Sprite) => void) {
        state().onSpriteLandsOnTopOf(kind1, kind2, handler);
    }

    //% blockId=platformer_gravity_direction_picker
    //% shim=TD_ID
    //% block="$direction"
    //% blockHidden=true
    //% direction.defl="platformer.GravityDirection.Down"
    //% duplicateShadowOnDrag
    export function _gravityDirection(direction: GravityDirection): number {
        return direction;
    }

    //% blockId=platformer_facing_direction_picker
    //% shim=TD_ID
    //% block="$direction"
    //% blockHidden=true
    //% duplicateShadowOnDrag
    export function _facingDirection(direction: FacingDirection): number {
        return direction;
    }

    //% blockId=platformer_animation_type_picker
    //% shim=TD_ID
    //% block="$animationType"
    //% blockHidden=true
    //% duplicateShadowOnDrag
    export function _animationType(animationType: AnimationType): number {
        return animationType;
    }

    //% blockId=platformer_obstacle_type_picker
    //% shim=TD_ID
    //% block="$obstacleType"
    //% blockHidden=true
    //% duplicateShadowOnDrag
    export function _obstacleType(obstacleType: ObstacleType): number {
        return obstacleType;
    }
}