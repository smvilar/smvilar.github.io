(function() {
    var app = angular.module('wallyApp', []);

    app.directive('wall', ['$window', function($window) {
        return {
            restrict:'E',
            templateUrl:'/templates/wall.html',
            controller:function() {
                this.addCard = function() {
                    var elem = this.addElement()
                        .addClass("card");
                    var textarea = $("<textarea/>")
                        .attr("placeholder", "Write me...");
                    elem.append(textarea);
                };

                this.addImage = function() {
                    var elem = this.addElement()
                        .addClass("image");
                    // add a random image
                    var img = $("<img/>")
                        .attr("src", "http://lorempixel.com/200/200");
                    elem.append(img);
                };

                this.addElement = function() {
                    var elem = $("<div/>")
                        .addClass("board-element")
                        // for some reason the jquery ui draggable plugin will
                        // set position to relative even if the class has absolute position
                        .css("position", "absolute");
                    elem.draggable({ stack:"#board div" });
                    elem.append(this.createCloseButton(elem));
                    elem.append(this.createRotationHandle(elem));
                    $("#board").append(elem);
                    return elem;
                }

                this.createCloseButton = function(element) {
                    return $("<button/>")
                        .text("X")
                        .addClass("close-button")
                        .click(function() {
                            element.remove();
                        });
                }

                this.createRotationHandle = function(element) {
                    var lastX, lastY;

                    return $("<div/>")
                        .addClass("rotation-handle")
                        .css("position", "absolute")
                        .draggable({
                            helper:function() {
                                return $("<div/>");
                            },
                            start:startRotation,
                            drag:updateRotation
                        });

                    function startRotation(e) {
                        lastX = e.pageX;
                        lastY = e.pageY;
                    }

                    function updateRotation(e) {
                        var angle = getRotation(element);
                        if (e.pageX - lastX > 0) {
                            angle++;
                        } else {
                            angle--;
                        }
                        if (e.pageY - lastY > 0) {
                            angle++;
                        } else {
                            angle--;
                        }
                        lastX = e.pageX;
                        lastY = e.pageY;
                        setRotation(element, angle);
                    }

                    function getRotation(elem) {
                        var matrix = elem.css("-webkit-transform") ||
                        elem.css("-moz-transform")    ||
                        elem.css("-ms-transform")     ||
                        elem.css("-o-transform")      ||
                        elem.css("transform");
                        if (matrix !== 'none') {
                            var values = matrix.split('(')[1].split(')')[0].split(',');
                            var a = values[0];
                            var b = values[1];
                            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
                        } else {
                            var angle = 0;
                        }
                        return (angle < 0) ? angle + 360 : angle;
                    }

                    function setRotation(elem, angle) {
                        var rotation = "rotate(" + angle + "deg)";
                        elem.css("-webkit-transform", rotation);
                        elem.css("-moz-transform", rotation);
                        elem.css("-ms-transform", rotation);
                        elem.css("-0-transform", rotation);
                        elem.css("transform", rotation);
                    }
                }
            },
            controllerAs:'board'
        };
    }]);
})();
