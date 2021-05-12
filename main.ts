function gravity () {
    if (mario.isHittingTile(CollisionDirection.Bottom)) {
        if (velY > 0) {
            velY = 2
        }
    } else {
        velY += 10
    }
    mario.setVelocity(0, velY)
}
// animState vars:
// 0 = idle
// 1 = walk
// 2 = jump
// 
// dir vars:
// 0 = left
// 1 = right
function animate () {
    if (mario.isHittingTile(CollisionDirection.Bottom)) {
        if (controller.dx() != 0) {
            if (animState != 1) {
                animation.runImageAnimation(
                mario,
                walkAnim,
                150,
                true
                )
                animState = 1
            }
        } else {
            if (animState != 0) {
                animation.runImageAnimation(
                mario,
                idleAnim,
                200,
                true
                )
                animState = 0
            }
        }
    } else {
        if (animState != 2) {
            animation.runImageAnimation(
            mario,
            jumpAnim,
            5000,
            true
            )
            animState = 2
        }
    }
    if (dir == 0 && controller.dx() > 0) {
        flip()
        dir = 1
    } else if (dir == 1 && controller.dx() < 0) {
        flip()
        dir = 0
    }
}
function flip () {
    for (let value of idleAnim) {
        value.flipX()
    }
    for (let value2 of jumpAnim) {
        value2.flipX()
    }
    for (let value3 of walkAnim) {
        value3.flipX()
    }
}
function breakBlock () {
    if (mario.tileKindAt(TileDirection.Top, assets.tile`QM`) && mario.vy < 0) {
        tiles.setTileAt(tiles.getTileLocation(mario.x / 16, mario.y / 16 - 1), assets.tile`B1`)
    }
    if (mario.isHittingTile(CollisionDirection.Top) && mario.vy < 0) {
        velY = 10
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mario.isHittingTile(CollisionDirection.Bottom)) {
        velY = -250
        music.playMelody("G C5 - - - - - - ", 1000)
    }
})
function loadAnims () {
    idleAnim = assets.animation`marioIdle`
    jumpAnim = assets.animation`marioJump`
    walkAnim = assets.animation`marioWalk`
}
function walkSpeed () {
    if (controller.B.isPressed()) {
        controller.moveSprite(mario, 120, 0)
    } else {
        controller.moveSprite(mario, 72, 0)
    }
}
let jumpAnim: Image[] = []
let idleAnim: Image[] = []
let walkAnim: Image[] = []
let animState = 0
let velY = 0
let dir = 0
let mario: Sprite = null
scene.setBackgroundColor(9)
tiles.setTilemap(tilemap`level1`)
mario = sprites.create(assets.image`startMario`, SpriteKind.Player)
loadAnims()
scene.cameraFollowSprite(mario)
dir = 1
music.setTempo(200)
game.onUpdate(function () {
    animate()
    gravity()
    walkSpeed()
    breakBlock()
})
forever(function () {
    music.playTone(659, music.beat(BeatFraction.Half))
    music.playTone(659, music.beat(BeatFraction.Half))
    music.rest(music.beat(BeatFraction.Half))
    music.playTone(659, music.beat(BeatFraction.Half))
    music.rest(music.beat(BeatFraction.Half))
    music.playTone(523, music.beat(BeatFraction.Half))
    music.playTone(659, music.beat(BeatFraction.Half))
    music.rest(music.beat(BeatFraction.Half))
    music.playTone(784, music.beat(BeatFraction.Half))
    music.rest(music.beat(BeatFraction.Half))
    music.rest(music.beat(BeatFraction.Whole))
    music.playTone(392, music.beat(BeatFraction.Half))
    music.rest(music.beat(BeatFraction.Half))
    music.rest(music.beat(BeatFraction.Whole))
    for (let index = 0; index < 2; index++) {
        music.playTone(523, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Whole))
        music.playTone(392, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Whole))
        music.playTone(330, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Whole))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(466, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(392, 200)
        music.playTone(659, 200)
        music.playTone(784, 200)
        music.playTone(880, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(698, music.beat(BeatFraction.Half))
        music.playTone(784, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(659, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(587, music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Whole))
    }
    for (let index = 0; index < 4; index++) {
        music.rest(music.beat(BeatFraction.Whole))
        music.playTone(784, music.beat(BeatFraction.Half))
        music.playTone(740, music.beat(BeatFraction.Half))
        music.playTone(698, music.beat(BeatFraction.Half))
        music.playTone(622, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(659, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(415, music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(523, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(523, music.beat(BeatFraction.Half))
        music.playTone(587, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Whole))
        music.playTone(784, music.beat(BeatFraction.Half))
        music.playTone(740, music.beat(BeatFraction.Half))
        music.playTone(698, music.beat(BeatFraction.Half))
        music.playTone(622, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(659, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(784, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(784, music.beat(BeatFraction.Half))
    }
})
