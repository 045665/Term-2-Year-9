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
                if (MarioState == 0) {
                    animation.runImageAnimation(
                    mario,
                    walkAnim,
                    150,
                    true
                    )
                } else {
                    animation.runImageAnimation(
                    mario,
                    chungusWalkAnim,
                    150,
                    true
                    )
                }
                animState = 1
            }
        } else {
            if (animState != 0) {
                if (MarioState == 0) {
                    animation.runImageAnimation(
                    mario,
                    idleAnim,
                    200,
                    true
                    )
                } else {
                    animation.runImageAnimation(
                    mario,
                    chungusIdleAnim,
                    150,
                    true
                    )
                }
                animState = 0
            }
        }
    } else {
        if (animState != 2) {
            if (MarioState == 0) {
                animation.runImageAnimation(
                mario,
                jumpAnim,
                5000,
                true
                )
            } else {
                animation.runImageAnimation(
                mario,
                chungusJumpAnim,
                150,
                true
                )
            }
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
    for (let value4 of idleAnim) {
        value4.flipX()
    }
    for (let value2 of jumpAnim) {
        value2.flipX()
    }
    for (let value3 of walkAnim) {
        value3.flipX()
    }
    for (let value32 of chungusIdleAnim) {
        value32.flipX()
    }
    for (let value33 of chungusJumpAnim) {
        value33.flipX()
    }
    for (let value34 of chungusWalkAnim) {
        value34.flipX()
    }
}
function breakBlock () {
    if (MarioState == 0) {
        if ((mario.tileKindAt(TileDirection.Top, assets.tile`QM1`) || mario.tileKindAt(TileDirection.Top, assets.tile`QM2`)) && mario.vy < 0) {
            if (mario.tileKindAt(TileDirection.Top, assets.tile`QM2`)) {
                mushroom = sprites.create(assets.image`SuperShroom`, SpriteKind.Projectile)
                tiles.placeOnTile(mushroom, tiles.getTileLocation(mario.x / 16, mario.y / 16 - 2))
                shroomGravity(mushroom)
            } else {
                info.changeScoreBy(1)
            }
            tiles.setTileAt(tiles.getTileLocation(mario.x / 16, mario.y / 16 - 1), assets.tile`B1`)
        }
    } else {
        if ((tiles.tileAtLocationEquals(tiles.getTileLocation(mario.x / 16, mario.y / 16 - 2), assets.tile`QM1`) || tiles.tileAtLocationEquals(tiles.getTileLocation(mario.x / 16, mario.y / 16 - 2), assets.tile`QM2`)) && mario.vy < -50) {
            if (tiles.tileAtLocationEquals(tiles.getTileLocation(mario.x / 16, mario.y / 16 - 2), assets.tile`QM2`)) {
                flower = sprites.create(assets.image`f1`, SpriteKind.Food)
                tiles.placeOnTile(flower, tiles.getTileLocation(mario.x / 16, mario.y / 16 - 3))
                animation.runImageAnimation(
                flower,
                assets.animation`fireFlowerAnim`,
                150,
                true
                )
            } else {
                info.changeScoreBy(1)
            }
            tiles.setTileAt(tiles.getTileLocation(mario.x / 16, mario.y / 16 - 2), assets.tile`B1`)
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(mario.x / 16, mario.y / 16 - 2), assets.tile`BR1`) && mario.vy < -50) {
            tiles.setTileAt(tiles.getTileLocation(mario.x / 16, mario.y / 16 - 2), assets.tile`transparency16`)
            tiles.setWallAt(tiles.getTileLocation(mario.x / 16, mario.y / 16 - 2), false)
            velY = 10
        }
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
function shroomBounceLoop () {
    if (activeShroom) {
        if (activeShroom.isHittingTile(CollisionDirection.Left)) {
            activeShroom.setVelocity(80, 0)
        } else if (activeShroom.isHittingTile(CollisionDirection.Right)) {
            activeShroom.setVelocity(-80, 0)
        }
        if (mario.overlapsWith(activeShroom)) {
            activeShroom.destroy()
            MarioState = 1
            animState = -1
            PowerUpSound()
            mario.y += -16
        }
    }
}
function PowerUpSound () {
    music.playTone(392, 100)
    music.playTone(494, 100)
    music.playTone(587, 100)
    music.playTone(784, 100)
    music.playTone(988, 100)
    music.playTone(415, 100)
    music.playTone(523, 100)
    music.playTone(622, 100)
    music.playTone(831, 100)
    music.playTone(1046.50, 100)
    music.playTone(466, 100)
    music.playTone(587, 100)
    music.playTone(698, 100)
    music.playTone(932, 100)
    music.playTone(1174.70, 100)
}
function loadAnims () {
    idleAnim = assets.animation`marioIdle`
    jumpAnim = assets.animation`marioJump`
    walkAnim = assets.animation`marioWalk`
    chungusIdleAnim = assets.animation`ChungusIdleAnim`
    chungusWalkAnim = assets.animation`chungusMarioWalkAnim`
    chungusJumpAnim = assets.animation`chungusJumpAnim`
    fireFlowerAnim = assets.animation`fireFlowerAnim`
}
function walkSpeed () {
    if (controller.B.isPressed()) {
        controller.moveSprite(mario, 120, 0)
    } else {
        controller.moveSprite(mario, 72, 0)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mario.tileKindAt(TileDirection.Bottom, assets.tile`VPTL1`) || mario.tileKindAt(TileDirection.Bottom, assets.tile`VPTR1`)) {
        game.reset()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    PowerUpSound()
})
function shroomGravity (shroom: Sprite) {
    shroom.setVelocity(80, 0)
    shroom.ay = 1000
    shroom.lifespan = 5000
    shroom.setBounceOnWall(false)
    activeShroom = shroom
}
let fireFlowerAnim: Image[] = []
let activeShroom: Sprite = null
let flower: Sprite = null
let mushroom: Sprite = null
let chungusJumpAnim: Image[] = []
let jumpAnim: Image[] = []
let chungusIdleAnim: Image[] = []
let idleAnim: Image[] = []
let chungusWalkAnim: Image[] = []
let walkAnim: Image[] = []
let animState = 0
let velY = 0
let MarioState = 0
let dir = 0
let mario: Sprite = null
scene.setBackgroundColor(9)
tiles.setTilemap(tilemap`level1`)
mario = sprites.create(assets.image`startMario`, SpriteKind.Player)
tiles.placeOnTile(mario, tiles.getTileLocation(5, 13))
loadAnims()
scene.cameraFollowSprite(mario)
dir = 1
let Music = 1
MarioState = 0
music.setTempo(200)
game.onUpdate(function () {
    animate()
    gravity()
    walkSpeed()
    breakBlock()
    shroomBounceLoop()
})
forever(function () {
    if (true) {
        music.playTone(147, music.beat(BeatFraction.Half))
        music.playTone(147, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(147, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(147, music.beat(BeatFraction.Half))
        music.playTone(147, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(196, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Whole))
        music.playTone(98, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Whole))
        music.rest(music.beat(BeatFraction.Half))
        for (let index = 0; index < 2; index++) {
            music.playTone(196, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(165, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(131, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(175, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(196, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(185, music.beat(BeatFraction.Half))
            music.playTone(175, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(165, 200)
            music.playTone(262, 200)
            music.playTone(330, 200)
            music.playTone(349, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(294, music.beat(BeatFraction.Half))
            music.playTone(330, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(262, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(220, music.beat(BeatFraction.Half))
            music.playTone(247, music.beat(BeatFraction.Half))
            music.playTone(196, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
        }
        for (let index = 0; index < 2; index++) {
            music.playTone(131, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(196, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(262, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(175, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(262, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(175, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(131, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(196, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(196, music.beat(BeatFraction.Half))
            music.playTone(262, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Double))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(196, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(131, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(196, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(262, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(175, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(262, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(175, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(131, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(208, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(233, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(262, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(196, music.beat(BeatFraction.Half))
            music.playTone(196, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(131, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
        }
    } else {
    	
    }
})
// musicPlay values
// 
// 0 = don't change
// 
// 1 = change to overworld
// 
// 2 = change to underworld
// 
// 3 = stop music
forever(function () {
    if (true) {
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
        for (let index = 0; index < 2; index++) {
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
            music.playTone(1046.50, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(1046.50, music.beat(BeatFraction.Half))
            music.playTone(1046.50, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Half))
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
            music.playTone(622, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(587, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(523, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Double))
        }
    } else {
    	
    }
})
