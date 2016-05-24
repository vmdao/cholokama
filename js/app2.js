(function ($) {
    var globals, url = "http://api.uplevo.com:8080";
    var localStorages = {
            "first": 1,
            "code": "u34Nj60EHOS",
            "name": "Chrismast",
            "active": 1,
            "versionIndex": 1,
            "width": 600,
            "height": 600,
            "elements": [
                {
                    "code": "-JTDmx5Qdl1",
                    "type": "UplevoImage",
                    "typeElement": "image",
                    "userEdited": true,
                    "elementIndex": 0,
                    "transparency": 1,
                    "rotation": 0.0,
                    "width": 854,
                    "height": 566.487,
                    "top": -64.0,
                    "left": 0.0,
                    "mediaId": null,
                    "pathFile": "photo2.png",
                    "imageBox": {"left": 0.0, "top": 0.0, "width": 0.0, "height": 0.0},
                    "imageFillter": {"name": null},
                    "background": false

                },
                {
                    "code": "-JTDmx5Qdl2",
                    "type": "UplevoImage",
                    "typeElement": "image",
                    "userEdited": true,
                    "elementIndex": 1,
                    "transparency": 0.8,
                    "rotation": 43.0,
                    "width": 851.0,
                    "height": 315.0,
                    "top": 107.0,
                    "left": 177.0,
                    "mediaId": null,
                    "pathFile": "photo2.png",
                    "imageBox": {"left": 0.0, "top": 0.0, "width": 0.0, "height": 0.0},
                    "imageFillter": {"name": null},
                    "background": false
                },

                {
                    "code": "-JTDmx5Qdl5",
                    "type": "UplevoImage",
                    "typeElement": "svg",
                    "userEdited": true,
                    "elementIndex": 4,
                    "transparency": 1,
                    "rotation": 43.0,
                    "width": 111,
                    "height": 111,
                    "top": 85.0,
                    "left": 344.0,
                    "mediaId": null,
                    "pathFile": "photo2.png",
                    "imageBox": {"left": 0.0, "top": 0.0, "width": 0.0, "height": 0.0},
                    "imageFillter": {"name": null},
                    "background": false,
                    "contents": []
                },
                {
                    "type": "UplevoImage",
                    "typeElement": "text",
                    "userEdited": true,
                    "elementIndex": 5,
                    "transparency": 1,
                    "rotation": 0.0,
                    "width": 270,
                    "height": 42.0,
                    "top": 259,
                    "left": 295,
                    "html": "Hello Uplevo",
                    "style": {"fontSize": 40,
                        "lineHeight": 1.4,
                        "fontFamily": "Roboto",
                        "textAlign": "left",
                        "color": "#000000"
                    }
                },
                {
                    "code": "-JTDmx5Qdl6",
                    "typeElement": "svg",
                    "elementIndex": 7,
                    "left": 513,
                    "top": 65,
                    "width": 154,
                    "height": 154,
                    "rotation": 0,
                    "transparency": 0.2,
                    "userEdited": true,
                    "type": "svg",
                    "mediaId": "MABhJB48cmo",
                    "mediaVersion": 3,
                    "scale": 1.25,
                    "contents": [{
                        "index": 0,
                        "html": "ON POINT",
                        "style": {
                            "bold": false,
                            "fontFamily": "Raleway Heavy",
                            "fontSize": 55.5192,
                            "italic": false,
                            "justification": "center",
                            "color": "#ffffff",
                            "lineLengths": [8]
                        },
                        "preferredFontSize": 55.5192,
                        "width": 573,
                        "height": 130,
                        "typeElement": "text"
                    }]
                }
            ],
            "createAt": 1463022718000, "updateAt": null,
            "language": [{"id": 1, "code": "vi", "name": "Vietnamese", "createAt": 1463022375000}],
            "tag": [{
                "id": 1,
                "code": "spring",
                "name": "Spring",
                "createAt": 1463022382000,
                "description": "Mua xuan, ve dat dang moi mo"
            }],
            "layout": {
                "code": "facebookcover",
                "width": 851,
                "height": 315
            }
        },
        mediaMap = {
            "-JTDmx5Qdl1": {
                "preview": {
                    "url": "http://api.uplevo.com:1338/uplevo_data/public/images/screens/media1.jpg",
                    "width": "854",
                    "height": "566"
                },
                "screen": {
                    "url": "http://api.uplevo.com:1338/uplevo_data/public/images/screens/media1.jpg",
                    "width": "854",
                    "height": "566"
                }
            },
            "-JTDmx5Qdl2": {
                "preview": {
                    "url": "http://api.uplevo.com:1338/uplevo_data/public/images/screens/media2.png",
                    "width": "200",
                    "height": "50"
                },
                "screen": {
                    "url": "http://api.uplevo.com:1338/uplevo_data/public/images/screens/media2.jpg",
                    "width": "92",
                    "height": "61"
                }
            },
            "-JTDmx5Qdl3": {
                "preview": {
                    "url": "http://api.uplevo.com:1338/uplevo_data/public/images/screens/media4.jpg",
                    "width": "2000",
                    "height": "1000"
                },
                "screen": {
                    "url": "http://api.uplevo.com:1338/uplevo_data/public/images/screens/media3.png",
                    "width": "300",
                    "height": "199"
                }
            },
            "-JTDmx5Qdl4": {
                "preview": {
                    "url": "http://api.uplevo.com:1338/uplevo_data/public/images/screens/media3.jpg",
                    "width": "1000",
                    "height": "500"
                },
                "screen": {
                    "url": "http://api.uplevo.com:1338/uplevo_data/public/images/screens/media4.jpg",
                    "width": "300",
                    "height": "199"
                }
            },

            "-JTDmx5Qdl5": {
                "preview": {
                    "url": "https://media-public.canva.com/MABk-3-h6nE/1/screen.svg",
                    "width": "1000",
                    "height": "500"
                },
                "screen": {
                    "url": "https://media-public.canva.com/MABk-3-h6nE/1/screen.svg",
                    "width": "111",
                    "height": "111"
                }
            },
            "-JTDmx5Qdl6": {
                "preview": {
                    "url": "https://media-public.canva.com/MABk-3-h6nE/1/screen.svg",
                    "width": "1000",
                    "height": "500"
                },
                "screen": {
                    "url": "https://media-public.canva.com/MABhJB48cmo/3/screen.svg",
                    "width": "154",
                    "height": "154"
                }
            }
        }

// workspace
    function Workspace(data) {
        this.width = this.height;
        this.layout = data.layout.code;
        this.elements = [];
        this.version = data.versionIndex;
        this.name = data.name;
        this.init(data);
    }

    _.extend(Workspace.prototype, Backbone.Events);

    globals = Workspace.prototype;

    globals.trigger = Backbone.Events.trigger;

    globals.init = function (data) {
        this.callElement(data.elements);
        this.width = data.width;
        this.height = data.height;
        this.first = data.first;
        this.cachedMedia = [];
    }

    globals.callElement = function (elements) {
        elements.forEach(this.createStormElements, this);
    }

    globals.createStormElements = function (element) {
        this.addElement(switchElement(element))
    }

    globals.addElement = function (element, parentSvg) {

        var domElement = element.getDom();
        this.elements.push(element);
        this.trigger("element:add", element);
        console.log("push");
    }

    globals.getElements = function () {
        return this.elements;
    }

// view workspace
    function WorkspaceView() {
        this.width = this.height = 0;
        this.background = !1;
    }

    WorkspaceView = Backbone.View.extend({tagName: "div", className: "workspace", id: "workspace"});

    globals = WorkspaceView.prototype;

    globals.initialize = function (data) {
        this.model = data.model;
        this.width = data.width;
        this.height = data.height;
        this.name = data.name;
        this.listenTo(this.model, {"element:add": this.renderElement});
        this.first = data.model.first;
        this.render();
        if (this.first == 1) this.renderNewIdeas()
    }

    globals.render = function () {
        this.$el.html("<div id='elements'></div>");
        this.$el.appendTo($("#areaWorkspace"));
        return this;
    }

    globals.renderNewIdeas = function () {
        this.model.elements.forEach(this.renderElement, this);
    }

    globals.createWorkspace = function () {
        //this.$(".mask").append();
    }

    globals.getModel = function () {
        return this.model;
    }

    globals.renderElement = function (element) {
        var domElement = element.getDom();

        domElement.appendTo(this.$el.children("#elements"));
        if (domElement.hasClass("text")) {
            domElement.data("dataElement").setHeight(domElement.children(".inner").height());
            domElement.css("height", domElement.children(".inner").height() + "px");
        }

    }

    function AngleWorkspace(data) {
        this.workspace = data.workspace;
    }

    globals = AngleWorkspace.prototype;

    function AngleWorkspaceView() {
    }

    AngleWorkspaceView = Backbone.View.extend({
        tagName: "div",
        id: "angleWorkspace",
        class: "angleWorkspace",

    });

    globals = AngleWorkspaceView.prototype;

    globals.initialize = function (data) {
        this.parentView = data.workspaceView;
        this.html = $('<div class="ghost"></div><div class="vertical align"></div><div class="vertical align"></div><div class="vertical align"></div><div class="horizontal align"></div><div class="horizontal align"></div><div class="horizontal align"></div>');
        this.model = data.model;
        this.$el.html(this.html);
        this.render();
        this.$el.prependTo($("#areaWorkspace"));
    }

    globals.render = function (data) {
        return this;
    }

    function switchElement(element) {
        switch (element.typeElement) {
            case "image" :
                return new ImageElement(element);
                break;
            case "text" :
                return new TextElement(element);
                break;
            case "svg" :
                return new SvgElement(element);
                break;
        }
        return null;
    }

    function EventElement(rootElement) {
        this.el = $(rootElement);
        this.selector = {};
        this.events = "";
    }

    EventElement.prototype.selected = function (data) {
        var seft = this, currenEvent = null;
        return function (event) {
            var typeEvent = event.type;
            seft.events = event.type;
            null === currenEvent && (currenEvent = typeEvent);
            return typeEvent !== currenEvent ? !0 : data.call(this, event);
        }
    }

    EventElement.prototype.on = function (events, selector, callback) {
        var seft = this, seftSelector;
        "function" === typeof callback ? (seftSelector = selector, selector = callback ) : seftSelector = "";
        if (0 <= events.indexOf("|")) {
            var selectedElement = this.selected(selector);
            selector.selected = selectedElement;
            setEventSelected(this, events, seftSelector, selectedElement);
            getArrayEvent(events).forEach(function (event) {
                if (seftSelector)
                    seft.el.on(event, seftSelector, selectedElement);
                else
                    seft.el.on(event, selectedElement)
            })
        } else if (setEventSelected(this, events, seftSelector, selector), seftSelector) {
            this.el.on(events, seftSelector, selector);
        } else
            this.el.on(events, selector);
        return this;
    }

    EventElement.prototype.off = function (events, selector, callback) {
        var seft = this, seftSelector;
        "function" === typeof callback ? (seftSelector = selector, selector = callback ) : seftSelector = "";
        var selectedElement = this.selector[events + "_" + seftSelector];
        if (selectedElement) {
            if (selectedElement !== (selector.selected || selector)) {
                throw Error("errors");
            }
            selector.selected = null;
            solutionString(events).forEach(function (event) {
                seftSelector ? seft.el.off(event, seftSelector, selectedElement) : seft.el.off(event.selectElement);
            });
            delete this.selected[events + "_" + selector];
        }
        return this
    }

    function initEvent() {
        $("#angleWorkspace").on("keydown", ".element.text.focused", inputElementKeyDown).on("input", ".element.text.focused", inputContentElement).on("change", ".element.text.focused", setHeightBox);
        $("#left").on("DOMNodeInserted", ".element.text.focused", FC);
        $("#left").on("mousedown", checkElementSelected);
        (new EventElement("#workspace").on("mousedown", ".element", beforKeyUp).on("touchstart", ".element", beforKeyUp));
        (new EventElement("#left").on("click", ".element.focused", focusedMouseDown).on("mousedown", ".element.focused", focusedMouseDown).on("touchstart", ".element.focused", focusedMouseDown).on("mousedown", ".element:not(.focused)", elementMouseDown).on("touchstart", ".element:not(.focused)", elementMouseDown));
        //(new EventElement("#left"));
        (new EventElement("#left").on("mousedown", ".selectedBound", ghostElementMouseDown).on("touchstart", ".selectedBound", ghostElementMouseDown));
        (new EventElement("#left").on("mousedown", ".selectedBound .cube", cubeMouseDown).on("touchstart", ".selectedBound .cube", cubeMouseDown));
        (new EventElement("#left").on("mousedown", ".selectedBound .rotate", rotateMouseDown).on("touchstart", ".selectedBound .rotate ", rotateMouseDown))
    }

    function checkElementSelected(event) {
        workspaceModel.getElements().forEach(removeElementSelected);

    }

    function removeElementSelected(element) {
        if (element.getDom().hasClass("selected")) {
            element.setSelected(!1);
            element.getDom().removeClass("selected");
            var menuElement = element.getDom().data("menuElement");
            if (element.getDom().hasClass("text")) {
                element.getDom().removeClass("focused");
                element.getDom().insertAfter($('.element:eq(3)'));
                element.getDom().children(".inner").attr("contenteditable", false);
            }
            element.remove();
            menuElement ? menuElement.remove() : 1;
        }
    }

    function beforKeyUp(event) {
        return !0;
    }

    function elementMouseDown(event) {

        function setEventMouseMove(event) {
            var deltaX = 0, deltaY = 0;

            mouseX = void 0 !== event.clientX ? event.clientX : event.originalEvent.touches[0].clientX;
            mouseY = void 0 !== event.clientY ? event.clientY : event.originalEvent.touches[0].clientY;

            deltaX = mouseX - mouseStartX;
            deltaY = mouseY - mouseStartY;

            currentLeft = startX + deltaX;
            currentTop = startY + deltaY;

            if (dataElement.getSelected() && ghostElement) {
                ghostElement.css("transform", getStringTranform(currentLeft, currentTop, rotateStart));
            }

            elementSelect.css("transform", getStringTranform(currentLeft, currentTop, rotateStart));

            return !1;
        }

        function setEventMouseUp(event) {

            eventDocument.off("mousemove|touchmove", setEventMouseMove).off("mouseup|touchend", setEventMouseUp);

            if (mouseX === currentLeft && mouseY === currentTop) {

                createSelectedElement(elementSelect);
                dataElement.setSelected(!0);
            } else {
                dataElement.setPosition(currentLeft, currentTop);
            }

        }

        if (3 == event.which || event.ctrlKey)
            return !0;
        var eventTarget = $(event.target),
            isParentGroup = eventTarget.parents(".group"),
            isElement = eventTarget.is(".element"),
            isGroup = eventTarget.is(".group"),
            isText = eventTarget.is(".text"),
            elementSelect = isText ? eventTarget.closest(".element") : $(this),
            ghostElement = $(event.currentTarget).hasClass("selectedBound") ? $(event.currentTarget) : !1;

        var dataElement = elementSelect.data("dataElement"),
            bounding = elementSelect.get(0).getBoundingClientRect(),
            startX = dataElement.getLeft(),
            startY = dataElement.getTop(),
            mouseStartX = void 0 !== event.clientX ? event.clientX : event.originalEvent.touches[0].clientX,
            mouseStartY = void 0 !== event.clientY ? event.clientY : event.originalEvent.touches[0].clientY,
            mouseX = 0, mouseY = 0,
            currentTop = 0, currentLeft = 0,
            rotateStart = dataElement.getRotate();
        elementSelect.data("startX", startX);
        elementSelect.data("startY", startY);

        dataElement.getSelected() || checkElementSelected();

        var eventDocument = new EventElement($(document));
        eventDocument.on("mousemove|touchmove", setEventMouseMove).on("mouseup|touchend", setEventMouseUp);
        return !1;
    }

    function ghostElementMouseDown(event) {
        var element = $(this).data("element");
        var dataElement = element.data("dataElement");
        if (dataElement) {
            $(this).css("visibility", "hidden");
            var innerElement = document.elementFromPoint(void 0 !== event.clientX ? event.clientX : event.originalEvent.touches[0].clientX, void 0 !== event.clientY ? event.clientY : event.originalEvent.touches[0].clientY),
                boundElement = $(innerElement).closest(".element").get(0);
            boundElement ? (event.target = innerElement, element = boundElement) : (element = element.get(0), event.target = element);
            $(this).css("visibility", "");
        } else {
            return false;
        }
        elementMouseDown.call(element, event);
    }

    function cubeMouseDown(event) {
        // lang -60.5352deg
        function getTypeCube(cube) {
            return cube.hasClass("tl") ? 1 : cube.hasClass("t") ? 2 : cube.hasClass("tr") ? 3 : cube.hasClass("r") ? 4 : cube.hasClass("br") ? 5 : cube.hasClass("b") ? 6 : cube.hasClass("bl") ? 7 : cube.hasClass("l") ? 8 : 0;
        }

        function setEventMouseMove(event) {
            var styleChangeNew;

            mouseX = void 0 !== event.clientX ? event.clientX : event.originalEvent.touches[0].clientX;
            mouseY = void 0 !== event.clientY ? event.clientY : event.originalEvent.touches[0].clientY;

            if (dataElement.getSelected() && ghostElement) {
                if (elementSelect.hasClass("text")) {
                    elementSelect.trigger("change");
                }
            }
            isText ? (styleChangeNew = styleChange(mouseX, mouseY, elementSelect)) : (styleChangeNew = styleChange(mouseX, mouseY));
            if (dataElement.getSelected() && ghostElement) {
                ghostElement.css(getStyleElementObject(styleChangeNew.newX, styleChangeNew.newY, styleChangeNew.newWidth, styleChangeNew.newHeight, rotate));
                elementSelect.css(getStyleElementObject(styleChangeNew.newX, styleChangeNew.newY, styleChangeNew.newWidth, styleChangeNew.newHeight, rotate));
                if (elementSelect.hasClass("text")) {
                    elementSelect.children(".inner").css("width", styleChangeNew.newWidth);
                }
            }

            dataElement.setStyle(styleChangeNew.newX, styleChangeNew.newY, styleChangeNew.newWidth, styleChangeNew.newHeight, rotate);
            return !1;
        }

        function setEventMouseUp(event) {
            var styleChangeNew, newSize;
            eventDocument.off("mousemove|touchmove", setEventMouseMove).off("mouseup|touchend", setEventMouseUp);
            if (isText) {
                newSize = _setLimitWidthBox(elementSelect);
                dataElement.setWidth(newSize.width);
                dataElement.setHeight(newSize.height);
            }

        }

        function _setLimitWidthBox(elementSelect) {
            var inner = $(elementSelect).children(".inner");
            var minWidth = inner.width();
            inner.css("display", "inline");
            if (minWidth < inner.width()) {
                elementSelect.width(inner.width());
            }
            inner.css("display", "");
            inner.width(elementSelect.width());
            elementSelect.height(inner.height());
            ghostElement.width(elementSelect.width());
            ghostElement.height(elementSelect.height());
            return {width: inner.width(), height: inner.height()}
        }

        if (3 == event.which || event.ctrlKey)
            return !0;
        var cube = $(this);
        cube.addClass("on");
        var ghostElement = cube.parents(".selectedBound"),
            elementSelect = ghostElement.data("element"),
            dataElement = elementSelect.data("dataElement"),
            mouseStartX = void 0 !== event.clientX ? event.clientX : event.originalEvent.touches[0].clientX,
            mouseStartY = void 0 !== event.clientY ? event.clientY : event.originalEvent.touches[0].clientY,
            mouseX = 0, mouseY = 0,
            ratioSizeElement = dataElement.getWidth() / dataElement.getHeight(),
            rotate = dataElement.getRotate(),
            isText = $(elementSelect).hasClass("text"),
            typeCube = isText ? 10 : getTypeCube(cube),

            styleChange = getStyleChange(typeCube, rotate, dataElement.getLeft(), dataElement.getTop(), mouseStartX, mouseStartY, dataElement.getWidth(), dataElement.getHeight());

        var eventDocument = new EventElement($(document));
        eventDocument.on("mousemove|touchmove", setEventMouseMove).on("mouseup|touchend", setEventMouseUp);
        return !1;

    }

    function rotateMouseDown(event) {

        function setEventMouseMove(event) {

            mouseX = void 0 !== event.clientX ? event.clientX : event.originalEvent.touches[0].clientX;
            mouseY = void 0 !== event.clientY ? event.clientY : event.originalEvent.touches[0].clientY;

            angleNew = rotateStart + ii(matrixX, matrixY, mouseX, mouseY) - rotateMouseStart;

            var angleModulo = angleNew % 45;
            0 > angleModulo && (angleModulo += 45);

            var angleTrend = angleNew > rotateStart,
                angleQuaterX = angleTrend && 42 < angleModulo,
                angleTrend = !angleTrend && 3 > angleModulo,
                angleQuaterY = 3 > angleModulo || 42 < angleModulo;

            angleQuaterX ? (angleNew = angleNew + 45 - angleModulo) : (angleTrend && ( angleNew -= angleModulo))


            if (dataElement.getSelected() && ghostElement) {
                ghostElement.css("transform", getStringTranform(startX, startY, angleNew));
                elementSelect.css("transform", getStringTranform(startX, startY, angleNew));
            }
            dataElement.setRotate(angleNew);
            return !1;
        }

        function setEventMouseUp(event) {
            eventDocument.off("mousemove|touchmove", setEventMouseMove).off("mouseup|touchend", setEventMouseUp);
        }

        if (3 == event.which || event.ctrlKey)
            return !0;
        var cube = $(this);
        cube.addClass("on");
        var ghostElement = cube.parents(".selectedBound"),
            elementSelect = ghostElement.data("element"),
            dataElement = elementSelect.data("dataElement"),
            elementOffset = elementSelect.offset(),
            matrixX = elementOffset.left + dataElement.getWidth() / 2,
            matrixY = elementOffset.top + dataElement.getHeight() / 2,
            startX = dataElement.getLeft(),
            startY = dataElement.getTop(),
            mouseX = void 0 !== event.clientX ? event.clientX : event.originalEvent.touches[0].clientX,
            mouseY = void 0 !== event.clientY ? event.clientY : event.originalEvent.touches[0].clientY,
            rotateMouseStart = ii(matrixX, matrixY, mouseX, mouseY),
            angleNew = 0,
            rotateStart = dataElement.getRotate();

        elementSelect.data("rotateStart", rotateStart);

        var eventDocument = new EventElement($(document));
        eventDocument.on("mousemove|touchmove", setEventMouseMove).on("mouseup|touchend", setEventMouseUp);
        return !1;
    }

    function focusedMouseDown(event) {
        event.stopPropagation()
    }

    /* function util*/

    /* Get New(width, height, x, y ) by rotate vs rasie width, height*/
    function getStyleChange(typeCube, angle, oldX, oldY, mouseOldX, mouseOldY, oldWidth, oldHeight) {
        var typeIdentity, sin, cos, centerOldX, centerOldY;
        angle = parseFloat(angle), oldX = parseFloat(oldX) , oldY = parseFloat(oldY), mouseOldX = parseFloat(mouseOldX),
            mouseOldY = parseFloat(mouseOldY), oldWidth = parseFloat(oldWidth), oldHeight = parseFloat(oldHeight);

        angle *= Math.PI / 180;

        cos = Math.cos(angle)
        sin = Math.sin(angle)

        if (cos < 0) {
            typeIdentity = cos < -0.5 ? 'cos' : 'sin';
        } else {
            typeIdentity = cos > 0.5 ? 'cos' : 'sin';
        }

        centerOldX = oldX + oldWidth / 2;
        centerOldY = oldY + oldHeight / 2;

        var getStyle = function (mouseNewX, mouseNewY, elementText) {
            mouseNewX = "undefined" === typeof mouseNewX ? 0 : mouseNewX;
            mouseNewY = "undefined" === typeof mouseNewY ? 0 : mouseNewY;
            var newWidth = 1, newHeight = 1, deltaLengX, deltaLengY, centerNewX, centerNewY, newX, newY;
            newHeight = elementText ? $(elementText).height() : 1;

            switch (typeCube) {
                case 3:
                case 5:
                    newWidth = typeIdentity === 'cos' ? ((mouseNewX - mouseOldX) * cos + oldWidth) : ((mouseNewY - mouseOldY) * sin + oldWidth);
                    newHeight = newWidth / oldWidth * oldHeight;
                    break;
                case 7:
                case 1:
                    newWidth = typeIdentity === 'cos' ? ((mouseOldX - mouseNewX) * cos + oldWidth) : ((mouseOldY - mouseNewY) * sin + oldWidth);
                    newHeight = newWidth / oldWidth * oldHeight;
                    break;
                case 4:
                    newWidth = typeIdentity === 'cos' ? ((mouseNewX - mouseOldX) * cos + oldWidth) : ((mouseNewY - mouseOldY) * sin + oldWidth);
                    newHeight = oldHeight;
                    break;
                case 8:
                    newWidth = typeIdentity === 'cos' ? (( mouseOldX - mouseNewX) * cos + oldWidth) : ((mouseOldY - mouseNewY) * sin + oldWidth);
                    newHeight = oldHeight;
                    break;
                case 2:
                    newHeight = typeIdentity === 'cos' ? ((mouseOldY - mouseNewY) * cos + oldHeight) : ((mouseNewX - mouseOldX) * sin + oldHeight);
                    newWidth = oldWidth;
                    break;
                case 6:
                    newHeight = typeIdentity === 'cos' ? ((mouseNewY - mouseOldY) * cos + oldHeight) : ((mouseOldX - mouseNewX) * sin + oldHeight);
                    newWidth = oldWidth;
                    break;
                case 10:
                    newWidth = typeIdentity === 'cos' ? ((mouseNewX - mouseOldX) * cos + oldWidth) : ((mouseNewY - mouseOldY) * sin + oldWidth);
                    break;

            }

            newWidth <= 1 ? (newWidth = 1) : newHeight <= 1 ? (newHeight = 1) : 1;
            deltaLengX = ( newWidth - oldWidth ) / 2;
            deltaLengY = ( newHeight - oldHeight ) / 2;

            switch (typeCube) {
                case 5:
                    centerNewX = centerOldX + deltaLengX * cos - deltaLengY * sin;
                    centerNewY = centerOldY + deltaLengX * sin + deltaLengY * cos;
                    break;
                case 3:
                    centerNewX = centerOldX + deltaLengX * cos + deltaLengY * sin;
                    centerNewY = centerOldY + deltaLengX * sin - deltaLengY * cos;

                    break;
                case 7:
                    centerNewX = centerOldX - deltaLengX * cos - deltaLengY * sin;
                    centerNewY = centerOldY - deltaLengX * sin + deltaLengY * cos;
                    break;
                case 1:
                    centerNewX = centerOldX - deltaLengX * cos + deltaLengY * sin;
                    centerNewY = centerOldY - deltaLengX * sin - deltaLengY * cos;

                    break;
                case 2:
                    centerNewX = centerOldX - deltaLengX * cos + deltaLengY * sin;
                    centerNewY = centerOldY + deltaLengX * sin - deltaLengY * cos;
                    break;
                case 6:
                    centerNewX = centerOldX - deltaLengX * cos - deltaLengY * sin;
                    centerNewY = centerOldY - deltaLengX * sin + deltaLengY * cos;
                    break;

                case 4:
                    centerNewX = centerOldX + deltaLengX * cos + deltaLengY * sin;
                    centerNewY = centerOldY + deltaLengX * sin + deltaLengY * cos;
                    break;
                case 8:
                    centerNewX = centerOldX - deltaLengX * cos - deltaLengY * sin;
                    centerNewY = centerOldY - deltaLengX * sin + deltaLengY * cos;
                    break;
                case 10:
                    centerNewX = centerOldX + deltaLengX * cos - deltaLengY * sin;
                    centerNewY = centerOldY + deltaLengX * sin + deltaLengY * cos;
                    break;
            }

            newX = centerNewX - newWidth / 2;
            newY = centerNewY - newHeight / 2;
            return {newWidth: newWidth, newHeight: newHeight, newX: newX, newY: newY};
        }
        return getStyle;
    }

    function getStyleElementObject(left, top, width, height, rotate) {
        return {
            width: width + "px",
            height: height + "px",
            transform: getStringTranform(left, top, rotate)
        }
    }

    function getStringTranform(left, top, rotate) {
        "undefined" === typeof rotate ? 0 : rotate;
        return "translate3d(" + left + "px," + top + "px, 0px)rotateZ(" + rotate + "deg)"
    }

    function ii(a, b, c, d) {
        var e = 0;
        a == c ? e = b > d ? 1.5 * Math.PI : .5 * Math.PI : (e = Math.atan((d - b) / (c - a)),
            a < c ? d < b && (e = 2 * Math.PI + e) : e = Math.PI + e,
        isNaN(e) && (e = 0));
        return kA(180 * e / Math.PI)
    }

    function kA(a) {
        a %= 360;
        0 > a && (a += 360);
        return a
    }

    function Op(a) {
        var b = a.attr("style"), c, d;
        (c = b.match(/translate(3d)?\((-?[.\d]+)[^-.\d]+(-?[.\d]+)/)) ? (d = parseFloat(c[2]),
            c = parseFloat(c[3])) : (d = parseFloat(a.css("left")),
            c = parseFloat(a.css("top")));
        var e = b.match(/width: ([.\d]+)/)
            , g = b.match(/height: ([.\d]+)/)
            , b = e ? parseFloat(e[1]) : a.width();
        a = g ? parseFloat(g[1]) : a.height();
        return new M(d, c, b, a)
    }

    function xq(a, b) {
        var c = a.trim()
            , c = c.replace(/SVGID_/g, b + "SVGID_")
            , c = c.replace(/font-size\s*:\s*\d+\.?\d*(?=[\s;"])/g, "$\x26px")
            , c = tw(c);
        return c = uw(c)
    }

    // get String Rotate
    function $i(a) {
        var b = a.Qc || 0
            , c = a.Rc || 0
            , d = void 0 === a.nf ? 1 : a.nf
            , e = void 0 === a.gg ? 1 : a.gg
            , g = a.rotateX || 0
            , h = a.rotateY || 0;
        a = a.rotateZ || 0;
        var k = "translate3d(" + b + "px," + c + "px,0px)";

        if (1 != d || 1 != e)
            k += " scale(" + d + "," + e + ") ";
        0 != g && (k += " rotateX(" + g + "deg)");
        0 != h && (k += " rotateY(" + h + "deg)");
        0 != a && (k += " rotateZ(" + a + "deg)");
        return k
    }

    function PB(a) {
        a = window.getComputedStyle(a);
        return a.getPropertyValue("transform") || a.getPropertyValue("-webkit-transform")
    }

    function getArrayEvent(stringEvent) {
        return stringEvent.split("|").filter(function (stringEvent) {
            return "" !== stringEvent
        })
    }

    function solutionString(str) {
        return str.split(/[|+]/).filter(function (str) {
            return "" !== str
        })
    }

    function setEventSelected(objectEvent, events, selector, selectorSelected) {
        if (objectEvent.selector[events + "_" + selector]) {
            throw objectEvent = "errors";
            Error(objectEvent);
        }
        objectEvent.selector[events + "_" + selector] = selectorSelected;
    }

    function FC(a) {
        a = a.target;
        "SPAN" == a.tagName && (a.style.removeProperty("font-size"), a.style.removeProperty("background-color"), a.style.removeProperty("line-height"), a.style.removeProperty("letter-spacing"))
    }

    function sD(a) {

        if (document.queryCommandSupported("ms-pasteContentOnly"))
            document.execCommand("ms-pasteContentOnly");
        else if (document.queryCommandSupported("insertHTML") && a.originalEvent.clipboardData) {
            var b = a.originalEvent.clipboardData.getData("text/plain"),
                b = _.escape(b).replace(/\r?\n/g, "\x3cbr\x3e").replace(/ {2}/g, " \x26nbsp;");
            document.execCommand("insertHTML", !1, b)
        } else
            throw Error("Beware! Unsupported browser. Sneaking around.");
        a.preventDefault()
    }

    function inputContentElement(event) {
        $(this).trigger("change");
    }

    function inputElementKeyDown(event) {
        (function (event) {
            if (13 !== event.keyCode || !document.queryCommandSupported("insertLineBreak") || event.ctrlKey || event.metaKey)return !1;
            if (event.shiftKey || event.altKey)return !0;
            if (document.queryCommandState("insertUnorderedList") || document.queryCommandState("insertOrderedList"))return !1;
            event = document.queryCommandValue("formatBlock");
            return "" !== event && "div" !== event && "p" !== event ? !1 : !0
        })(event) && (document.execCommand("insertLineBreak", !1, null), event.preventDefault())
    }

    function setHeightBox(event) {
        var seft = $(this), inner = seft.children(".inner"), ghostElement = seft.data("ghostElement"),
            dataElement = seft.data("dataElement"), rotate = dataElement.getRotate(),
            oldWidth = dataElement.getWidth(), oldHeight = dataElement.getHeight(),
            oldX = dataElement.getLeft(), oldY = dataElement.getTop(),
            centerOldX = oldX + oldWidth / 2, centerOldY = oldY + oldHeight / 2,
            newWidth = inner.width(), newHeight = inner.height(),
            newPosition = getStyle(rotate, newWidth, newHeight);
        dataElement.setStyle(newPosition.newX, newPosition.newY, newWidth, newHeight, rotate);
        ghostElement.css({
            "height": newHeight,
            "transform": getStringTranform(newPosition.newX, newPosition.newY, rotate)
        });
        seft.css({"height": newHeight, "transform": getStringTranform(newPosition.newX, newPosition.newY, rotate)});
        function getStyle(angle, newWidth, newHeight) {
            var deltaLengX, deltaLengY, centerNewX, centerNewY, newX, newY, cos, sin;

            angle *= Math.PI / 180;

            cos = Math.cos(angle)
            sin = Math.sin(angle)

            deltaLengX = ( newWidth - oldWidth ) / 2;
            deltaLengY = ( newHeight - oldHeight ) / 2;

            centerNewX = centerOldX - deltaLengX * cos - deltaLengY * sin;
            centerNewY = centerOldY - deltaLengX * sin + deltaLengY * cos;


            newX = centerNewX - newWidth / 2;
            newY = centerNewY - newHeight / 2;

            return {newX: newX, newY: newY};
        }
    }

    function preSolutionString(preString) {
        console.log(preString)
        return preString.replace(/\n/gi, '<br>');
    }

    var aA = /^data:image\/[^,;]+;base64,/;

    function vq(a, b) {
        var c;
        a: {
            try {
                c = $.parseXML(a)
            } catch (d) {
                c = null;
                break a
            }
            c = $(c.documentElement)
        }
        return !c || !b && bA(c) || cA(c) ? !1 : !0
    }

    function bA(a) {
        return a.find("*").andSelf().toArray().some(function (a) {
            return -1 === Zz.indexOf(a.localName.toLowerCase())
        })
    }

    function cA(a) {
        return a.find("*").andSelf().toArray().some(function (a) {
            a = a.attributes;
            for (var c = 0; c < a.length; c++) {
                var d = a[c].name.toLowerCase(), e;
                if (e = "xlink:href" === d)
                    e = a[c].value,
                        e = !("#" === e.charAt(0) || aA.test(e));

            }
            return !1
        })
    }

    function tw(a) {
        var b = a.indexOf("\x3csvg", 0)
            , c = a.slice(0, b);
        -1 === c.toUpperCase().indexOf("\x3c!DOCTYPE") && (a = c + '\x3c!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"\x3e\n' + a.slice(b));
        return a
    }

    function vw(a) {
        function b(a) {
            return 0 !== a.filter(function (a) {
                    return isNaN(a)
                }).length
        }

        var c = ($($.parseXML(a)).find("svg").attr("viewBox") || "").split(/\s/);
        a = c.map(function (a, b) {
            return parseFloat(c[b])
        });
        return 4 !== a.length || b(a) ? [] : a
    }

    function uw(a) {
        function b(a) {
            a = g.attr(a);
            return "undefined" == typeof a || "" === a ? NaN : parseFloat(a.replace(/[^0-9\.]/g, ""))
        }

        var c = $("#limbo")
            , d = !1;
        0 >= c.length && (c = $('<div id="limbo"/><div/>'),
            $("body").append(c),
            d = !0);
        var e = $($.parseXML(a)), g, h, k, l, m;
        if (4 !== vw(a).length) {
            g = e.find("svg");
            if (!g)
                throw Error("SVG with no \x3csvg\x3e!");
            h = b("x");
            k = b("y");
            l = b("width");
            m = b("height");
            var n = e.find("svg");
            c.append(n);
            n = n.get(0).getBBox();
            isNaN(h) && (h = n.x);
            isNaN(k) && (k = n.y);
            isNaN(l) && (l = n.width);
            isNaN(m) &&
            (m = n.height);
            e.remove();
            d && c.remove();
            c = ' viewBox\x3d"' + [h, k, l, m].join(" ") + '" ';
            d = a.indexOf("\x3csvg", 0) + 4;
            return a.substring(0, d) + c + a.substring(d)
        }
        return a
    }

    function pq(a, b) {
        var c = [];
        if (0 === a.find(b).length)
            return c;
        var d = a.parent()
            , e = a.prev()
            , g = zq(a)
            , h = $("<div></div>");
        h.appendTo($("#limbo"));
        h.css("width", g.C()).css("height", g.F());
        a.appendTo(h);
        a.attr("stroke", "transparent").attr("stroke-width", 0).forceLayout();
        var k = a.get(0).getBoundingClientRect();
        $(b, a).each(function (a, b) {
            var d = $(b).clone();
            d.attr("fill", "transparent").appendTo($(b).parents("g, svg").first()).forceLayout();
            var e = te(d.get(0).getBoundingClientRect());
            d.remove();
            e.translate(-k.left,
                -k.top);
            c.push(e)
        });
        0 < d.length ? 0 < e.length ? a.insertAfter(e) : a.prependTo(d) : a.detach();
        h.remove();
        return c
    }

    function Aq(a, b) {
        var c = $()
            , d = pq(a, ".textPlaceholder")
            , e = $(".canva .textPlaceholder", a);
        d.forEach(function (a, d) {
            var k = e.eq(d)
                , l = k.data() || {}
                , m = $(['\x3cdiv class\x3d"text"\x3e\x3cdiv class\x3d"inner"\x3e', l.placeholderText || b.format("documentSvgPlaceholderText"), "\x3c/div\x3e\x3c/div\x3e"].join(""));
            m.data("textIndex", d).data("placeholderElement", k).data("placeholderText", l.placeholderText).data("rect", a).data("justification", l.justification || "center").css("text-align", l.justification || "center").data("fontSize",
                l.fontSize || 24).css("font-size", (l.fontSize || 24) * Ab + "%").data("defaultFontSize", l.fontSize || 24).data("original-fill", l.fill).data("is-primary-color", l.fill && Ep.equals(R(l.fill))).data("is-secondary-color", l.fill && Fp.equals(R(l.fill))).data("is-tertiary-color", l.fill && Gp.equals(R(l.fill))).data("fill", l.fill).css("color", l.fill || "").data("fontName", l.fontName).data("fontFamily", l.fontFamily).css("font-family", l.fontFamily ? l.fontFamily : "").data("bold", l.bold).data("italic", l.italic).data("lineSpacing",
                l.lineSpacing || 1.2).css("line-height", l.lineSpacing || 1.2).data("dynamicFontSize", l.dynamicFontSize).data("dynamicHeight", l.dynamicHeight).data("dynamicWidth", l.dynamicWidth);
            0 < k.parents().filter(function () {
                return this.classList.contains("stack")
            }).length || Oq(m);
            k = new Pq(m, 0, 0);
            m.data("designObject", k);
            c = c.add(m)
        });
        return c
    }

    var Lq = 0;

    function wq() {
        Lq = Lq == Math.pow(2, 53) ? 0 : Lq + 1;
        return "CANVA" + Lq + "_"
    }

    /* end function util*/

    function createSelectedElement(element) {
        var ghostElement = element.data("ghostElement"), menuElement = element.data("menuElement"), dataElement = element.data("dataElement")
            angleWorkspace = $("#angleWorkspace");
        element.addClass("selected");

        ghostElement || (ghostElement = $('<div class="selectedBound handleCircle"><div class="ghostElement"></div><a class="cube tl"></a><a class="cube t"></a><a class="cube tr"></a><a class="cube r"></a><a class="cube br"></a><a class="cube b"></a><a class="cube bl"></a><a class="cube l"></a><a class="rotate" title="Rotate"></a></div>'),
            element.data("ghostElement", ghostElement),
            element.hasClass("text") && ghostElement.addClass("text")
        );
        ghostElement.data("element", element).appendTo(angleWorkspace);

        if (element.hasClass("text")) {
            $(".cube.tl, .cube.t, .cube.tr, .cube.bl, .cube.b, .cube.br").css("display", "none");
            element.addClass("selected focused");
            element.children(".inner").attr("contenteditable", "true");
            element.on("paste", sD)
            element.appendTo(angleWorkspace);
            menuElement || (menuElement = createMenu("text", dataElement), element.data("menuElement", menuElement));

            setEventMenu("text", dataElement, menuElement)
        } else if (element.hasClass("image") || element.hasClass("svg")) {
            $(".cube.l, .cube.t, .cube.r, .cube.b").css("display", "none");
            menuElement || (menuElement = createMenu("image", dataElement), element.data("menuElement", menuElement));
            setEventMenuImage("text", dataElement, menuElement)
        }


        ghostElement.css({
            width: dataElement.getWidth(),
            height: dataElement.getHeight(),
            transform: getStringTranform(dataElement.getLeft(), dataElement.getTop(), dataElement.getRotate())
        });

        menuElement.data("element", element).appendTo($(".header-control .group-dynamic"));

    }
    function createMenu(type, dataElement) {
        if(type === "image")
            var menu = $('<menu id="text-menu" class="text-menu menu"><li class="child-text-menu"><div class="font area-back-front"> <span id="input-forward"><img src="images/layer12.png"></span> <span id="input-back"><img src="images/layer22.png"></span></div></li><li class="child-text-menu"><div class="font area-transparency"> <input id="input-transparency" type="range" name="points" step="0.00001" min="0" max="1"></div></li><li class="child-text-menu"><div class="font area-delete"> <span id="input-delete"><img src="images/delete.png"></span></div></li></menu>')

        else
            var menu = $('<menu id="text-menu" class="text-menu menu"><li class="child-text-menu"><div class="font area-font-family"> <input type="text" autocomplete="off" id="input-font-family"> <span class="icon-down"> / </span><ul class="dropdown font-familys"><li> <a class="list-item font-family"> <img src="https://static.canva.com/static/images/fonts/Raleway.png" /><input type="hidden" value="Raleway"> </a></li><li> <a class="list-item font-family"> <img src="https://static.canva.com/static/images/fonts/Roboto@2x.png" />  <input type="hidden" value="Roboto"> </a></li><li> <a class="list-item font-family"> <img src="https://static.canva.com/static/images/fonts/Open-Sans@2x.png" /> <input type="hidden" value="Open Sans"> </a></li><li> <a class="list-item font-family"> <img src="https://static.canva.com/static/images/fonts/Oswald@2x.png" /> <input type="hidden" value="Oswald"> </a></li></ul></div></li><li class="child-text-menu"><div class="font area-font-size"> <input type="text" autocomplete="off" id="input-font-size"><ul class="dropdown font-sizes" style="width: 6em; left: 200px; top: 70px; height: 150px;"><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="6"> <label class="dd-option-text" style="cursor:pointer;">6</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="8"> <label class="dd-option-text" style="cursor:pointer;">8</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="10"> <label class="dd-option-text" style="cursor:pointer;">10</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="12"> <label class="dd-option-text" style="cursor:pointer;">12</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="14"> <label class="dd-option-text" style="cursor:pointer;">14</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="16"> <label class="dd-option-text" style="cursor:pointer;">16</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="18"> <label class="dd-option-text" style="cursor:pointer;">18</label> </a></li><li> <a class="list-item font-size dd-option-hover"> <input class="dd-option-value" type="hidden" value="21"> <label class="dd-option-text" style="cursor:pointer;">21</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="24"> <label class="dd-option-text" style="cursor:pointer;">24</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="28"> <label class="dd-option-text" style="cursor:pointer;">28</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="32"> <label class="dd-option-text" style="cursor:pointer;">32</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="36"> <label class="dd-option-text" style="cursor:pointer;">36</label> </a></li><li> <a class="list-item font-size dd-option-selected"> <input class="dd-option-value" type="hidden" value="42"> <label class="dd-option-text" style="cursor:pointer;">42</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="48"> <label class="dd-option-text" style="cursor:pointer;">48</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="56"> <label class="dd-option-text" style="cursor:pointer;">56</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="64"> <label class="dd-option-text" style="cursor:pointer;">64</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="72"> <label class="dd-option-text" style="cursor:pointer;">72</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="80"> <label class="dd-option-text" style="cursor:pointer;">80</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="88"> <label class="dd-option-text" style="cursor:pointer;">88</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="96"> <label class="dd-option-text" style="cursor:pointer;">96</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="104"> <label class="dd-option-text" style="cursor:pointer;">104</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="120"> <label class="dd-option-text" style="cursor:pointer;">120</label> </a></li><li> <a class="list-item font-size"> <input class="dd-option-value" type="hidden" value="144"> <label class="dd-option-text" style="cursor:pointer;">144</label> </a></li></ul></div></li><li class="child-text-menu"><div class="font area-font-align"> <input type="hidden" id="input-font-align"> <span value="left"><img src="images/m-align1.png"></span> <span value="center"><img src="images/m-align2.png"></span> <span value="right"><img src="images/m-align3.png"></span> <span value="justify"><img src="images/m-align4.png"></span></div></li><li class="child-text-menu"><div class="font area-font-color"> <input type="text" id="input-color" /></div></li><li class="child-text-menu"><div class="font area-back-front"> <span id="input-forward"><img src="images/layer12.png"></span> <span id="input-back"><img src="images/layer22.png"></span></div></li><li class="child-text-menu"><div class="font area-transparency"> <input id="input-transparency" type="range" name="points" step="0.00001" min="0" max="1"></div></li><li class="child-text-menu"><div class="font area-delete"> <span id="input-delete"><img src="images/delete.png"></span></div></li></menu>')
        return menu
    }

    function setEventMenu(type, dataElement, menu) {
        var menuElement = menu,

            menuFontFamily = menuElement.find("#input-font-family"),
            menuFontSize =  menuElement.find("#input-font-size"),
            menuFontColor = menuElement.find("#input-color"),
            menuFontAlign = menuElement.find(".area-font-align"),
            menuFontBold = menuElement.find("#input-font-bold"),
            menuFontUnder = menuElement.find("#input-font-under"),
            menuFontItalic = menuElement.find("#input-font-italic"),

            menuTransparency = menuElement.find("#input-transparency"),
            menuBack = menuElement.find("#input-back"),
            menuForward = menuElement.find("#input-forward"),
            menuCopy = menuElement.find("#input-copy"),
            listFontFamily = menuElement.find(".font-familys"),
            listFontSize = menuElement.find(".font-sizes");
        menuElement.data("dataElement", dataElement);

        menuElement.on("click", ".list-item.font-family", setEventChangeFontFamily )
        menuElement.on("click", ".list-item.font-size", setEventChangeFontSize )
        menuFontAlign.on("click", "span", setEventChangeFontAlign )
        menuElement.on("click", ".list-item.font-size", setEventChangeFontSize )
        menuForward.on("click", setEventChangeForward )
        menuBack.on("click",  setEventChangeBack )

        menuFontBold.on("change", setEventChangeFontBold)
        menuFontUnder.on("change", setEventChangeFontUnder)
        menuFontItalic.on("change", setEventChangeFontItalic)
        menuFontColor.on("change", setEventChangeFontColor)
        menuTransparency.on("change", setEventChangeTransparency)

        menuFontFamily.val(dataElement.style.fontFamily);
        menuFontSize.val(dataElement.style.fontSize);
        menuFontColor.val(dataElement.style.color);
        menuFontAlign.val(dataElement.style.fontFamily);
        menuTransparency.val(dataElement.transparency);

        menuElement.on("change", "#input-font-family", setValueFontFamily);
        menuElement.on("change", "#input-font-size",setValueFontSize);
        return menuElement;
    }

    function setEventMenuImage(type, dataElement, menu) {
        var menuElement = menu,
            menuTransparency = menuElement.find("#input-transparency"),
            menuBack = menuElement.find("#input-back"),
            menuForward = menuElement.find("#input-forward"),
            menuDelete = menuElement.find("#input-delete");

        menuForward.on("click", setEventChangeForward )
        menuBack.on("click",  setEventChangeBack )
        menuDelete.on("click",  setEventChangeDelete )

        menuElement.data("dataElement", dataElement);
        menuTransparency.val(dataElement.transparency);
        menuTransparency.on("change", setEventChangeTransparency)

        return menuElement;
    }


    function setEventChangeFontFamily(event) {
        var menuElement = $(event.delegateTarget), fontFamily = $(this).find("input").val(), dataElement = menuElement.data("dataElement"),
            input  = menuElement.find("#input-font-family").val(fontFamily), domElement = dataElement.getDom();
        domElement.css("font-family", fontFamily);
        domElement.trigger("change");
        dataElement.setFontFamily(fontFamily);
    }

    function setEventChangeFontSize(event) {
        var menuElement = $(event.delegateTarget), fontSize = $(this).find("input").val(), dataElement = menuElement.data("dataElement"),
            input  = menuElement.find("#input-font-size").val(fontSize), domElement = dataElement.getDom();
        domElement.css("font-size", fontSize + "px");
        domElement.trigger("change");
        dataElement.setFontSize(fontSize);
    }

    function setValueFontFamily(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var fontFamily = seft.val();
        domElement.css("font-family", fontFamily);
        domElement.trigger("change");
        dataElement.setFontFamily(fontFamily);
    }

    function setValueFontSize(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var fontSize = seft.val();
        domElement.css("font-size", fontSize + "px");
        domElement.trigger("change");
        dataElement.setFontSize(fontSize);
    }

    function setEventChangeFontBold(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var bold = seft.val();
    }
    function setEventChangeFontUnder(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var fontSize = seft.val();
    }
    function setEventChangeFontItalic(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var fontSize = seft.val();
    }
    function setEventChangeFontAlign(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var align = seft.attr("value"), inputAlign = menuElement.find("#input-font-align").val(align)
        domElement.css("text-align", align);
        dataElement.setFontAlign(align);
    }
    function setEventChangeFontColor(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var fontColor = seft.val();
        domElement.css("color", fontColor);
        dataElement.setFontColor(fontColor);
    }
    function setEventChangeForward(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var elements = domElement.parents(".elements"), index = $(".element").index(domElement);
        console.log(index);
         domElement.insertAfter($(".element:eq(" + (index + 1) + ")"))
        dataElement.setElementIndex(index + 1);
    }
    function setEventChangeBack(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var elements = domElement.parents(".elements"), index = $(".element").index(domElement);
        console.log(index);
        index ? domElement.insertBefore($(".element:eq(" + (index - 1) + ")")) : 1
        dataElement.setElementIndex(index - 1);
    }

    function setEventChangeTransparency(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var opacity = seft.val();
        opacity = opacity;
        domElement.css("opacity", opacity);
        dataElement.setTransparency(opacity);
    }

    function setEventChangeDelete(event) {
        var seft = $(this), menuElement = seft.parents("#text-menu"), dataElement = menuElement.data("dataElement"), domElement = dataElement.getDom();
        var elements = domElement.parents(".elements");
        domElement.remove();
    }

    function Element(data) {
        this.dom = $('<div class="element">');
        this.dom.data("dataElement", this);
        this.selected = !1;
        this.transparency = data.transparency;
        this.rotation = this.height = this.width = this.top = this.left = 0;
        this.index = data.elementIndex;
    }

    var contructorElement = Element.prototype;

    contructorElement.trigger = Backbone.Events.trigger;
    contructorElement.listenTo = Backbone.Events.listenTo;
    contructorElement.stopListening = Backbone.Events.stopListening;
    contructorElement.on = Backbone.Events.on;
    contructorElement.once = Backbone.Events.once;
    contructorElement.off = Backbone.Events.off;

    _.extend(Element.prototype, Backbone.Events);

    contructorElement = Element.prototype;

    contructorElement.render = function (domElement) {
        domElement.appendTo($("#elements"));
    }

    contructorElement.setStyle = function (left, top, width, height, rotate) {
        this.left = left, this.top = top, this.width = width, this.height = height, this.rotation = rotate;
    }

    contructorElement.setSelected = function (selected) {
        this.selected = selected;
    }

    contructorElement.getSelected = function () {
        return this.selected;
    }

    contructorElement.getRotate = function () {
        return this.rotation;
    }

    contructorElement.setRotate = function (rotate) {
        this.rotation = rotate;
    }

    contructorElement.getWidth = function () {
        return this.width;
    }

    contructorElement.getHeight = function () {
        return this.height;
    }

    contructorElement.setWidth = function (width) {
        this.width = width;
    }

    contructorElement.setHeight = function (height) {
        this.height = height;
    }

    contructorElement.getTop = function () {
        return this.top;
    }

    contructorElement.setLeft = function (left) {
        this.left = left;
    }

    contructorElement.getLeft = function () {
        return this.left;
    }

    contructorElement.getTop = function () {
        return this.top;
    }

    contructorElement.setLeft = function (left) {
        this.left = left;
    }

    contructorElement.setTop = function (top) {
        this.top = top;
    }

    contructorElement.setPosition = function (left, top) {
        this.setTop(top);
        this.setLeft(left);
    }

    contructorElement.isMedia = function () {
        return this.hasCode;
    };

    contructorElement.getDom = function () {
        return this.dom;
    }

    contructorElement.setWidth = function (width) {
        this.width = width;
    }

    contructorElement.setHeight = function (height) {
        this.height = height;
    }

    contructorElement.remove = function (height) {
        this.dom.data("ghostElement").remove();
    }

    contructorElement.setElementIndex = function (index) {
        this.elementIndex = index;
    }
    contructorElement.setTransparency = function (opacity) {
        this.transparency = opacity;
    }

    contructorElement.ef = function () {
        this.To = !0
    }

    contructorElement.sb = function () {
        return 0
    }

    function ImageElement(data) {
        Element.call(this, data);
        this.code = "string" === typeof data.code ? data.code : null;
        var dom = this.getDom();
        this.transparency = data.transparency;
        this.rotation = data.rotation;
        this.top = data.top;
        this.left = data.left;
        this.hasCode = !0;
        dom.addClass("image");
        var innerElement = $("<div>").addClass("inner");
        innerElement.append($("<img>"));
        innerElement.appendTo(dom);
        var bucket = mediaMap[this.code];
        this.setUrlImgMedia(bucket.screen.url);
        this.height = bucket.screen.height;
        this.width = bucket.screen.width;
        this.dom.css({
            "width": this.width + "px",
            "height": this.height + "px",
            "transform": "translate3d(" + this.left + "px," + this.top + "px,"
            + "0px)rotateZ(" + this.rotation + "deg)",
            "contenteditable": false,
            "opacity": this.transparency
        });
        return this;
    }

    ImageElement.prototype = Object.create(Element.prototype);

    contructorElement = ImageElement.prototype;

    contructorElement.setUrlImgMedia = function (url) {
        var img = this.getDom().find("img");
        img.attr("src", url);
    }

    function TextElement(data) {
        Element.call(this, data);
        var dom = this.getDom();
        this.style = data.style;
        this.elementIndex = data.elementIndex;
        this.rotation = data.rotation;
        this.top = data.top;
        this.left = data.left;
        this.hasCode = !1;
        this.height = data.height;
        this.width = data.width;
        this.html = data.html;
        var innerElement = $("<div>").addClass("inner");
        innerElement.css({
            "width": this.width + "px",
            "transform-origin": "left top 0px",
            "transform": "translateY(0em) scale(1)",
            "opacity": this.transparency
        });
        dom.css({"font-size": this.style.fontSize + "px"})
        innerElement.html(this.html);
        innerElement.appendTo(dom);
        var heightReal = innerElement.innerHeight();
        this.dom.addClass("text").css({
            "width": this.width + "px",
            "transform": "translate3d(" + this.left + "px," + this.top + "px,0px)rotateZ(" + this.rotation + "deg)",
            "opacity": this.tranparency,
            "color": this.style.color,
            "font-family": this.style.fontFamily
        });
        return this;
    }

    TextElement.prototype = Object.create(Element.prototype);

    contructorElement = TextElement.prototype;

    contructorElement.setHtml = function (html) {
        this.html = html;
    }
    contructorElement.setFontSize = function (fontSize) {
        this.style.fontSize = fontSize;
    }
    contructorElement.setFontFamily = function (fontFamily) {
        this.style.fontFamily = fontFamily;
    }
    contructorElement.setFontColor = function (fontColor) {
        this.style.color = fontColor;
    }
    contructorElement.setFontAlign = function (align) {
        this.style.align = align;
    }



    function SvgElement(data) {
        Element.call(this, data);
        this.code = "string" === typeof data.code ? data.code : null;
        var dom = this.getDom();
        this.transparency = data.transparency;
        this.rotation = data.rotation;
        this.top = data.top;
        this.left = data.left;
        this.hasCode = !0;
        dom.addClass("svg");
        this.height = data.height;
        this.width = data.width;
        var c = $('<img class="placeholder" />');
        dom.append(c);
        var bucket = mediaMap[this.code];
        getStringSvg(this, bucket.screen.url);
        this.contents = data.contents;
        data.contents.forEach(function (element) {
            $(element).data("parentElement", this);
        })

        this.dom.css({
            "width": this.width + "px",
            "height": this.height + "px",
            "transform": "translate3d(" + this.left + "px," + this.top + "px,"
            + "0px)rotateZ(" + this.rotation + "deg)",
            "contenteditable": false,
            "opacity": this.transparency
        });
        return this;
    }

    function getStringSvg(element, url) {
        function ajaxGetStringSvg(url) {
            var ajax = $.ajax({
                url: url,
                type: "GET",
                dataType: "text"
            });
            ajax.done(function (data) {
                element.createDomSvg(data);
            })
        }

        ajaxGetStringSvg(url);

    }

    SvgElement.prototype = Object.create(Element.prototype);
    contructorElement = SvgElement.prototype;
    contructorElement.createDomSvg = function (data, replaceImg) {
        var childsText = this.contents ? this.contents.filter(function (element) {
            return "text" == element.typeElement;
        }) : [];
        var childsImage = this.contents ? this.contents.filter(function (element) {
            return "image" == element.typeElement;
        }) : []
        if (vq(data, !0)) {
            var n = wq(),
                n = xq(data, n),
                q = $(n).filter("svg");
            var childsText = Aq(q);
            console.log(childsText)
        }
        q.appendTo(this.getDom());
    }

    var workspaceModel, workspaceView, angleWorkspace, angleWorkspaceView;
    workspaceModel = new Workspace(localStorages);
    workspaceView = new WorkspaceView({model: workspaceModel});
    angleWorkspace = new AngleWorkspace({workspace: workspaceModel});
    angleWorkspaceView = new AngleWorkspaceView({model: angleWorkspace, workspaceView: workspaceView});
    initEvent();

})(jQuery);
