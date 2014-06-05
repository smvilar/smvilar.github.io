Board = function(width, height) {
    var PAN_SPEED = 1.5;
    var MIN_ZOOM = 0.1;
    var MAX_ZOOM = 1;

    var texture = PIXI.Texture.fromImage('img/seamless_cork_board_background.jpg');
    this.sprite = new PIXI.TilingSprite(texture, width, height);
    this.sprite.interactive = true;
    this.sprite.hitArea = new PIXI.Rectangle(0, 0, width, height);
    this.sprite.pointer = 'move';
    this.sprite.pivot.set(width/2, height/2);

    var board = this;

    this.sprite.mousedown = function(mouseData) {
        board.panning = true;
        board.lastPos = mouseData.global.clone();
    };

    this.sprite.mouseup = function(mouseData) {
        board.panning = false;
    };

    this.sprite.mouseupoutside = function(mouseData) {
        board.panning = false;
    };

    this.sprite.mousemove = function(mouseData) {
        if (!board.panning) return;
        var mousePos = mouseData.global;
        var dx = mousePos.x - board.lastPos.x;
        var dy = mousePos.y - board.lastPos.y;
        board.pan(dx * PAN_SPEED, dy * PAN_SPEED);
        board.lastPos.set(mousePos.x, mousePos.y);
    };

    this.pan = function(dx, dy) {
        board.sprite.parent.x += dx;
        board.sprite.parent.y += dy;
    }

    this.zoom = function(delta) {
        var s = board.sprite.parent.scale;
        s.x = Math.max(MIN_ZOOM, Math.min(delta + s.x, MAX_ZOOM));
        s.y = Math.max(MIN_ZOOM, Math.min(delta + s.y, MAX_ZOOM));
    }
};
