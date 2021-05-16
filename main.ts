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
    for (let value34 of upgradeAnim1) {
        value34.flipX()
    }
}
function breakBlock () {
    if (MarioState == 0) {
        if ((mario.tileKindAt(TileDirection.Top, assets.tile`QM1`) || mario.tileKindAt(TileDirection.Top, assets.tile`QM2`)) && mario.vy < 0) {
            if (mario.tileKindAt(TileDirection.Top, assets.tile`QM2`)) {
                mushroom = sprites.create(assets.image`SuperShroom`, SpriteKind.Food)
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
    }
}
function initSongs () {
    noteNumOWM = 0
    overworldMain = [
    659,
    659,
    0,
    659,
    0,
    523,
    659,
    0,
    784,
    0,
    0,
    0,
    392,
    0,
    0,
    0,
    523,
    0,
    0,
    392,
    0,
    0,
    330,
    0,
    0,
    440,
    0,
    494,
    0,
    466,
    440,
    0,
    2,
    3,
    4,
    880,
    0,
    698,
    784,
    0,
    659,
    0,
    523,
    587,
    494,
    0,
    0,
    523,
    0,
    0,
    392,
    0,
    0,
    330,
    0,
    0,
    440,
    0,
    494,
    0,
    466,
    440,
    0,
    2,
    3,
    4,
    880,
    0,
    698,
    784,
    0,
    659,
    0,
    523,
    587,
    494,
    0,
    0,
    0,
    0,
    784,
    740,
    698,
    622,
    0,
    659,
    0,
    415,
    440,
    523,
    0,
    440,
    523,
    587,
    0,
    0,
    784,
    740,
    698,
    622,
    0,
    659,
    0,
    1046.50,
    0,
    1046.50,
    1046.50,
    0,
    0,
    0,
    0,
    0,
    784,
    740,
    698,
    622,
    0,
    659,
    0,
    415,
    440,
    523,
    0,
    440,
    523,
    587,
    0,
    0,
    622,
    0,
    0,
    587,
    0,
    0,
    523,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    784,
    740,
    698,
    622,
    0,
    659,
    0,
    415,
    440,
    523,
    0,
    440,
    523,
    587,
    0,
    0,
    784,
    740,
    698,
    622,
    0,
    659,
    0,
    1046.50,
    0,
    1046.50,
    1046.50,
    0,
    0,
    0,
    0,
    0,
    784,
    740,
    698,
    622,
    0,
    659,
    0,
    415,
    440,
    523,
    0,
    440,
    523,
    587,
    0,
    0,
    622,
    0,
    0,
    587,
    0,
    0,
    523,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
    noteNumOWB = 0
    overworldBase = [
    147,
    147,
    0,
    147,
    0,
    147,
    147,
    0,
    196,
    0,
    0,
    0,
    98,
    0,
    0,
    0,
    196,
    0,
    0,
    165,
    0,
    0,
    131,
    0,
    0,
    175,
    0,
    196,
    0,
    185,
    175,
    0,
    2,
    3,
    4,
    349,
    0,
    294,
    330,
    0,
    262,
    0,
    220,
    247,
    196,
    0,
    0,
    196,
    0,
    0,
    165,
    0,
    0,
    131,
    0,
    0,
    175,
    0,
    196,
    0,
    185,
    175,
    0,
    2,
    3,
    4,
    349,
    0,
    294,
    330,
    0,
    262,
    0,
    220,
    247,
    196,
    0,
    0,
    131,
    0,
    0,
    196,
    0,
    0,
    262,
    0,
    175,
    0,
    0,
    262,
    0,
    0,
    175,
    0,
    131,
    0,
    0,
    196,
    0,
    0,
    196,
    262,
    0,
    0,
    0,
    0,
    0,
    0,
    196,
    0,
    131,
    0,
    0,
    196,
    0,
    0,
    262,
    0,
    175,
    0,
    0,
    262,
    0,
    0,
    175,
    0,
    131,
    0,
    208,
    0,
    0,
    233,
    0,
    0,
    262,
    0,
    0,
    196,
    196,
    0,
    131,
    0,
    131,
    0,
    0,
    196,
    0,
    0,
    262,
    0,
    175,
    0,
    0,
    262,
    0,
    0,
    175,
    0,
    131,
    0,
    0,
    196,
    0,
    0,
    196,
    262,
    0,
    0,
    0,
    0,
    0,
    0,
    196,
    0,
    131,
    0,
    0,
    196,
    0,
    0,
    262,
    0,
    175,
    0,
    0,
    262,
    0,
    0,
    175,
    0,
    131,
    0,
    208,
    0,
    0,
    233,
    0,
    0,
    262,
    0,
    0,
    196,
    196,
    0,
    131,
    0
    ]
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
    upgradeAnim1 = assets.animation`upgradeAnim1`
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
    upgrading = 1
    otherSprite.destroy()
    if (otherSprite == activeShroom) {
        mario.y += -16
        MarioState = 1
        animState = -1
    } else {
    	
    }
    PowerUpSound()
    upgrading = 0
})
function shroomGravity (shroom: Sprite) {
    shroom.setVelocity(80, 0)
    shroom.ay = 1000
    shroom.setBounceOnWall(false)
    activeShroom = shroom
}
let noteNum2 = 0
let noteNum = 0
let upgrading = 0
let fireFlowerAnim: Image[] = []
let overworldBase: number[] = []
let noteNumOWB = 0
let overworldMain: number[] = []
let noteNumOWM = 0
let activeShroom: Sprite = null
let flower: Sprite = null
let mushroom: Sprite = null
let upgradeAnim1: Image[] = []
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
initSongs()
scene.cameraFollowSprite(mario)
dir = 1
let Music = 1
MarioState = 0
let isBig = 0
music.setTempo(210)
game.onUpdate(function () {
    if (!(upgrading)) {
        animate()
        gravity()
        walkSpeed()
        breakBlock()
        shroomBounceLoop()
    } else {
        mario.setVelocity(0, 0)
        controller.moveSprite(mario, 0, 0)
        if (!(isBig)) {
            animation.runImageAnimation(
            mario,
            assets.animation`upgradeAnim1`,
            200,
            true
            )
            isBig = 1
        }
    }
})
forever(function () {
    if (!(upgrading)) {
        noteNum = overworldMain[noteNumOWM]
        if (noteNum > 4 || noteNum == 0) {
            music.playTone(noteNum, music.beat(BeatFraction.Half))
        } else if (noteNum > 1) {
            if (noteNum == 2) {
                music.playTone(392, 185)
            } else if (noteNum == 3) {
                music.playTone(659, 185)
            } else {
                music.playTone(784, 185)
            }
        }
        noteNumOWM += 1
        if (noteNumOWM > overworldMain.length) {
            noteNumOWM = 0
        }
    }
})
forever(function () {
    if (!(upgrading)) {
        noteNum2 = overworldBase[noteNumOWB]
        if (noteNum2 > 4 || noteNum2 == 0) {
            music.playTone(noteNum2, music.beat(BeatFraction.Half))
        } else if (noteNum2 > 1) {
            if (noteNum2 == 2) {
                music.playTone(165, 185)
            } else if (noteNum2 == 3) {
                music.playTone(262, 185)
            } else {
                music.playTone(330, 185)
            }
        }
        noteNumOWB += 1
        if (noteNumOWB > overworldBase.length) {
            noteNumOWB = 0
        }
    }
})
