﻿function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 2;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
        index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
        this.frameWidth, this.frameHeight,
        locX, locY,
        this.frameWidth * scaleBy,
        this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}



//function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
//    this.spriteSheet = spriteSheet;
//    this.frameWidth = frameWidth;
//    this.frameDuration = frameDuration;
//    this.frameHeight = frameHeight;
//    this.sheetWidth = sheetWidth;
//    this.frames = frames;
//    this.totalTime = frameDuration * frames;
//    this.elapsedTime = 0;
//    this.loop = loop;
//    this.scale = scale;
//}

//Animation.prototype.drawFrame = function (tick, ctx, x, y) {
//    this.elapsedTime += tick;
//    if (this.isDone()) {
//        if (this.loop) this.elapsedTime = 0;
//    }
//    var frame = this.currentFrame();
//    var xindex = 0;
//    var yindex = 0;
//    xindex = frame % this.sheetWidth;
//    yindex = Math.floor(frame / this.sheetWidth);

//    ctx.drawImage(this.spriteSheet,
//        xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
//        this.frameWidth, this.frameHeight,
//        x, y,
//        this.frameWidth * this.scale,
//        this.frameHeight * this.scale);
//}

//Animation.prototype.currentFrame = function () {
//    return Math.floor(this.elapsedTime / this.frameDuration);
//}

//Animation.prototype.isDone = function () {
//    return (this.elapsedTime >= this.totalTime);
//}