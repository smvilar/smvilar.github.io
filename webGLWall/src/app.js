WallApp = {};

WallApp.init = function() {
    var BOARD_WIDTH = 9000;
    var BOARD_HEIGHT = 6000;
    var CARD_COUNT = 400;

    WallApp.stats = new Stats();
    WallApp.stats.domElement.style.position = 'absolute';
    WallApp.stats.domElement.style.top = '0px';
    WallApp.stats.domElement.style.left = '0px';
    $("body").append(WallApp.stats.domElement);

    WallApp.stage = new PIXI.Stage(0x2557a7);

    WallApp.renderer = PIXI.autoDetectRenderer($(window).width(), $(window).height());
    $("body").append(WallApp.renderer.view);

    $(window).resize(WallApp.resize);

    var container = new PIXI.DisplayObjectContainer();
    WallApp.stage.addChild(container);

    // add board
    var board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
    container.addChild(board.sprite);
    // center the board in the window
    board.pan($(window).width()/2, $(window).height()/2);
    board.zoom(-0.2);

    // add test cards
    for (var i = 0; i < CARD_COUNT; i++) {
        var card = new Card(getRandomString());
        card.sprite.x = -BOARD_WIDTH/2 + Math.random() * BOARD_WIDTH;
        card.sprite.y = -BOARD_HEIGHT/2 + Math.random() * BOARD_HEIGHT;
        container.addChild(card.sprite);
    }

    // register mouse wheel event
    $(document).on('mousewheel', function(event) {
        event.preventDefault();
        var norm = event.deltaY / 1000;
        board.zoom(norm);
    })

    requestAnimFrame(WallApp.gameLoop);
};

function getRandomString() {
    var WORDS = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere eleifend justo, tristique eleifend tellus accumsan eget. Etiam vel enim vitae felis malesuada ullamcorper. Aenean vitae imperdiet eros. Fusce quis eros a urna rutrum dapibus. Nulla vel iaculis nulla, eu adipiscing neque. Curabitur mi orci, venenatis a accumsan non, convallis vel felis. Vestibulum quis nisi nisi. Proin bibendum mi quis scelerisque aliquam. Sed imperdiet, diam non sodales feugiat, leo ipsum malesuada urna, eu commodo magna felis non nibh. Maecenas ut nulla eget purus posuere sodales sed in risus. Vestibulum accumsan erat nunc, at sagittis nunc fringilla vel. Nullam turpis lacus, aliquam id ullamcorper eu, consequat vel purus. Phasellus aliquet elit nec eros volutpat tincidunt. Ut vitae tempus est.'.split(' ');
    var string = '';
    for (var i = 0; i < 50; i++) {
        var idx = Math.floor(Math.random() * WORDS.length);
        var randomWord = WORDS[idx];
        string += randomWord + ' ';
    }
    return string;
}

WallApp.resize = function() {
    WallApp.renderer.resize($(window).width(), $(window).height());
};

WallApp.gameLoop = function() {
    WallApp.stats.begin();
    requestAnimFrame(WallApp.gameLoop);
    WallApp.renderer.render(WallApp.stage);
    WallApp.stats.end();
};

$(document).ready(function() {
    WallApp.init();
});
