(function () {
    var uplevoDesign, ac12, dataSomePost, head, pageedit, pageSize, footer, areaSocial, ratio, scale, p, resizeTimer;
    p = new PoolQuotes();
    dataSomePost = new DataQuote();
    callQuotes();
    var setTranForm = getBrowserCurrent();
    var getXYTranslate = positionXYTranslate();

    head = document.getElementsByClassName('head')[0];
    pageSize = document.getElementById('pagesize');
    uplevoDesign = document.getElementsByClassName('uplevoDesign')[0];
    ac12 = document.getElementById('ac12');
    pageedit = document.getElementById('pageedit');
    areaSocial = document.getElementsByClassName('socialpostbtn')[0];
    footer = document.getElementsByClassName('footer')[0];
    document.addEventListener('click', function (e) {
        e = e || window.event;
        if (findParentNode(e.target) === false) {
            removedi();
            closeSmenu();
            closeShareBox();
        }

        function findParentNode(childObj) {
            var idOrClassCancel, count, isFound, testObj;
            idOrClassCancel = ["area-menu", "area-type", "bt-change-size", "bt-menu", "over1", "di1", "indiv", "menu1", "fontselected", "fontother", "colorother", "colorpicker", "collorpicker", "svgcolorpicker", "cPPanel", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "svgcolormoredetail1", "svgcolormoredetail2", "svgcolormoredetail3", "morespacefont", "menuimageeffectclkid", "indivfimg"];
            count = 0;
            while (count < 8) {

                if (count === 0) {
                    testObj = childObj;
                } else {
                    testObj = testObj.parentNode;
                    if (testObj === null) {
                        break;
                    }
                }
                if (idOrClassCancel.indexOf(testObj.id) === -1) {
                    isFound = false;
                } else {
                    isFound = true;
                    return;
                }
                count++;
            }
            return isFound;
        }

    }, false);
    $(document).ready(function (e) {
        var type, sizeLayout;
        type = getTypeLayout();
        setPageSize();
        sizeLayout = initSetLayout(type);
        setLayoutShow(sizeLayout);
    });

    $(window).resize(function (e) {
        var type, sizeLayout;
        type = getTypeLayout();
        setPageSize();
        sizeLayout = initSetLayout(type);

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(delaySetLayout, 100);
        function delaySetLayout() {
            if (sizeLayout.widthShow < 400 && sizeLayout.heightShow < 400) {
                $('#changesize ul').addClass('size-small-5');
            } else {
                $('#changesize ul').removeClass('size-small-5');
            }
            setLayoutShow(sizeLayout);
            //repaintQuote('refesh');
        }
    });

    $('#downimage').click(function () {
        closeSmenu();
        closeShareBox();
        renderImage('download', getTypeLayout());
    });

    $('#shuffle').click(function () {
        closeSmenu();
        nextQuote();
    });

    $('#back-quote').click(function () {
        closeSmenu();
        backQuote();
    });

    $('#changesize li').click(function (e) {
        $('#changesize li').removeClass('active');
        $(this).addClass('active');
        var sizeLayout, type = $(this).hasClass('tall') ? 'tall' : $(this).hasClass('square') ? 'square' : $(this).hasClass('wide') ? 'wide' : 'wide';
        sizeLayout = initSetLayout(type);
        if (type === 'tall' || type === 'square') {
            $('.socialpostbtn').addClass('small-5');
        } else {
            $('.socialpostbtn').removeClass('small-5');
        }
        removedi();
        setLayoutShow(sizeLayout);
        repaintQuote('refesh');
        setQuotesCenter();
        closeSmenu();

    });

    $('.schangesize').click(function () {
        if (!$('.smenucont').hasClass('chgSize')) {
            closeSmenu2();
            showSmenu();
            showSmenu2('Change size');
            $('#changesize').css('display', 'block');
            $('.smenucont').addClass('chgSize');

        } else {
            closeSmenu();
        }
        closeShareBox();
    });

    $('#socialshare').click(function (e) {
        var popupShare = document.getElementsByClassName('share-social')[0];
        if (typeof popupShare === 'undefined')
            return;
        if (popupShare.style.display === 'none')
            popupShare.style.display = 'block';
        else {
            popupShare.style.display = 'none';
        }
        closeSmenu();
        return false;
    });

    $('.choonse-type-post').find('input').click(function (e) {
        callQuotes()
    });

    $('.categoryul li i').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
        callQuotes();
    });

    $('#background li .bgcolordiv').click(function () {
        $('#background li .bgcolordiv').removeClass('active');
        $(this).addClass('active');
        var color = this.getAttribute('acolor');
        var sizeShow = getPageShow();

        var src = createImageColor(color, sizeShow[0], sizeShow[1]);
        setImageBackground(src, '', 1);
        setEffectBlurMode(false);
    });
    $('.smenu').click(function () {
        if ($('.smenucont').hasClass('active')) {
            closeSmenu();
        } else {
            showSmenu();
        }
        closeShareBox();
    });

    $('i.ic-back').click(function (e) {
        setEventComeBackMenu(e);
    });

    $('.smenucontshow, i.ic-close').click(function () {
        closeSmenu();
    });

    //------------cagory-------------
    $('.smenuul .category').click(function () {
        showSmenu2($(this).html());
        $('#category').css('display', 'block');
    });

    $('#category .categoryok').click(function () {
        $('.categoryul li').removeClass('active');
        $(this).addClass('active');
        closeSmenu();
        saveYourCate();
        //nextQuote();

    });

    //------------img-------------
    $('.smenuul .uimg').click(function () {
        showSmenu2($(this).html());
        $('#uimg').css('display', 'block');
    });

    //-------------My img------------
    $('.smenuul .myimg').click(function () {
        showSmenu2($(this).html());
        $('#myimg').css('display', 'block');
    });

    //-------------background------------
    $('.smenuul .background').click(function () {
        showSmenu2($(this).html());
        $('#background').css('display', 'block');
    });

    //-------------changesize------------
    $('.smenuul .changesize').click(function () {
        showSmenu2($(this).html());
        $('#changesize').css('display', 'block');
        $('.smenucont').addClass('chgSize');
    });

    $('.share-social a').click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (!$('.smenucont').hasClass('chgSize')) {
            closeSmenu2();
            showSmenu();
            showSmenu2('Share Social');
            $('#area-share-menu').css('display', 'block');
            $('.smenucont').addClass('chgSize');

        } else {
            closeSmenu();
        }
        closeShareBox();
        setDisplaypProgressBar(false);
        callShareQuote(this);
    });

    function setEventComeBackMenu(e) {
        if (e.target.parentNode.id === 'smenu-title')
            closeSmenu();
        else {
            $('.main-menu').css('display', 'block');
            $('#smenu-title').css('display', 'block');
            $('#submenu-title').css('display', 'none');
            $('.smenucontbox').css('display', 'none');
            $('.smenuconttab').css('display', 'none');
        }
    }

    function setDisplaypProgressBar(isHide) {
        var progressBar, exportingStatus;
        progressBar = document.getElementsByClassName('progress-bar')[0];
        exportingStatus = document.getElementsByClassName('exporting')[0];
        if (isHide === true) {
            progressBar.style.display = 'none';
            exportingStatus.style.display = 'block';
        } else {
            progressBar.style.display = 'block';
            exportingStatus.style.display = 'none';
        }
        return exportingStatus;
    }

    function setEventClickSocial() {
        var i, eShares;
        eShares = document.getElementsByClassName('share-social')[0].getElementsByTagName('a');
        i = eShares.length;
        while (i--) {
            eShares[i].onclick = callShareQuote;
        }
    }

    function callShareQuote(element) {
        shareQuotes(element.id);
        return false;
    }

    function closeSmenu() {
        $('.smenuconttab, #submenu-title, .smenucontbox').css('display', 'none');
        $('.smenucontshow').css('display', 'none');
        $('.main-menu').css('display', 'block');
        $('.smenucont').removeClass('active').removeClass('chgSize');
    }

    function closeSmenu2() {
        $('.main-menu').css('display', 'block');
        $('.smenuconttab,#submenu-title, .smenucontbox').css('display', 'none');
        $('.smenucont').removeClass('chgSize');
    }

    function closeShareBox() {
        $('.share-social').css('display', 'none');
    }

    function showSmenu() {
        $('.smenucont').addClass('active');
        $('.smenucontshow').css('display', 'block').removeClass('chgSize');
    }

    function showSmenu2(title) {
        $('.main-menu').css('display', 'none');
        $('#submenu-title, .smenucontbox').css('display', 'block');
        $('#submenu-title').find('span').html(title);
    }

    function checkEffectBlurMode() {
        return document.getElementById('effect-blur') === null ? false : true;
    }

    function callQuotes() {
        var typeCategories, typeSomePost;
        typeCategories = getCategories();
        typeSomePost = getTypePost();
        dataSomePost.setTypeSomePost(typeSomePost, typeCategories);
        dataSomePost.loadMoreQuotes();
    }

    function shareQuotes(typeSocial) {
        renderImage('share', getTypeLayout(), typeSocial);
    }

    function LayoutPage(type) {
        if (type === 'tall') {
            this.width = 734;
            this.height = 1024;
        } else if (type === 'square') {
            this.width = 1024;
            this.height = 1024;
        } else if (type === 'wide') {
            this.width = 1024;
            this.height = 512;
        }
    }

    function initSetLayout(typeLayout) {
        var solution, layoutPage;
        layoutPage = new LayoutPage(typeLayout);
        solution = new SolutionLayoutShow(layoutPage);
        solution.setSizeShow();
        return solution;
    }

    function SolutionLayoutShow(layoutPage) {
        this.widthPage = getPageSize()[0];
        this.heightPage = getPageSize()[1];
        this.heightShowDefault = 421;
        this.widthShowDefault = 842;
        this.widthShow;
        this.heightShow;
        this.scale;
        this.setSizeShow = function () {
            var ratioLayout;
            ratioLayout = layoutPage.width / layoutPage.height;

            this.heightShow = this.heightPage > this.heightShowDefault ? this.heightShowDefault : this.heightPage;
            this.widthShow = this.widthPage > this.widthShowDefault ? this.widthShowDefault : this.widthPage;
            if (this.heightShow * ratioLayout > this.widthShow) {
                this.heightShow = this.widthShow / ratioLayout;
            } else {
                this.widthShow = this.heightShow * ratioLayout;
            }
            this.scale = this.heightShow / layoutPage.height;
        }
    }

    function setPageSize() {
        var rectFooter, rectHead, rectAreaSocial, heightDefault, heightPageSize;
        rectFooter = footer.getBoundingClientRect();
        rectAreaSocial = areaSocial.getBoundingClientRect();
        rectHead = head.getBoundingClientRect();
        heightDefault = 421;
        pageSize.style.width = '100%';
        heightPageSize = ( window.innerHeight - ( rectFooter.height + rectHead.height + rectAreaSocial.height) );
        pageSize.style.height = heightPageSize < heightDefault ? heightDefault + 'px' : heightPageSize + 'px';
    }

    function setLayoutShow(sizeLayout) {
        areaSocial.style.width = uplevoDesign.style.width = ac12.style.width =
            pageedit.style.width = uplevoDesign.style.width = sizeLayout.widthShow + 'px';
        uplevoDesign.style.height = ac12.style.height = pageedit.style.height =
            uplevoDesign.style.height = sizeLayout.heightShow + 'px';
        setElementBackgroundPosition(sizeLayout);
    }

    function setElementBackgroundPosition(sizeLayout) {
        var sizePhotoInPageEdit, imgBackground, elementBackgound, width, height;
        if (checkEffectBlurMode() === true) {
            setEffectBlurMode(true);
        }
        elementBackgound = document.getElementById('pageeditimg');
        imgBackground = elementBackgound.getElementsByTagName('img')[0];
        width = imgBackground.width;
        height = imgBackground.height;

        sizePhotoInPageEdit = new SizePhotoInFrame(width, height,
            sizeLayout.widthShow, sizeLayout.heightShow);

        imgBackground.style.width = elementBackgound.style.width = sizePhotoInPageEdit.widthFrame + 'px';
        imgBackground.style.height = elementBackgound.style.height = sizePhotoInPageEdit.heightFrame + 'px';
        setTranForm(elementBackgound, 'translate3d(' + sizePhotoInPageEdit.x + 'px, ' + sizePhotoInPageEdit.y + 'px, 0px)');
    }

    function getTypePost() {
        var typeLoadQuote, l, eChoonseTypePost, eType, arrayTypePost = [];
        eChoonseTypePost = document.getElementsByClassName('choonse-type-post')[0];
        if (typeof eChoonseTypePost !== 'undefined') {
            eType = eChoonseTypePost.getElementsByTagName('input');
            for (var j = 0; j < eType.length; j++) {
                if (eType[j].checked === true) {
                    arrayTypePost[j] = eType[j].id;
                }
            }
        }

        if (arrayTypePost[0] === 'type-quote' && arrayTypePost[1] === 'type-typo') {
            typeLoadQuote = 'all';
        } else if (arrayTypePost[0] !== 'type-quote' && arrayTypePost[1] === 'type-typo') {
            typeLoadQuote = 'typo';
        } else if (arrayTypePost[0] === 'type-quote' && arrayTypePost[1] !== 'type-typo') {
            typeLoadQuote = 'quote';
        } else {
            typeLoadQuote = 'all';
        }

        return typeLoadQuote;
    }

    function getCategories() {
        var typeLoadCategories, l, eCategories, eTypeCategories, arrayTypePost = [];
        eCategories = document.getElementsByClassName('categoryul')[0];
        if (typeof eCategories !== 'undefined') {
            eTypeCategories = eCategories.getElementsByClassName('active');
            for (var j = 0; j < eTypeCategories.length; j++) {
                arrayTypePost[j] = eTypeCategories[j].getAttribute('dataid');
            }
        }
        if (typeof arrayTypePost === 'undefined' || eTypeCategories.length === 0) {
            arrayTypePost = 'all';
        }
        return arrayTypePost;
    }

    function DataQuote() {
        this.statusData = true;
        this.typeSomePost = 'all';
        this.startLenght = 0;
        this.lengthQuoteCurrent = null;
        this.categories = 'all';
        this.setTypeSomePost = function (typeSomePost, categories) {
            if (typeSomePost !== this.typeSomePost) {
                this.startLenght = 0;
                this.lengthQuoteCurrent = p.lengthQuotes;
                this.typeSomePost = typeSomePost;
                this.categories = categories;
            } else {
                this.startLenght = p.lengthQuotes;
                this.lengthQuoteCurrent = null;
                this.categories = categories;
            }
        }
        this.loadMoreQuotes = function () {
            var quote, content, typeQuote, lenght;
            if (this.statusData === null) {
                return this.statusData;
            }
            p = new PoolQuotes();
            lenght = btoa(this.startLenght);
            $.ajax({
                url: 'some-post/done',
                type: 'POST',
                data: {a: 2, c: lenght, t: this.typeSomePost, c: this.categories.toString()},
                error: function () {
                },
                dataType: 'json',
                success: function (msg) {
                    if (msg.status == 1) {

                        for (var i = 0; i < msg.m.length; i++) {

                            if (msg.m[i].body === '') {
                                typeQuote = 'quotes-fix';
                                content = msg.m[i].image;
                            } else {
                                typeQuote = 'quotes-edited';
                                content = msg.m[i].body;
                            }
                            quote = new SomeQuote(typeQuote, content);
                            p.add(quote);
                        }

                    } else {
                        this.statusData = null;
                    }
                }

            });

            return this.statusData;
        }
    }

    function debounce(func, wait) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var executeFunction = function () {
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(executeFunction, wait);
        };
    };

    function nextQuote() {
        var status, empty, isLoad;
        status = createQuote('next');
        if (status === false) {
            setTimeout(nextQuote, 200, false);
            return;
        }

    }

    function createImageColor(color, width, height) {
        var context, canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        context = canvas.getContext('2d');
        context.fillStyle = color;
        context.fillRect(0, 0, width, height);
        return canvas.toDataURL();
    }

    function backQuote() {
        createQuote('back')
    }

    function repaintQuote(typeRepain) {

        if (typeRepain === 'refesh') {
            $('#textquotes').remove();
            createQuote('balance');
        } else {

        }
    }

    function createQuote(isControl) {
        var key, objQuote, element, eQuoteCurrent, sizePageShow = getPageShow();
        $('#textquotes').remove();
        element = new ElementPage(sizePageShow[0], sizePageShow[1]);

        key = isControl === 'next' ? p.pointer + 1 : isControl === 'back' ? p.pointer - 1 : p.pointer;
        objQuote = p.get(key);

        if (typeof objQuote !== 'undefined') {
            if (objQuote.type === 'quotes-edited') {
                element.createElement('quotes-edited', objQuote);
            } else {
                element.createElement('quotes-fix', objQuote);
            }
            return true;
        } else {
            return false;
        }
    }

    function getTypeLayout() {
        var liLayout, type;
        liLayout = $('#changesize ul li.active');
        type = liLayout.hasClass('tall') ? 'tall' : liLayout.hasClass('square') ? 'square' : liLayout.hasClass('wide') ? 'wide' : 'wide';
        return type;
    }

    function getPageShow() {
        return [uplevoDesign.offsetWidth, uplevoDesign.offsetHeight]
    }

    function getPageSize() {
        return [pageSize.offsetWidth, pageSize.offsetHeight]
    }

    function ElementOrigin(layoutPageOrigin, layoutPage) {
        var width, height, xNew, yNew, scale;
        scale = layoutPage[0] / layoutPageOrigin.width;
        this.getPositionReal = function (xOld, yOld) {
            xNew = xOld / scale;
            yNew = yOld / scale;
            return [xNew, yNew]
        }
        this.getSizeReal = function (widthOld, heightOld) {
            width = widthOld / scale;
            height = heightOld / scale;
            return [width, height]
        }
        this.getFontSizeReal = function (fontSizeOld) {
            return fontSizeOld / scale;
        }

    }

    function cleanString(content) {
        return content.replace(/\s<br>/gi, '\n').replace(/&nbsp;/gi, ' ').replace(/<br>/gi, '\n');
    }

    function renderImage(typeRender, typeLayout, typeSocial) {
        removedi();
        var stage, layer, lenght, elements, layoutPageOrigin, layoutPage, elementOgirin, postionOld, postionNew, sizeOld, sizeNew, fontSizeNew, opacity, canvas, autoDownload;
        layoutPageOrigin = new LayoutPage(typeLayout);
        layoutPage = getPageShow();
        elementOgirin = new ElementOrigin(layoutPageOrigin, layoutPage);

        stage = new Kinetic.Stage({
            container: 'container-render',
            width: layoutPageOrigin.width,
            height: layoutPageOrigin.height
        });

        layer = new Kinetic.Layer();
        stage.add(layer);

        elements = document.getElementsByClassName('upeles');
        lenght = elements.length;

        for (var i = 0; i < lenght; i++) {
            var child, childStyle, obj;
            postionOld = getXYTranslate(elements[i]);
            postionNew = elementOgirin.getPositionReal(postionOld[0], postionOld[1]);

            sizeNew = elementOgirin.getSizeReal(elements[i].offsetWidth, elements[i].offsetHeight);

            if (hasClass(elements[i], 'image')) {
                opacity = elements[i].style.opacity;
                opacity = opacity === '' ? 1 : opacity;
                child = elements[i].getElementsByTagName('img')[0];
                obj = writeImage(child, postionNew[0], postionNew[1], sizeNew[0], sizeNew[1], opacity);
            } else if (hasClass(elements[i], 'txt')) {
                var textAlign, content, uperCase, contentHasHTML;
                child = elements[i].getElementsByTagName('span')[0];
                childStyle = child.style;

                opacity = childStyle.opacity;
                opacity = opacity === '' ? 1 : opacity;

                fontSizeNew = elementOgirin.getFontSizeReal(childStyle.fontSize.replace('px', ''));
                textAlign = childStyle.textAlign;
                textAlign = textAlign === '' ? 'left' : textAlign;
                uperCase = childStyle.textTransform;

                contentHasHTML = child.innerHTML;
                content = cleanString(contentHasHTML);
                child.innerHTML = content;
                content = child.textContent;
                child.innerHTML = contentHasHTML;
                if (uperCase === 'uppercase') {
                    content = content.toUpperCase();
                }

                obj = writeText(content, fontSizeNew, childStyle.fontFamily, child.style.color, postionNew[0], postionNew[1], sizeNew[0], childStyle.lineHeight, textAlign, opacity);
            }

            layer.add(obj);
            layer.draw();
        }

        autoDownload = document.getElementById('auto-download');
        canvas = document.getElementById('container-render').getElementsByTagName('canvas')[0];
        autoDownload.href = 'data:application/octet-stream;base64,' + canvas.toDataURL().split('base64,')[1];
        if (typeRender === 'download') {
            autoDownload.click();
            $.ajax({
                url: site_url + "memupshare/",
                type: "POST",
                data: {data: canvas.toDataURL(), type: 'download', p: 17},
                error: function () {
                },
                dataType: "json",
                success: function (msg) {

                    if (msg.status == 1) {
                        //openRequestedPopup(msg.message);
                    } else {
                        alert('Plase, try agine');
                    }
                }
            });
        } else if (typeRender === 'share') {
            $.ajax({
                url: site_url + "memupshare/",
                type: "POST",
                data: {data: canvas.toDataURL(), type: 'share', p: 17},
                error: function () {
                },
                dataType: "json",
                success: function (msg) {

                    if (msg.status == 1) {
                        callbackShareSocialBox(typeSocial, msg.message);
                    } else {
                        alert('Plase, try agine');
                    }
                }
            });
        }
        function writeText(content, fontSize, font, color, x, y, width, lineHeight, textAlign, opacity) {
            return new Kinetic.Text({
                text: content,
                fontFamily: font,
                fontSize: fontSize,
                width: width,
                padding: 0,
                x: x,
                y: y,
                align: textAlign,
                lineHeight: lineHeight,
                fill: color,
                opacity: opacity
            });

        }

        function writeImage(image, xNew, yNew, width, height, opacity) {
            var obj = new Kinetic.Image({
                x: xNew,
                y: yNew,
                width: width,
                height: height,
                image: image,
                opacity: opacity
            });
            return obj;
        }
    }

    function renderImage1(typeRender, typeLayout) {

        removedi();
        var canvas, context, child, lenght, elements, layoutPageOrigin, layoutPage, elementOgirin, postionOld, postionNew, sizeOld, sizeNew, fontSizeNew, opacity;
        layoutPageOrigin = new LayoutPage(typeLayout);
        layoutPage = getPageShow();
        elementOgirin = new ElementOrigin(layoutPageOrigin, layoutPage);
        canvas = document.createElement('canvas');

        canvas.setAttribute('width', layoutPageOrigin.width)
        canvas.setAttribute('height', layoutPageOrigin.height)
        context = canvas.getContext('2d');

        elements = document.getElementsByClassName('upeles');
        lenght = elements.length;
        for (var i = 0; i < lenght; i++) {
            var child, childStyle;
            postionOld = getXYTranslate(elements[i]);
            postionNew = elementOgirin.getPositionReal(postionOld[0], postionOld[1]);

            sizeNew = elementOgirin.getSizeReal(elements[i].offsetWidth, elements[i].offsetHeight);
            opacity = elements[i].style.opacity;
            opacity = opacity === '' ? 1 : opacity;
            context.globalAlpha = opacity;
            if (hasClass(elements[i], 'image')) {

                child = elements[i].getElementsByTagName('img')[0];
                writeImage(child, postionNew[0], postionNew[1], sizeNew[0], sizeNew[1]);
            } else if (hasClass(elements[i], 'txt')) {
                var textAlign, content;
                child = elements[i].getElementsByTagName('span')[0];
                childStyle = child.style;
                fontSizeNew = elementOgirin.getFontSizeReal(childStyle.fontSize.replace('px', ''));
                textAlign = childStyle.textAlign;
                textAlign = textAlign === '' ? 'left' : textAlign;
                content = cleanString(child.innerHTML, '&nbsp;', '');
                writeText(content, fontSizeNew + 'px ' + childStyle.fontFamily, child.style.color, postionNew[0], postionNew[1], sizeNew[0], fontSizeNew * childStyle.lineHeight, textAlign);
            }

        }
        var autoDownload = document.getElementById('auto-download');
        autoDownload.href = 'data:application/octet-stream;base64,' + canvas.toDataURL().split('base64,')[1];
        if (typeRender === 'download')
            autoDownload.click();
        else if (typeRender === 'share') {
            $.ajax({
                url: site_url + "memupshare/",
                type: "POST",
                data: {data: canvas.toDataURL()},
                error: function () {
                },
                dataType: "json",
                success: function (msg) {

                    if (msg.status == 1) {
                        openRequestedPopup(msg.message);
                    } else {
                        alert('Plase, try agine');
                    }
                }
            });
        }
        function writeText(content, font, color, x, y, width, lineHeight, textAlign) {

            context.fillStyle = color;
            context.font = font;
            context.textBaseline = 'top';

            content.replace('&nbsp;<div>', '<br>');
            var row = content.split('<br>');
            for (var i = 0; i < row.length; i++) {
                var words = row[i].split(' ');
                var line = '';

                for (var n = 0; n < words.length; n++) {
                    var testLine = line + words[n] + ' ';
                    var metrics = context.measureText(testLine);
                    var testWidth = metrics.width;
                    if (testWidth > width && n > 0) {
                        context.fillText(line, x, y);
                        line = words[n] + ' ';
                        y += lineHeight;
                    }
                    else {
                        line = testLine;
                    }
                }
                context.textAlign = textAlign;
                context.fillText(line, getPostionByTextAlign(textAlign, x, width), y);
                y += lineHeight;
            }

        }

        function writeImage(image, xNew, yNew, width, height) {
            context.drawImage(image, xNew, yNew, width, height);
        }

        function getPostionByTextAlign(textAlign, xOld, width) {
            var xNew;
            if (textAlign === 'center') {
                xNew = xOld + width / 2;
            } else if (textAlign === 'right') {
                xNew = xOld + width;
            } else {
                xNew = xOld;
            }
            return xNew;
        }
    }

    function openRequestedPopup(link) {
        var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
        //window.open( 'http://' + link, "Some Post", strWindowFeatures);
        getUrlImage(link);

    }

    function getParameterGet(link) {
        return link.split('design/')[1];
    }

    function callbackShareSocialBox(typeSocial, linkShare) {
        var parameter = getParameterGet(linkShare);
        $.ajax({
            url: site_url + "share/your-design/",
            type: "GET",
            data: {f: parameter}
        });

        var b = document.getElementsByClassName('progress-bar')[0];
        var c = document.getElementsByClassName('share-social')[0];
        b.style.display = c.style.display = 'none';

        setEventShareLast(typeSocial, linkShare);

    }

    function setEventShareLast(typeSocial, linkShare) {
        var exportingStatus = setDisplaypProgressBar(true);
        exportingStatus.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            shareSocial(typeSocial, linkShare, 'Some Post', 'Your Post', '', 600, 500);
            this.onclick = null;
            closeSmenu();
        }
    }

    function getUrlImage(link) {

        link = link.split('/your-design/')[1];
        link = window.atob(link).split('&')[1];
        return link;
    }

    function shareSocial(typeSocial, url, title, descr, image, winWidth, winHeight) {

        var openUrl = getUrlShare(typeSocial, url, title, descr, image);
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        window.open(openUrl, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
        return false;
    }

    function getUrlShare(typeSocial, url, title, descr, image) {
        var urlShare, urlImg;
        switch (typeSocial) {
            case 'gshare' :
                urlShare = 'https://plus.google.com/share?url=' + url;
                break;
            case 'fbshare' :
                urlShare = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
                break;
            case 'twshare' :
                urlShare = 'http://twitter.com/share?url=' + url + '&text=' + title + ' by @uplevo';
                break;
            case 'lkshare' :
                urlShare = 'https://www.linkedin.com/shareArticle?mini=true&amp;url=' + url;
                break;
            case 'pshare' :
                urlImg = 'http://www.uplevo.com/share/images/your-design/some-post/' + getUrlImage(url);
                urlShare = 'https://pinterest.com/pin/create/button/?url=' + url + '&media=' + urlImg + '&description=' + title;
                break;
        }
        return urlShare;
    }

    function SizeElement(typeElement, typeLayout) {
        var sizeLayout = new LayoutPage(typeLayout);
        if (typeLayout === 'tall' || typeLayout === 'square') {
            if (typeElement === 'quotes-fix') {
                this.width = 614;
                this.height = 392;
            } else if (typeElement === 'quotes-edited') {
                this.width = sizeLayout.width * 0.85;
                this.height = sizeLayout.height * 0.5;
            } else if (typeElement === 'background') {
                this.width = sizeLayout.width;
                this.height = sizeLayout.height;
            }

        } else if (typeLayout === 'wide') {
            if (typeElement === 'quotes-fix') {
                this.width = 500;
                this.height = 392;
            } else if (typeElement === 'quotes-edited') {
                this.width = sizeLayout.width * 0.85;
                this.height = sizeLayout.height * 0.5;
            } else if (typeElement === 'background') {
                this.width = sizeLayout.width;
                this.height = sizeLayout.height;
            }
        }
    }

    function preSolutionString(preString) {
        return preString.replace(/\n/gi, '<br>');
    }

    function createDomPost(typePost, objQuote) {
        var newElement, newElementStyle;
        newElement = document.createElement('div');
        newElementStyle = newElement.style;
        if (typePost === 'quotes-fix') {
            newElement.className = 'upeles eles image';
            newElement.innerHTML = '<img dataid = ' + objQuote.dataid + ' draggable = "false" src= "' + site_url + 'images/some-post/download-fallback.png">';
        } else {
            newElement.className = 'upeles eles txt';
            newElement.innerHTML = '<span style ="text-align:' + objQuote.textAlign + '; line-height:' + objQuote.lineHeight + '; font-family:' + objQuote.fontFamily + '; ' +
                'color:' + objQuote.color + '; display: block; outline: none; transform-origin: left top 0px; ">' + objQuote.content + '</span>';
        }
        return newElement;
    }

    function ElementPage(widthPage, heightPage) {
        var pageEdit;
        pageEdit = document.getElementById('pageedit');
        this.widthPage = widthPage;
        this.heightPage = heightPage;

        this.createElement = function (typeElement, objQuote) {
            var sizeBoxElement = [], solutionLayoutShow, layoutPage, newElement, newElementStyle, sizeElement, position, sizeText,
                fontSizeText, sizeElementPattern, typeLayout;

            typeLayout = getTypeLayout();
            layoutPage = new LayoutPage(typeLayout);
            solutionLayoutShow = new SolutionLayoutShow(layoutPage);
            solutionLayoutShow.setSizeShow();

            sizeElementPattern = new SizeElement(typeElement, typeLayout);

            this.width = sizeElementPattern.width * solutionLayoutShow.scale;
            this.height = sizeElementPattern.height * solutionLayoutShow.scale;


            if (typeElement === 'logo' || typeElement === 'quotes-fix') {
                var src = site_url + 'img/designbox/';

                newElement = createDomPost(typeElement, objQuote);
                pageEdit.appendChild(newElement);
                newElementStyle = newElement.style;

                newElementStyle.width = this.width + 'px';
                newElementStyle.height = this.height + 'px';
                sizeBoxElement = [this.width, this.height];
                src += objQuote.content;
                getDownloadImg(newElement, src);

            } else if (typeElement === 'quotes-edited') {
                var contentSolution = preSolutionString(objQuote.content);
                sizeBoxElement = getSizeTextByContent(contentSolution, 16, 'Roboto Thin');
                objQuote.content = contentSolution;
                newElement = createDomPost(typeElement, objQuote);
                pageEdit.appendChild(newElement);
                newElementStyle = newElement.style;
            }

            sizeElement = new FitSize(sizeBoxElement[0], sizeBoxElement[1], this.width, this.height);

            if (typeElement === 'quotes-edited') {
                var fontSizeNew = getFontSizeTextElement(sizeBoxElement[0], sizeBoxElement[1], sizeElement.widthOutput, sizeElement.heightOutput);
                var maxFontSize, mixFontSize;

                if (typeLayout === 'wide') {
                    if (this.heightPage <= 150) {
                        maxFontSize = 40;
                        mixFontSize = 10;
                    } else if (this.heightPage > 150 && this.heightPage <= 300) {
                        maxFontSize = 60;
                        mixFontSize = 20;
                    } else if (this.heightPage > 300 && this.heightPage <= 420) {
                        maxFontSize = 60;
                        mixFontSize = 25;
                    } else {
                        maxFontSize = 80;
                        mixFontSize = 35;
                    }
                } else {
                    if (this.heightPage <= 150) {
                        maxFontSize = 40;
                        mixFontSize = 10;
                    } else if (this.heightPage > 150 && this.heightPage <= 300) {
                        maxFontSize = 60;
                        mixFontSize = 15;
                    } else if (this.heightPage > 300 && this.heightPage <= 420) {
                        maxFontSize = 60;
                        mixFontSize = 20;
                    } else {
                        maxFontSize = 80;
                        mixFontSize = 25;
                    }
                }
                fontSizeNew = fontSizeNew < mixFontSize ? mixFontSize : fontSizeNew > maxFontSize ? maxFontSize : fontSizeNew;
                newElement.getElementsByTagName('span')[0].style.fontSize = fontSizeNew + 'px';
                sizeBoxElement = getSizeTextByContent(objQuote.content, fontSizeNew, 'Roboto Thin');
                sizeElement = new FitSize(sizeBoxElement[0], sizeBoxElement[1], this.width, this.height);
            }

            position = new PositionElementOnPage(solutionLayoutShow.widthShow, solutionLayoutShow.heightShow);

            sizeElement.widthOutput = roundFloat(sizeElement.widthOutput, 2);
            sizeElement.heightOutput = roundFloat(sizeElement.heightOutput, 2);

            if (typeElement === 'quotes-edited') {

                newElementStyle.width = sizeElement.widthOutput + 'px';
                newElementStyle.height = newElement.getElementsByTagName('span')[0].offsetHeight + 'px';
                position.setCenter(sizeElement.widthOutput, newElement.getElementsByTagName('span')[0].offsetHeight);

            } else {

                newElementStyle.width = sizeElement.widthOutput + 'px';
                newElementStyle.height = sizeElement.heightOutput + 'px';
                position.setCenter(sizeElement.widthOutput, sizeElement.heightOutput);
            }

            setTranForm(newElement, 'translate3d(' + roundFloat(position.getX(), 2) + 'px, ' + roundFloat(position.getY(), 2) + 'px, 0px) rotateZ(0deg)');

            if (typeElement === 'quotes-edited') {
                newElement.id = 'textquotes';
                setEventDragDrop(newElement);
            } else if (typeElement === 'quotes-fix') {
                newElement.id = 'textquotes';
                setDragElement(newElement);
            }
            if (typeElement === 'logo') {
                newElement.id = 'logo';
                setDragElement(newElement);
            }
        }
    }

    function getDownloadImg(elementChange, srcImg) {
        var image, downloadingImage;
        image = new Image()
        downloadingImage = new Image();
        downloadingImage.src = srcImg;
        downloadingImage.onload = loadedImage;
        function loadedImage() {
            image.src = this.src;
            changeImage(image);
        };
        function changeImage(image) {
            var imgElementChange, width, height, dataid, sizeElement, typeLayout, sizeElementPattern, solutionLayoutShow, layoutPage, positionElement;
            imgElementChange = elementChange.getElementsByTagName('img')[0];
            width = elementChange.offsetWidth;
            height = elementChange.offsetHeight;

            typeLayout = getTypeLayout();
            layoutPage = new LayoutPage(typeLayout);

            solutionLayoutShow = new SolutionLayoutShow(layoutPage);
            solutionLayoutShow.setSizeShow();
            sizeElementPattern = new SizeElement('quotes-fix', typeLayout);

            this.width = sizeElementPattern.width * solutionLayoutShow.scale;
            this.height = sizeElementPattern.height * solutionLayoutShow.scale;

            positionElement = new PositionElementOnPage(solutionLayoutShow.widthShow, solutionLayoutShow.heightShow);

            sizeElement = new FitSize(image.width, image.height, this.width, this.height);
            sizeElement.widthOutput = roundFloat(sizeElement.widthOutput, 0);
            sizeElement.heightOutput = roundFloat(sizeElement.heightOutput, 0);
            positionElement.setCenter(sizeElement.widthOutput, sizeElement.heightOutput);
            setTranForm(elementChange, 'translate3d(' + roundFloat(positionElement.getX(), 0) + 'px, ' + roundFloat(positionElement.getY(), 0) + 'px, 0px) rotateZ(0deg)');

            elementChange.style.width = image.style.width = sizeElement.widthOutput + 'px';
            elementChange.style.height = image.style.height = sizeElement.heightOutput + 'px';
            elementChange.replaceChild(image, imgElementChange);
            elementChangeClone = elementChange.cloneNode(true);
            elementChange.parentNode.replaceChild(elementChangeClone, elementChange);
            setDragElement(elementChangeClone);
        }
    }

    function sulutionBackgound(elementImgThumb) {
        var imgClone, imgChange, elementBackgound, srcImg;
        imgClone = elementImgThumb.cloneNode(true);
        srcImg = imgClone.getAttribute('dataimg');
        elementBackgound = document.getElementById('pageeditimg');
        if (elementBackgound == null)
            return;
        imgChange = elementBackgound.getElementsByTagName('img')[0];
        if (elementBackgound == null)
            return;
        elementBackgound.replaceChild(imgClone, imgChange);
        asynchronousGetImg(elementBackgound, srcImg)
        function asynchronousGetImg(elementChange, srcImg) {
            var image, downloadingImage;
            image = new Image()
            downloadingImage = new Image();
            downloadingImage.src = srcImg;
            downloadingImage.onload = loadedImage;
            function loadedImage() {
                image.src = this.src;
                changeImage(image);
            };
            function changeImage(image) {
                var imgElementChange, width, height, dataid, typeLayout, sizePhotoBackground, solutionLayoutShow, layoutPage;
                imgElementChange = elementChange.getElementsByTagName('img')[0];
                width = image.width;
                height = image.height;

                typeLayout = getTypeLayout();
                layoutPage = new LayoutPage(typeLayout);

                solutionLayoutShow = new SolutionLayoutShow(layoutPage);
                solutionLayoutShow.setSizeShow();
                sizePhotoBackground = new SizePhotoInFrame(width, height, solutionLayoutShow.widthShow, solutionLayoutShow.heightShow);

                setTranForm(elementChange, 'translate3d(' + sizePhotoBackground.x + 'px, ' + sizePhotoBackground.y + 'px, 0px) rotateZ(0deg)');

                elementChange.style.width = image.style.width = sizePhotoBackground.widthFrame + 'px';
                elementChange.style.height = image.style.height = sizePhotoBackground.heightFrame + 'px';
                elementChange.replaceChild(image, imgElementChange);
            }
        }
    }

    (function () {
        var category = document.getElementsByClassName('categoryul')[0];
        var list = category.getElementsByTagName('li');
        setActiveDefautCategory(0);
        function setActiveDefautCategory(key) {
            var i = list[key].getElementsByTagName('i')[0];
            i.className = 'active';
        }

        $(document).ready(setDefauleQuotes);
        function setDefauleQuotes() {
            setEffectBlurMode(true);
            nextQuote();
        }
    })();

    function PoolQuotes() {
        var pool = [];
        this.pointer = -1;
        function add(quotes) {
            pool.push(quotes);
            this.lengthQuotes = pool.length;
            return true;
        }

        function get(key) {
            this.pointer = isNaN(key) ? 0 : key < 0 ? 0 : key > ( this.lengthQuotes - 1 ) ? 0 : key;
            return pool[this.pointer];
        }

        function update(key, quotes) {
            pool[key] = quotes;
            return pool[key];
        }

        var exports = {
            add: add,
            get: get,
            update: update
        }
        return exports;
    }

    function SomeQuote(type, content, category, dataid) {
        this.type = type;
        this.content = content;
        this.category = category;
        this.dataid = dataid;
        if (type === 'quotes-edited') {
            this.fontSize = 35;
            this.lineHeight = 1.1;
            this.letterSpacing = 0;
            this.color = 'rgb(255,255,255)';
            this.textAlign = 'center';
            this.fontFamily = 'Roboto Thin';
            this.letterSpacing = 0;
        }
        this.opacity = 1;
        this.width = 80;
        this.height = 30;

    }

    function getBrowserCurrent() {
        var userAgent = navigator.userAgent.toLowerCase();

        function setTranForm(els, val) {
            var isSafari = false;
            if (userAgent.indexOf('safari') != -1) {
                if (userAgent.indexOf('chrome') > -1) {
                    isSafari = false;
                } else {
                    isSafari = true;
                }
            }
            if (isSafari) {
                els.style.WebkitTransform = val;
            } else {
                els.style.transform = val;
            }
        }

        return setTranForm;
    }

    function positionXYTranslate() {
        var userAgent = navigator.userAgent.toLowerCase();

        function getXYTranslate(cont) {
            var isSafari, st0, tr, values, radians, angle;
            isSafari = false;
            if (userAgent.indexOf('safari') != -1) {
                if (userAgent.indexOf('chrome') > -1) {
                    isSafari = false;
                } else {
                    isSafari = true;
                }
            }
            st0 = window.getComputedStyle(cont, null);

            if (isSafari) {
                if (!st0.getPropertyValue("-webkit-transform")) return [0, 0, 0];
                if (st0.getPropertyValue("-webkit-transform") == "none") return [0, 0, 0];
                tr = st0.getPropertyValue("-webkit-transform");
            } else {
                if (!st0.getPropertyValue("transform")) return [0, 0, 0];
                if (st0.getPropertyValue("transform") == "none") return [0, 0, 0];
                tr = st0.getPropertyValue("transform");
            }
            values = tr.split('(')[1];
            values = values.split(')')[0];
            values = values.split(',');

            radians = Math.atan2(values[1], values[0]);
            if (radians < 0) {
                radians += (2 * Math.PI);
            }
            angle = Math.round(radians * (180 / Math.PI));
            return [parseFloat(values[4]), parseFloat(values[5]), angle, parseFloat(values[0]), parseFloat(values[3])];
        }

        return getXYTranslate;
    }

    function setDragElement(element) {
        if (typeof element !== 'undefined')
            anbdrap('ac12', element);
    }

    function checkEventType(event) {
        return event.type.toLowerCase() == 'touchstart' ? true : false;
    }

    function anbdrap(idb, cont) {
        if (cont) {
            var mama = document.getElementById(idb);
            cont.addEventListener('mousedown', initDrag, false);
            cont.addEventListener('touchstart', initDrag, false);
        }

        function initDrag(e) {
            e.preventDefault();
            var frameViewBox, ratioFrame, fholder1, widthIndivfimg, heightIndivfimg, positionIndivImg, widthFrame, heightFrame,
                isGeles, eMenu, startWidth, startHeight, isTouch, pageEdit, wPageEdit, hPageEdit, x, y, eSelected, xNew, yNew, positionOld, getNewPostion, positionNew = [], typeElement;
            isTouch = checkEventType(e);

            eMenu = document.getElementById('menu1');
            if (eMenu !== null && cont.id === 'indivfimg') {
                setMenuPosition('', cont, eMenu, 'off');
            }
            startWidth = cont.offsetWidth;
            startHeight = cont.offsetHeight;

            eSelected = document.getElementsByClassName('selected')[0];
            positionOld = getXYTranslate(cont);
            if (typeof eSelected === 'undefined') {
                typeElement = 'undefined'
            } else {
                typeElement = eSelected.getElementsByClassName('gieles');
                typeElement = typeElement.length > 0 ? 'group' : 'alone';
            }

            pageEdit = document.getElementById('pageedit');
            wPageEdit = pageEdit.offsetWidth;
            hPageEdit = pageEdit.offsetHeight;

            if (e.target.id != 'indiv' && cont.id != 'indivfimg') {
                removedi();
            }

            document.addEventListener('mousemove', doDrag, false);
            document.addEventListener('touchmove', doDrag, false);
            document.addEventListener('mouseup', stopDrag, false);
            document.addEventListener('touchend', stopDrag, false);

            function doDrag(e) {
                e.preventDefault();

                if (eMenu !== null) {
                    setMenuPosition('', cont, eMenu, 'off');
                }

                if (typeof x === 'undefined') {

                    if (isTouch === true) {

                        x = e.touches[0].pageX;
                        y = e.touches[0].pageY;

                    } else {

                        x = e.pageX;
                        y = e.pageY;
                    }

                    getNewPostion = newPosition(x, y, positionOld[0], positionOld[1]);

                }

                if (isTouch) {

                    xNew = e.touches[0].pageX
                    yNew = e.touches[0].pageY
                } else {
                    xNew = e.pageX
                    yNew = e.pageY
                }

                positionNew = getNewPostion(xNew, yNew);

                if (positionNew['x'] < 8 && positionNew['x'] >= 0) positionNew['x'] = 0;
                if (positionNew['y'] < 8 && positionNew['y'] >= 0) positionNew['y'] = 0;
                if (positionNew['x'] > wPageEdit - startWidth - 8 && positionNew['x'] < wPageEdit - startWidth) positionNew['x'] = wPageEdit - startWidth;
                if (positionNew['y'] > hPageEdit - startHeight - 8 && positionNew['y'] < hPageEdit - startHeight) positionNew['y'] = hPageEdit - startHeight;


                if (cont.id === 'indivfimg') {


                    if (typeof eSelected !== 'undefined') {

                        if (typeof widthFrame === 'undefined') {

                            widthFrame = eSelected.clientWidth;
                            heightFrame = eSelected.clientHeight;

                            frameViewBox = eSelected.getElementsByTagName('svg')[0].getAttribute('viewBox');
                            frameViewBox = (frameViewBox.trim()).split(' ');
                            ratioFrame = widthFrame / parseFloat(frameViewBox[2]);

                            fholder1 = eSelected.getElementsByClassName("fholder")[0];

                            if (typeof fholder1 !== 'undefined')
                                isGeles = hasClass(eSelected.parentNode, 'geles');
                        }

                        if (isGeles !== null) {

                            widthIndivfimg = cont.clientWidth;
                            heightIndivfimg = cont.clientHeight;


                            positionNew['x'] = positionNew['x'] > 0 ? positionNew['x'] = 0 : (  positionNew['x'] + widthIndivfimg) < widthFrame ? ( widthFrame - widthIndivfimg) : positionNew['x'];
                            positionNew['y'] = positionNew['y'] > 0 ? positionNew['y'] = 0 : (  positionNew['y'] + heightIndivfimg) < heightFrame ? ( heightFrame - heightIndivfimg) : positionNew['y'];

                            positionIndivImg = getXYTranslate(cont);
                            fholder1.setAttribute('x', positionIndivImg[0] / ratioFrame);
                            fholder1.setAttribute('y', positionIndivImg[1] / ratioFrame);
                            setTranForm(cont, 'translate3d(' + positionNew['x'] + 'px, ' + positionNew['y'] + 'px, 0px)' + 'rotateZ(' + positionOld[2] + 'deg)');
                        }

                    }
                }

                if (!hasClass(document.getElementById('pageedit').getElementsByClassName("selected")[0], "gieles")) {

                    setTranForm(cont, 'translate3d(' + positionNew['x'] + 'px, ' + positionNew['y'] + 'px, 0px)' + 'rotateZ(' + positionOld[2] + 'deg)');
                    eSelected = document.getElementById('pageedit').getElementsByClassName("selected")[0];
                    if (typeof eSelected !== 'undefined')
                        setTranForm(eSelected, 'translate3d(' + positionNew['x'] + 'px, ' + positionNew['y'] + 'px, 0px)' + 'rotateZ(' + positionOld[2] + 'deg)');
                }
            }

            function stopDrag(e) {

                if (eMenu !== null && cont.id !== 'indivfimg') {
                    setMenuPosition('', cont, eMenu, 'on');
                }

                document.removeEventListener('mousemove', doDrag, false);
                document.removeEventListener('touchmove', doDrag, false);
                document.removeEventListener('mouseup', stopDrag, false);
                document.removeEventListener('touchend', stopDrag, false);

            }
        }

        function newPosition(xOld, yOld, xPositionOld, yPositionOld) {
            var positionNew = [];
            var getNewPosition = function (xNew, yNew) {
                positionNew['x'] = xPositionOld + xNew - xOld;
                positionNew['y'] = yPositionOld + yNew - yOld;
                return positionNew;
            }
            return getNewPosition;
        }
    }

    function anb(ida, idb, idc) {
        var p = document.getElementById(ida);
        var mama = document.getElementById(idb);
        var cont = document.getElementById(idc);
        p.addEventListener('mousedown', initDrag, false);
        p.addEventListener("touchstart", initDrag, false);


        function initDrag(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.stopPropagation();

            var getWidthNew, widthOld, heightOld, x, y, widthNew, heightNew, ratio, scaleRate, scale, ratioScale, isTouch, freeSize, typeFreeSize, type,
                typePosition, eIndiv, childIndiv, childIndivStyle, eSelected, eSelectedStyle, childSelected, nChildSelected, eOver2, eMenu, typeIdentity, sin, cos,
                newDiv, newDivStyle, contStyle, spanChild, positionSpan, fontChanged, fontSizeOld, position, infoChildGeles, positionNew, getPositionNew;

            typeFreeSize = '';
            infoChildGeles = [];
            isTouch = false;
            freeSize = 0;


            if (e.type.toLowerCase() === 'touchstart') {
                isTouch = true;
            }

            widthOld = cont.offsetWidth;
            heightOld = cont.offsetHeight;

            ratio = widthOld / heightOld;
            scale = 1;
            eOver2 = document.getElementById('over2');
            eSelected = document.getElementById('pageedit').getElementsByClassName('selected')[0];
            eSelectedStyle = eSelected.style;
            eIndiv = document.getElementById('indiv');
            if (typeof eSelected === 'undefined' || typeof eIndiv === 'undefined') {
                return;
            }

            type = hasClass(eIndiv, 'txt') ? 'txt' : hasClass(eIndiv, 'geles') ? 'geles' : hasClass(eIndiv, 'image') ? 'image' : 'svg';

            childIndiv = eIndiv.getElementsByTagName('span')[0];
            if (typeof childIndiv !== 'undefined')
                childIndivStyle = childIndiv.style;

            if (type === 'txt') {
                var textSolution = new SolutionTextInput(cont);
                fontSizeOld = ( cont.getElementsByTagName('span')[0].style.fontSize).replace('px', '').replace('em', '');

            } else if (type === 'geles') {
                childSelected = eSelected.getElementsByClassName('gieles');
                nChildSelected = childSelected.length;
                var a = childSelected[0].getElementsByTagName('svg')[0];
                var bBox = a.getBoundingClientRect();

                // set save info child group, child[0] is svg parent
                for (var u = 1; u < nChildSelected; u++) {
                    infoChildGeles[u] = [];
                    spanChild = childSelected[u].getElementsByTagName('span')[0];
                    if (typeof spanChild !== 'undefined') {
                        positionSpan = getXYTranslate(childSelected[u]);
                        infoChildGeles[u]['spanFontSize'] = spanChild.style.fontSize.replace('%', '');
                        infoChildGeles[u]['spanWidth'] = spanChild.offsetWidth;
                        infoChildGeles[u]['spanHeight'] = spanChild.offsetHeight;
                        infoChildGeles[u]['spanX'] = positionSpan[0];
                        infoChildGeles[u]['spanY'] = positionSpan[1];
                        infoChildGeles[u]['spanAgle'] = positionSpan[2];
                    }
                    infoChildGeles[u]['width'] = childSelected[u].offsetWidth;
                    infoChildGeles[u]['height'] = childSelected[u].offsetHeight;

                }
            }

            position = getXYTranslate(eSelected);
            freeSize = eSelected.getAttribute('freesize');
            typeFreeSize = eSelected.getAttribute('typefreesize');

            newDiv = document.createElement('div');
            newDiv.className = 'virtual';

            eOver2.insertBefore(newDiv, cont);
            newDiv.appendChild(cont);

            contStyle = cont.style;

            newDivStyle = newDiv.style;
            newDivStyle.cssText = contStyle.cssText;
            //contStyle.transform = 'initial';
            setTranForm(cont, 'initial');
            eMenu = document.getElementById('menu1');

            document.addEventListener('mousemove', doDrag, false);
            document.addEventListener('mouseup', stopDrag, false);
            p.addEventListener('mouseup', stopDrag, false);

            document.addEventListener('touchmove', doDrag, false);
            document.addEventListener('touchend', stopDrag, false);
            p.addEventListener('touchend', stopDrag, false);
            getWidthNew = getWidthChange(position[2], widthOld);
            getPositionNew = getNewCoordinatesByRotate(position[0], position[1], widthOld, heightOld, position[2]);
            function doDrag(e) {

                if (eMenu !== null) {
                    setMenuPosition('', cont, eMenu, 'off');
                }

                if (typeof x === 'undefined') {

                    if (isTouch === true) {

                        e.preventDefault();
                        x = e.touches[0].pageX;
                        y = e.touches[0].pageY;

                    } else {

                        x = e.pageX;
                        y = e.pageY;
                    }

                }

                widthNew = getWidthNew(e.pageX, e.pageY, x, y);
                heightNew = widthNew / ratio;
                scaleRate = widthNew / widthOld;

                if (ida === 'a6') {
                    if (widthNew < 0) widthNew = 0;

                    if (type === 'txt') {
                        textSolution.setWidthHeightScaleBox();
                        heightNew = cont.offsetHeight;
                        childIndivStyle.width = ( widthNew / scale ) + 'px';
                    } else {
                        if (freeSize === 1) {
                            if (typeFreeSize === 'rect') {
                                freesizeSVGrect(heightNew, 0);
                            }
                            if (typeFreeSize === 'ellipse') {
                                freesizeSVGellipse(heightNew, 0);
                            }
                        }
                    }
                }

                if (ida === 'a4') {

                    if (widthNew < 10) return;
                    if (widthNew < 0) widthNew = 0;

                    if (freeSize == 1) {
                        if (typeFreeSize == 'rect') {
                            freesizeSVGrect(widthNew, 0);
                        }
                        if (typeFreeSize == 'ellipse') {
                            freesizeSVGellipse(widthNew, 0);
                        }
                    }

                    contStyle.width = widthNew + 'px';
                    contStyle.height = ( widthNew / ratio ) + 'px';
                    ratioScale = widthNew / widthOld;

                    if (type === 'txt') {

                        fontChanged = (fontSizeOld * scaleRate);
                        fontChanged = fontChanged < 0.5 ? 0.5 : fontChanged;
                        childIndivStyle.fontSize = fontChanged + 'em';
                        childIndivStyle.width = widthNew + 'px';
                        textSolution.setWidthHeightScaleBox();

                    } else if (type === 'geles') {

                        for (var u = 0; u < nChildSelected; u++) {
                            var positionChild, spanChild, positionSpan;
                            if (u === 0 && hasClass(childSelected[u], 'item')) {
                                childSelected[u].style.width = contStyle.width;
                                childSelected[u].style.height = contStyle.height;
                            } else {
                                childSelected[u].style.width = (ratioScale * infoChildGeles[u]['width']) + 'px';
                                childSelected[u].style.height = (ratioScale * infoChildGeles[u]['height']) + 'px';

                                spanChild = childSelected[u].getElementsByTagName('span')[0];
                                if (typeof spanChild !== 'undefined') {

                                    spanChild.style.fontSize = ( ratioScale * infoChildGeles[u]['spanFontSize'] ) + '%';
                                    spanChild.style.width = ( ratioScale * infoChildGeles[u]['spanWidth'] ) + 'px';
                                    spanChild.style.height = ( ratioScale * infoChildGeles[u]['spanHeight'] ) + 'px';
                                }

                                setTranForm(childSelected[u], 'translate3d(' + ( ratioScale * infoChildGeles[u]['spanX'] ) + 'px, ' +
                                    ( ratioScale * infoChildGeles[u]['spanY'] ) + 'px, 0px) rotateZ(' + infoChildGeles[u]['spanAgle'] + 'deg)');
                            }
                        }

                    }


                    if (type === 'svg' || type === 'geles') {
                        typePosition = ratioScale > 1 ? ( heightNew < 20 ? 'absolute' : 'static') : (widthNew < 20 ? 'absolute' : 'static');
                        eSelected.getElementsByTagName('svg')[0].style.position = typePosition;
                    }

                }

                if (type !== 'gieles') {

                    positionNew = getPositionNew(widthNew, heightNew);
                    setTranForm(eSelected, 'translate3d(' + positionNew[0] + 'px, '
                        + positionNew[1] + 'px, 0px) rotateZ(' + position[2] + 'deg)');
                }

                eSelectedStyle.width = contStyle.width;
                eSelectedStyle.height = contStyle.height;

            }

            function stopDrag(e) {
                var eSelectedPosition;
                if (type === 'txt') {
                    textSolution.setLimitWidthBox();
                }

                if (typeof newDiv !== 'undefined') {
                    eSelectedPosition = getXYTranslate(eSelected);
                    setTranForm(cont, 'translate3d(' + eSelectedPosition[0] + 'px, '
                        + eSelectedPosition[1] + 'px, 0px) rotateZ(' + eSelectedPosition[2] + 'deg)');
                    if (newDiv.parentNode !== null) {
                        eOver2.appendChild(cont);
                        eOver2.removeChild(newDiv);
                    }
                }

                if (eMenu !== null) {
                    setMenuPosition('', cont, eMenu, 'on');
                }
                document.removeEventListener('mousemove', doDrag, false);
                document.removeEventListener('mouseup', stopDrag, false);
                p.removeEventListener('mousemove', doDrag, false);
                p.removeEventListener('mousedown', doDrag, false);

                document.removeEventListener('touchmove', doDrag, false);
                document.removeEventListener('touchend', stopDrag, false);
                p.removeEventListener('touchmove', doDrag, false);
                p.removeEventListener('touchend', doDrag, false);
            }
        }
    }

    function movediv(trans, wh, ta) {

        function setPositionDi1() {
            var eSelectParentPosition, eDi1Transform, eDi1TransformTop, eDi1TransformLeft, eSelectedPosition;
            eSelectedPosition = getXYTranslate(eSelected);
            eSelectParentPosition = getXYTranslate(eSelected.parentNode);

            if (typeElement === 'gieles') {
                eDi1TransformLeft = eSelectParentPosition[0] + eSelectedPosition[0];
                eDi1TransformTop = eSelectParentPosition[1] + eSelectedPosition[1];

            } else {

                eDi1TransformLeft = eSelectedPosition[0] - 1;
                eDi1TransformTop = eSelectedPosition[1] - 1;

            }

            eDi1Transform = 'translate3d(' + eDi1TransformLeft +
                'px,' + eDi1TransformTop + 'px, 0px) rotateZ(' + eSelectedPosition[2] + 'deg)';
            setTranForm(eDi1, eDi1Transform);
        }

        function createMenu() {
            eDi1.innerHTML += positionOver.mButtonOneDrag;
            eDi1Style = eDi1.style;

            eDi1Style.width = eSelectedStyle.width;
            eDi1Style.height = eSelectedStyle.height;

            typeElement = hasClass(eSelected, 'gieles') ? 'gieles' : hasClass(eSelected, 'txt') ? 'txt' : hasClass(eSelected, 'geles') ? 'geles' : hasClass(eSelected, 'image') ? 'image' : 'svg';
            eColorChain = '';
            for (var i = 0; i < positionOver.mColor.length; i++) {
                eColorChain += '<li><div class="colorcustomize" style="background:' + positionOver.mColor[i] + ';" acolor="' + positionOver.mColor[i] + '"></div></li>'
            }
            if (ta === 0) {


            } else if (ta === 2) { //----------text-----
                eIndiv.className += ' txt cloneText';
                eIndiv.innerHTML = eSelected.innerHTML;
                eMenu.className = 'menutxt';
                eSelectedStyle.opacity = 0;
                if (hasClass(eSelected, 'gieles')) {
                    eIndiv.style.fontSize = eSelectedStyle.fontSize;
                }
                eMenu.innerHTML = positionOver.mText.replace('#colorchain#', eColorChain);

            } else if (ta === 3) { //----svg-------------


            } else if (ta === 4) { //----geles-------------

            }
            eDi1.insertBefore(eIndiv, eDi1.firstChild);
            eOver2.appendChild(eDi1);
            eOver.appendChild(eMenu);
        }

        function setEventElementOnPageEdit() {
            menucontroldrag('ac12', eMenu);
            if (ta === 0) {


            } else if (ta === 2) {

                var textSolution;

                if (eSelected.style.textAlign !== '') {
                    eDi1Style.textAlign = eSelectedStyle.textAlign;
                }

                textSolution = new SolutionTextInput(eDi1);
                textSolution.setEventTextInput();

                sliderElement = new setEventSliderInput();
                sliderElement.setTextSolution(textSolution);
                sliderElement.setSliderInput('fontresize', 'span');

                sliderElement = new setEventSliderInput();
                sliderElement.setTextSolution(textSolution);
                sliderElement.setSliderInput('fontrespace', 'span');

                sliderElement = new setEventSliderInput();
                sliderElement.setTextSolution(textSolution);
                sliderElement.setSliderInput('fontrelineheight', 'span');

                sliderElement = new setEventSliderInput();
                sliderElement.setTextSolution(textSolution);
                sliderElement.setSliderInput('opacityresizemama', 'span');

                addfont();
                setEventColor('txt');

                document.getElementById('a6').style.display = 'block';
                $("#chofontfamily3hov").customScrollbar({hScroll: false});
                document.getElementById("chofontfamily3").style.display = "none";
                $("#chocolor3hov").customScrollbar({hScroll: false});
                document.getElementById("chocolor3").style.display = "none";

            } else if (ta === 3) {


            }
            if (ta !== 2) {
                jumptobound();
                setEventKeyDownElement();
            }
            //menumorechk();
            initloadresize();
        }

        var pageDesign, pageDesignTop, pageDesignLeft, rectPageDesign, pageEdit, sliderElement, typeElement,
            eSelected, eSelectedStyle, eSelectedZindex, eSelectedWidth, eSelectedHeight,
            eColorChain, eOver2, over2Style, contextCanvas, eImgEdit, canvaIndiv, imageFrame, eIndiv, eDi1, eDi1Style, eMenu, eOver;

        eIndiv = positionOver.getEleIndiv().cloneNode(true);
        eDi1 = positionOver.getEleBorder().cloneNode(true);
        eMenu = positionOver.getEleMenu().cloneNode(true);
        eOver = positionOver.getEleOver();
        eOver2 = document.getElementById('over2');
        over2Style = eOver2.style;

        pageEdit = document.getElementById('pageedit');
        pageDesign = document.getElementsByClassName('uplevoDesign')[0];
        rectPageDesign = pageDesign.getBoundingClientRect();

        eSelected = pageEdit.getElementsByClassName("selected")[0];
        eSelectedStyle = eSelected.style;
        eSelectedZindex = eSelectedStyle.zIndex;
        eSelectedWidth = eSelected.offsetWidth;
        eSelectedHeight = eSelected.offsetHeight;
        createMenu();
        setPositionDi1();
        setMenuPosition(typeElement, eSelected, eMenu, 'on');
        setEventElementOnPageEdit();
    }

    function setEventDragDrop(element) {
        setEventElement(element);
        setDragElement(element);
    }

    function setEleSelect(div) {
        if (!hasClass(div, "selected")) {
            var evObj = document.createEvent('MouseEvents');
            evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
            div.dispatchEvent(evObj);
        }
    }

    function setEventElement(element) {
        var eventMoustArr = [], gieles;
        if (hasClass(element, 'eles')) {
            eventMoustArr[0] = 'click';
            eventMoustArr[1] = 'touchstart';
            gieles = element.getElementsByClassName('gieles')[0];
            if (typeof gieles !== 'undefined') {
                eventMoustArr[1] = 'dblclick';
            }
            setEventMouse(element, eventMoustArr);
        }
    }

    function setEventMouse(eles1, click) {
        var i, j, elementChilds, nElementChilds, singleClickTimer, frameElement, clickCount = 0, timer = 2;

        for (i = 0; i < click.length; i++) {
            if (click[i] === 'click' || click[i] === 'touchstart') {
                eles1.addEventListener(click[i], setEventClicksElement, false);
            }
        }
        function setEventClicksElement(e) {
            clickCount++;
            seft = this;
            if (clickCount === 1) {
                singleClickTimer = setTimeout(function () {
                    clickCount = 0;
                    setEventClickElement(seft);
                }, timer);
            } else if (clickCount === 2) {
                clearTimeout(singleClickTimer);
                clickCount = 0;
            }

        }

        function setEventClickElement(e) {
            removedi();
            var elementPosition, position
            elementPosition = getXYTranslate(e);
            position = [elementPosition[0], elementPosition[1], elementPosition[2]];
            e.className += ' selected';
            if (hasClass(e, 'image')) {

                movediv(position, [3, 5], 0);
                document.getElementById("indiv").className += ' image';
                setSliderInputImage('image');

            } else if (hasClass(e, 'txt')) {
                e.style.transition = '';
                movediv(position, [3, 5], 2);
                setSliderInput(e);
                setOnText(e);
            }

        }

        function callCaretText(elementText) {
            var spanChild = elementText.getElementsByTagName("span")[0];
            spanChild.style.height = '';
            spanChild.style.weight = '';
            if (spanChild.innerHTML === '+ Text') {
                selectText(spanChild);
            } else {
                var countChild = spanChild.childNodes.length - 1;
                setCaret(spanChild, countChild, spanChild.childNodes[countChild].length);
            }
        }

        function setOnText(elementText) {
            var eIndiv, spanIndiv;
            eIndiv = document.getElementById('indiv');
            spanIndiv = eIndiv.getElementsByTagName('span')[0];
            spanIndiv.setAttribute("contenteditable", "true");
            callCaretText(eIndiv);
        }

        function selectText(element) {
            var document = document, range, selection;
            if (doc.body.createTextRange) {
                range = document.body.createTextRange();
                range.moveToElementText(element);
                range.select();
            } else if (window.getSelection) {
                selection = window.getSelection();
                range = document.createRange();
                range.selectNodeContents(element);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }

        function setCaret(element, nNode, offSetText) {
            var range = document.createRange();
            var selection = window.getSelection();
            range.setStart(element.childNodes[nNode], offSetText);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            element.focus();
        }

        function setSliderInput(element) {
            var opacityElement, lineHeightElement, spacingElement, spanIndiv, spanIndivStyle, fontSizeElement, xFontSize, xLineHeight, xSpacing, xOpacity;
            spanIndiv = document.getElementById("indiv").getElementsByTagName("span")[0];
            spanIndivStyle = spanIndiv.style;

            lineHeightElement = spanIndivStyle.lineHeight;
            spacingElement = spanIndivStyle.letterSpacing;
            fontSizeElement = spanIndivStyle.fontSize;
            opacityElement = spanIndivStyle.opacity;

            if (opacityElement === '') {
                opacityElement = 1;
            }

            xFontSize = (fontSizeElement.replace('px', '') / 80 * 100 );
            xLineHeight = lineHeightElement.replace('px', '');
            xSpacing = spacingElement.replace('px', '');
            xOpacity = opacityElement / 1 * 278;

            xFontSize = xFontSize > 74 ? 74 : xFontSize < -6 ? -6 : xFontSize;
            xSpacing = xSpacing > 278 ? 278 : xSpacing < -6 ? -6 : xSpacing;
            xLineHeight = xLineHeight > 278 ? 278 : xLineHeight < -6 ? -6 : xLineHeight;
            xOpacity = xOpacity > 278 ? 278 : xOpacity < -6 ? -6 : xOpacity;

            document.getElementById("fontrelineheightcontr").style.left = xLineHeight + 'px';
            document.getElementById("fontrespacecontr").style.left = xSpacing + 'px';
            document.getElementById("fontresizecontr").style.left = xFontSize + 'px';
            document.getElementById("opacityresizecontr").style.left = xOpacity + 'px';
        }

        function setSliderInputImage(type) {
            var eSelected, opacityElement, xOpacity, sizeElement, xSize;
            eSelected = document.getElementById('pageedit').getElementsByClassName('selected')[0];

            sizeElement = eSelected.offsetWidth;

            opacityElement = eSelected.style.opacity;
            if (opacityElement === '') {
                opacityElement = 1;
            }

            xSize = sizeElement / 1500 * 74;
            xOpacity = opacityElement / 1 * 278;

            xSize = xSize > 74 ? 74 : xSize < -6 ? -6 : xSize;
            xOpacity = xOpacity > 278 ? 278 : xOpacity < -6 ? -6 : xOpacity;


            if (type === 'svg') {
                document.getElementById('svgresizecontr').style.left = xSize + 'px';
                document.getElementById('opacityresizecontr').style.left = xOpacity + 'px';
            } else {
                document.getElementById('imageresizecontr').style.left = xSize + 'px';
                document.getElementById('opacityresizecontr').style.left = xOpacity + 'px';
            }

        }
    }

    function setMenuPosition(typeElement, eSelected, eMenu, isHide) {
        var eMenuLeft, eMenuTop, eMenuTransform,
            displayMenu, eSelectedPosition;
        displayMenu = isHide === 'off' ? 'none' : 'block';
        if (displayMenu === 'block') {
            eSelectedPosition = getXYTranslate(eSelected);

            eMenuLeft = eSelectedPosition[0];
            eMenuTop = eSelectedPosition[1] - 50;
            eMenuTop = eMenuTop < -50 ? -50 : eMenuTop;
            eMenuTransform = 'translate3d(' + eMenuLeft + 'px,' + eMenuTop + 'px, 0px)';
            setTranForm(eMenu, eMenuTransform);
        }
        eMenu.style.display = displayMenu;
    }

    function setEventSliderInput() {
        var eSlider, eSliderInput, eSliderInputStyle, spanIndivStyle, eIndiv, spanIndiv, x, ratio, eDi1Style, tag, type, objSolution;

        eIndiv = document.getElementById('indiv');
        this.setTextSolution = function (objSolutionText) {
            objSolution = objSolutionText;
        }
        this.setSliderInput = function (typeSlider, tagEffect) {
            eSlider = document.getElementById(typeSlider);
            eSliderInput = eSlider.childNodes[0];
            type = typeSlider;
            tag = tagEffect;
            eSliderInput.addEventListener('mousedown', initDrag, false);
        }

        var initDrag = function (e) {
            var startWidth = eSlider.offsetWidth;
            var valueCurrent = eSliderInput.offsetLeft;
            var x, c2, eSelected, spanChild, positionSpan, nChildSelected, childSelected, ratioScale, infoChildGeles = [], isActive;

            document.addEventListener('mousemove', doDrag, false);
            document.addEventListener('mouseup', stopDrag, false);
            eSliderInput.addEventListener('mouseup', stopDrag, false);
            eSliderInputStyle = eSliderInput.style;

            spanIndiv = eIndiv.getElementsByTagName(tag)[0];
            if (tag === 'canvas' || tag === 'div') {
                var eDi1;
                eDi1 = eIndiv.parentNode;
                eDi1Style = eDi1.style;
                eSelected = document.getElementById('pageedit').getElementsByClassName('selected')[0];
                spanIndivStyle = eSelected.style;
                ratio = eSelected.offsetWidth / eSelected.offsetHeight;

                if (hasClass(eSelected, 'geles')) {
                    childSelected = eSelected.getElementsByClassName('gieles');
                    nChildSelected = childSelected.length;

                    for (var u = 1; u < nChildSelected; u++) {
                        infoChildGeles[u] = [];
                        spanChild = childSelected[u].getElementsByTagName('span')[0];
                        if (typeof spanChild !== 'undefined') {
                            positionSpan = getXYTranslate(childSelected[u]);
                            infoChildGeles[u]['spanFontSize'] = spanChild.style.fontSize.replace('%', '');
                            infoChildGeles[u]['spanWidth'] = spanChild.offsetWidth;
                            infoChildGeles[u]['spanHeight'] = spanChild.offsetHeight;
                            infoChildGeles[u]['spanX'] = positionSpan[0];
                            infoChildGeles[u]['spanY'] = positionSpan[1];
                            infoChildGeles[u]['spanAgle'] = positionSpan[2];
                        }
                        infoChildGeles[u]['width'] = childSelected[u].offsetWidth;
                        infoChildGeles[u]['height'] = childSelected[u].offsetHeight;

                    }
                }
            } else {
                spanIndivStyle = spanIndiv.style;
            }
            function doDrag(e) {

                if (typeof x === 'undefined') {
                    x = e.pageX - valueCurrent;
                }

                c2 = e.pageX - x;
                isActive = true;

                if (c2 > (startWidth - 6)) {
                    c2 = startWidth - 6;
                    isActive = false;
                }
                if (c2 < -6) {
                    c2 = -6;
                    isActive = false;
                }
                eSliderInputStyle.left = c2 + 'px';
                if (type === 'fontresize') {
                    if (c2 > 8)
                        spanIndivStyle.fontSize = ( roundFloat(c2)) + 'px';
                } else if (type === 'fontrespace') {
                    if (c2 > 0)
                        spanIndivStyle.letterSpacing = c2 + 'px';
                }
                else if (type === 'fontrelineheight') {
                    if (c2 > 0)
                        spanIndivStyle.lineHeight = c2 + 'px';
                } else if (type === 'opacityresizemama') {
                    if (c2 > 0)
                        spanIndivStyle.opacity = c2 / 278;
                } else if (type === 'imageresize' || type === 'svgresize') {
                    if (c2 > 0) {

                        spanIndivStyle.width = eDi1Style.width = ( c2 / 74 * 1500 ) + 'px';
                        spanIndivStyle.height = eDi1Style.height = ( c2 / 74 * 1500 / ratio ) + 'px';
                        ratioScale = c2 / 74 * 1500 / 100;
                        if (hasClass(eSelected, 'geles')) {
                            for (var u = 0; u < nChildSelected; u++) {
                                var positionChild, spanChild, positionSpan;
                                if (u === 0 && hasClass(childSelected[u], 'item')) {
                                    childSelected[u].style.width = spanIndivStyle.width;
                                    childSelected[u].style.height = spanIndivStyle.height;
                                    ;
                                } else {
                                    childSelected[u].style.width = (ratioScale * infoChildGeles[u]['width']) + 'px';
                                    childSelected[u].style.height = (ratioScale * infoChildGeles[u]['height']) + 'px';

                                    spanChild = childSelected[u].getElementsByTagName('span')[0];
                                    if (typeof spanChild !== 'undefined') {

                                        spanChild.style.fontSize = ( ratioScale * infoChildGeles[u]['spanFontSize'] ) + '%';
                                        spanChild.style.width = ( ratioScale * infoChildGeles[u]['spanWidth'] ) + 'px';
                                        spanChild.style.height = ( ratioScale * infoChildGeles[u]['spanHeight'] ) + 'px';
                                    }

                                    setTranForm(childSelected[u], 'translate3d(' + ( ratioScale * infoChildGeles[u]['spanX'] ) + 'px, ' +
                                        ( ratioScale * infoChildGeles[u]['spanY'] ) + 'px, 0px) rotateZ(' + infoChildGeles[u]['spanAgle'] + 'deg)');
                                }
                            }
                        }
                    }
                }
                if (tag === 'span' && isActive === true) {
                    objSolution.setLimitWidthBox();
                }
            }

            function stopDrag(e) {

                document.removeEventListener('mousemove', doDrag, false);
                document.removeEventListener('mouseup', stopDrag, false);
                eSliderInput.removeEventListener('mousemove', doDrag, false);
                eSliderInput.removeEventListener('mousedown', doDrag, false);
            }
        }
    }

    function initloadresize() {
        if (document.getElementById("a4")) anb('a4', 'ac12', 'di1');
        if (document.getElementById("a1")) anb('a1', 'ac12', 'di1');
        if (document.getElementById("a3")) anb('a3', 'ac12', 'di1');
        if (document.getElementById("a2")) anb('a2', 'ac12', 'di1');
        if (document.getElementById("a5")) anb('a5', 'ac12', 'di1');
        if (document.getElementById("a6")) anb('a6', 'ac12', 'di1');
        if (document.getElementById("a7")) anb('a7', 'ac12', 'di1');
        if (document.getElementById("a8")) anb('a8', 'ac12', 'di1');
    }

    function menucontroldrag(idb, cont) {
        if (cont) {
            var mama = document.getElementById(idb);
            cont.addEventListener('mousedown', initDrag, true);
            cont.addEventListener("touchstart", initDrag, true);
            var startX, startY, startWidth, startHeight, startTranslateX, startTranslateY, startTranslateZ, startA, startB, anbdrapisTouch = false, ac12W = 0, ac12H = 0, contL = 0, contT = 0;
        }
        function initDrag(e) {
            startWidth = cont.offsetWidth;
            startHeight = cont.offsetHeight;
            startX = e.pageX;
            startY = e.pageY;

            if (e.type.toLowerCase() == "touchstart") {
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
                anbdrapisTouch = true;
            }

            var startmatrix = getXYTranslate(cont);
            startTranslateX = startmatrix[0];
            startTranslateY = startmatrix[1];
            startTranslateZ = startmatrix[2];

            startA = startX - mama.offsetLeft - startTranslateX;
            startB = startY - mama.offsetTop - startTranslateY;

            contL = startmatrix[0];
            contT = startmatrix[1];

            ac12W = document.getElementById("ac12").offsetWidth - 2;
            ac12H = document.getElementById("ac12").offsetHeight - 2;


            var idmup = e.target.id;


            if (idmup == "menufont1" || idmup == "fontsize3" || idmup == "menuimageeffect" || idmup == "imagesize5" || idmup == "svgsize5") {


                document.addEventListener('mousemove', doDrag, true);
                document.addEventListener('mouseup', stopDrag, true);
                document.addEventListener('touchmove', doDrag, true);
                document.addEventListener('touchend', stopDrag, true);
                cont.addEventListener('mouseup', stopDrag, true);
                cont.addEventListener('touchend', stopDrag, true);

            }

        }

        function doDrag(e) {

            var c1, c2;
            c1 = Math.round(e.pageX - mama.offsetLeft - startA);
            c2 = Math.round(e.pageY - mama.offsetTop - startB);

            if (anbdrapisTouch) {
                e.preventDefault();
                c1 = Math.round(e.touches[0].pageX - mama.offsetLeft - startA);
                c2 = Math.round(e.touches[0].pageY - mama.offsetTop - startB);
            }

            if (c1 < 8 && c1 >= 0) c1 = 0;
            if (c1 <= ac12W - startWidth && c1 >= ac12W - startWidth - 8) c1 = ac12W - startWidth;
            if (c2 < 8 && c2 >= 0) c2 = 0;
            if (c2 <= ac12H - startHeight && c2 >= ac12H - startHeight - 8) c2 = ac12H - startHeight;

            setTranForm(cont, "translate3d(" + c1 + "px, " + c2 + "px, 0px)");

            e.preventDefault();
        }

        function stopDrag(e) {
            document.removeEventListener('mousemove', doDrag, true);
            document.removeEventListener('mouseup', stopDrag, true);
            cont.removeEventListener('mousemove', doDrag, true);
            cont.removeEventListener('mousedown', doDrag, true);

            document.removeEventListener('touchmove', doDrag, true);
            document.removeEventListener('touchend', stopDrag, true);
            cont.removeEventListener('touchmove', doDrag, true);
            cont.removeEventListener('touchend', doDrag, true);

        }
    }

    function setEffectBlurMode(isOn) {
        var elementEffect = checkElementEffectBlur();
        if (isOn === true) {
            if (elementEffect !== null) {
                elementEffect.parentNode.removeChild(elementEffect);
            }
            createElemntEffectBlur();
        } else {
            if (elementEffect !== null) {
                elementEffect.parentNode.removeChild(elementEffect);
            }
        }
        function checkElementEffectBlur() {
            return document.getElementById('effect-blur');
        }

        function createElemntEffectBlur() {
            var elementBackgroud, pageEdit, elementEffect, imgElement, srcSvg, xmlSvg, widthElement, heigthElement;
            elementBackgroud = document.getElementById('pageeditimg');
            pageEdit = document.getElementById('pageedit');
            elementEffect = elementBackgroud.cloneNode(true);

            widthElement = pageEdit.offsetWidth;
            heigthElement = pageEdit.offsetHeight;

            xmlSvg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' + widthElement + ' ' + heigthElement + '" enable-background="new 0 0 69 69" xml:space="preserve"><rect fill="#001021" width="' + widthElement + '" height="' + heigthElement + '"></rect></svg>'
            srcSvg = 'data:image/svg+xml;base64,' + window.btoa(xmlSvg);
            imgElement = elementEffect.getElementsByTagName('img')[0];
            imgElement.src = srcSvg;
            elementEffect.id = 'effect-blur';
            elementEffect.style.opacity = '0.3';
            imgElement.style.width = elementEffect.style.width = '100%';
            imgElement.style.height = elementEffect.style.height = '100%';

            setTranForm(elementEffect, 'translate3d(0px, 0px, 0px)');
            insertAfter(elementEffect, elementBackgroud);

        }
    }

    function setQuotesCenter() {
        var quotes, pageEdit, position;
        pageEdit = document.getElementById('pageedit');
        quotes = document.getElementById('textquotes');
        if (quotes == null)
            return;

        position = new PositionElementOnPage(pageEdit.offsetWidth, pageEdit.offsetHeight);
        position.setCenter(quotes.offsetWidth, quotes.offsetHeight);
        setTranForm(quotes, "translate3d(" + position.getX() + "px, " + position.getY() + "px, 0px) rotateZ(0deg)");
    }

    function addElementToLists(typeData, data, width, height, dataid) {
        var aLi, src = site_url + 'userimg/' + data;
        if (typeData === 'imageFile') {
            var aLi = '<li><img alt="" src="' + src + '" dataimg="' + src + '" dataid="' + dataid + '"></li>';
            $("#myimg .ulistimg").prepend(aLi);
            myImgClk();

            $("#myimg li:first").click();

        } else if (typeData === 'logoFile') {

            //ElementPage( src, dataid);
        }

    }

    function PositionElementOnPage(widthPage, heightPage) {
        var ratio, x, y;
        this.setCenter = function (widthInput, heightInput) {

            x = ( widthPage - widthInput ) / 2;
            y = ( heightPage - heightInput ) / 2;
        }
        this.getX = function () {
            return x;
        }
        this.getY = function () {
            return y;
        }

    }

    myImgClk();
    function removeActiveBackground() {
        $('#myimg li').removeClass('active');
        $('#myimg i').remove();
        $('#uimg li').removeClass('active');
        $('#uimg i').remove();
    }

    function myImgClk() {
        $('#myimg li').click(function () {
            var iconActive, imgLi;
            removeActiveBackground();
            $(this).addClass('active');
            iconActive = document.createElement('i');
            this.appendChild(iconActive);
            imgLi = $(this).find('img')[0];
            var src = imgLi.getAttribute('dataimg');
            var dataId = imgLi.getAttribute('dataid');
            setImageBackground(src, dataId, 2);
            setEffectBlurMode(true);

        });
    }

    $('#uimg li').click(function () {
        var iconActive, imgLi, src, dataId;
        removeActiveBackground();
        $(this).addClass('active');
        imgLi = $(this).find('img')[0];
        src = imgLi.getAttribute('dataimg');
        dataId = imgLi.getAttribute('dataid');

        iconActive = document.createElement('i');
        this.appendChild(iconActive);


        setImageBackground(src, dataId, 1);
        sulutionBackgound(imgLi);
        setEffectBlurMode(true);

    });
    function SolutionTextInput(eDi1) {
        var eDi1Style, spanElement, spanElementStyle, eSelected, eSelectedStyle, spanSelected, spanSelectedStyle, scale = 1;
        eDi1Style = eDi1.style;
        spanElement = eDi1.getElementsByTagName('span')[0];
        spanElementStyle = spanElement.style;
        spanElementStyle.height = 'auto';

        eSelected = document.getElementsByClassName('selected')[0];
        spanSelected = eSelected.getElementsByTagName('span')[0];
        eSelectedStyle = eSelected.style;
        spanSelectedStyle = spanSelected.style;

        this.setLimitWidthBox = _setLimitWidthBox;

        this.setWidthHeightScaleBox = function () {
            eDi1Style.height = (spanElement.offsetHeight * scale) + 'px';
            eDi1Style.width = (spanElement.offsetWidth * scale) + 'px';
        }
        this.setEventTextInput = function () {
            spanElement.onkeyup = setHeightBox;
            spanElement.onkeydown = setHeightBox;
            spanElement.onpaste = setEventPasteForInput;
        }

        function setEventPasteForInput(e) {
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");
            text = text.replace(/(<([^>]+)>)/ig, "");
            text = preSolutionString(text);
            document.execCommand("insertHTML", false, text);
        }

        function _setLimitWidthBox() {
            var minWidth = spanElement.clientWidth;
            spanElementStyle.display = 'inline';
            if (minWidth < spanElement.offsetWidth) {
                eDi1Style.width = (spanElement.offsetWidth * scale) + 'px';
            }
            spanElementStyle.display = 'block';
            spanElementStyle.width = (eDi1.offsetWidth / scale ) + 'px';
            eDi1Style.height = (spanElement.offsetHeight * scale) + 'px';
        }

        function setHeightBox(e) {
            _setLimitWidthBox();
            eDi1Style.height = (spanElement.offsetHeight * scale) + 'px';
            if (e.type === 'keydown') {
                if (e.keyCode === 13) {
                    document.execCommand('insertHTML', false, '<br>');
                    var countChild, end = getCaretCharacterOffsetBoxtext(this);
                    if (end === this.textContent.length) {
                        this.innerHTML += '<br>';
                        countChild = this.childNodes.length - 1;
                        setCaret(this, countChild, this.childNodes[countChild].length);
                    }
                    return false;
                }
            }
        }
    }

    function setCaret(element, nNode, offSetText) {
        var range = document.createRange();
        var selection = window.getSelection();
        range.setStart(element.childNodes[nNode], offSetText);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    }

    function getCaretCharacterOffsetBoxtext(element) {
        var caretOffset = 0;
        var selection = window.getSelection();
        if (typeof window.getSelection != "undefined") {

            var range = selection.getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
            //console.log( range.endContainer + "|| " + preCaretRange.toString());
        } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
            var textRange = document.selection.createRange();
            var preCaretTextRange = document.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        selection.removeAllRanges();
        selection.addRange(range);
        return caretOffset;
    }

    function asynchronousUpload(typeUpload) {
        var classNameForm = typeUpload === 'logoFile' ? 'userupform2' : 'userupform1';
        var formData = new FormData($('.' + classNameForm)[0]);

        $.ajax({
            url: site_url + 'memup/',
            type: 'POST',
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
                }
                return myXhr;
            },
            beforeSend: beforeSendHandler,
            success: function (reps) {
                completeHandler(reps);
            },
            error: errorHandler,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json"
        });
        function progressHandlingFunction(e) {
            if (e.lengthComputable) {
                $('.userupstatus span').css({"width": eval(70 * (e.loaded / e.total)) + "px"});
            }
        }

        function beforeSendHandler() {
            $('.userupstatus span').css({"width": "0px"});
            $(".userupstatus").css("display", "block");
        }

        function completeHandler(resp) {

            if (resp.status == 1 && (resp.f).trim() != "") {
                addElementToLists(typeUpload, resp.f, resp.w, resp.h, resp.i);
            } else {
                if (resp.status == 0 && (resp.mess).trim() != "") {
                    alert(resp.mess);
                } else {
                    alert("Your file is invalid.");
                }
            }
            setTimeout(function () {
                $(".userupstatus").css("display", "none");
            }, 2000);
        }

        function errorHandler() {

        }
    };
    (function () {
        var areaUpload, typeUpload;
        areaUpload = document.getElementsByClassName('area-upload');
        for (var i = 0; i < areaUpload.length; i++) {
            areaUpload[i].addEventListener('click', setClickDownload, false);
        }
        function setClickDownload() {
            var inputClame, inputUpload = this.getElementsByTagName('input')[0];

            if (typeof  inputUpload === 'undefined')
                return;
            $('.' + inputUpload.className).click();
            typeUpload = inputUpload.className === 'userupfile2' ? 'logoFile' : 'imageFile';
        }

        $(':file').change(function () {
            var file = this.files[0];
            asynchronousUpload(typeUpload);
        });
    })();
})();

function hasClass(ele, cls) {
    if (!ele) return false;
    if (!ele.className) return false;
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function setImageBackground(src, dataid, type) {
    var imgArr, imgBackground, sizeLayout;
    imgArr = $('#pageeditimg');
    imgBackground = imgArr.find('img').eq(0);

    imgBackground.attr('src', src);
    imgBackground.attr('dataid', dataid);
    if (type === 1) {
        imgArr.removeClass('useritem');
    } else if (type === 2) {
        imgArr.addClass('useritem');
    }
}

function setEventColor(type) {

    var list, inputColor = [], listTableColor, eInputColorCustomer, numbersColor, aColor, eSelected, listSvgColor = [], btColorShow = [],
        eMenu, colorChangeMenu, colorDefault
    colorDefault = '#fff';
    eMenu = document.getElementById('menu1');
    eSelected = document.getElementsByClassName('selected')[0];
    if (typeof eSelected === 'undefined' & typeof eMenu === 'undefined')
        return;

    var setEventChooseShowColor = function (e) {
        var btColorShowDetail = [];
        for (var i = 0; i < 3; i++) {
            btColorShowDetail = document.getElementById(list[i][1]);

            if (btColorShowDetail !== null) {

                if (this.id === list[i][0])
                    btColorShowDetail.style.display = 'block';
                else {
                    btColorShowDetail.style.display = 'none';
                }
            }
        }
    }
    var setEventChooseShowColorText = function (e) {
        var btColorShowDetail = [];
        for (var i = 0; i < 1; i++) {
            btColorShowDetail = document.getElementById(list[i][1]);

            if (btColorShowDetail !== null) {

                if (this.id === list[i][0])
                    btColorShowDetail.style.display = 'block';
                else {
                    btColorShowDetail.style.display = 'none';
                }
            }
        }
    }
    var setEventChooseTableColor = function (e) {
        e.stopPropagation();
        var typeInputColor, typeSvgColor, listSvgFill, numberSvgColor, aColor;

        aColor = this.getAttribute('acolor');
        typeInputColor = this.parentNode.parentNode.parentNode.parentNode.id;

        typeSvgColor = typeInputColor === 'svgcolormoredetail1' ? '0' : typeInputColor === 'svgcolormoredetail2' ? '1' :
            typeInputColor === 'svgcolormoredetail3' ? '2' : 'undefined';

        if (typeSvgColor == 'undefined')
            return;

        if (!hasClass(this, 'colormoreinput')) {
            inputColor[typeSvgColor].value = aColor;
            inputColor[typeSvgColor].style.backgroundColor = aColor;
            listSvgFill = listSvgColor[typeSvgColor];
        }


        eInputColorCustomer.setAttribute('value', aColor);
        eInputColorCustomer.style.backgroundColor = aColor;

        if (listSvgColor !== null) {
            numberSvgColor = listSvgFill.length;
            for (var z = 0; z < numberSvgColor; z++) {
                listSvgFill[z].setAttribute('fill', aColor);

            }
        }
    }
    var setEventChooseTableColorText = function (e) {
        e.stopPropagation();
        var typeInputColor, spanText, numberSvgColor, aColor, eDi1;
        eDi1 = document.getElementById('di1');

        aColor = this.getAttribute('acolor');
        if (!hasClass(this, 'colormoreinput')) {
            inputColor[0].value = aColor;
            inputColor[0].style.backgroundColor = aColor;
            spanText = listSvgColor[0];
        }
        if (listSvgColor !== null) {
            eDi1.getElementsByTagName('span')[0].style.color = aColor;
            eInputColorCustomer.setAttribute('value', aColor);
            eInputColorCustomer.style.backgroundColor = aColor;

        }
    }

    if (type === 'txt') {
        list = [['color', 'chocolor3', 'acolor', 'colormoreinput', 'colorpicker']];
        for (i = 0; i < 1; i++) {
            btColorShow[i] = document.getElementById(list[i][0]);
            inputColor[i] = btColorShow[i].getElementsByTagName('a')[0];
            listSvgColor[i] = eSelected.getElementsByTagName('span')[0];
            if (btColorShow[i] !== null) {
                colorDefault = listSvgColor[i].style.color;
                inputColor[i].value = colorDefault;
                inputColor[i].style.cssText = 'background:' + colorDefault;

                listTableColor = document.getElementById(list[i][1])
                listTableColor = listTableColor.getElementsByTagName('li');
                numbersColor = listTableColor.length;
                for (var j = 0; j < numbersColor; j++) {
                    aColor = listTableColor[j].getElementsByClassName('colorcustomize')[0];

                    if (typeof aColor === 'undefined')
                        return;

                    if (j === 55) {
                        eInputColorCustomer = listTableColor[j].getElementsByClassName('colormoreinput')[0];
                        if (typeof eInputColorCustomer !== 'undefined') {
                            eInputColorCustomer.setAttribute('value', colorDefault);
                            eInputColorCustomer.style.backgroundColor = colorDefault;
                        }

                    }
                    aColor.addEventListener('click', setEventChooseTableColorText, false);
                }

                btColorShow[i].addEventListener('click', setEventChooseShowColorText, false);

                var colors = jsColorPicker('.' + list[i][3], {
                    customBG: '#222',
                    readOnly: true,
                    appenTo: document.getElementById(list[i][4])
                });

            }
        }

    } else {
        list = [
            ['svgcolormoremenua1', 'svgcolormoredetail1', 'svgchangecolor1', 'svgcolormoreinput1', 'svgcolorpicker1'],
            ['svgcolormoremenua2', 'svgcolormoredetail2', 'svgchangecolor2', 'svgcolormoreinput2', 'svgcolorpicker2'],
            ['svgcolormoremenua3', 'svgcolormoredetail3', 'svgchangecolor3', 'svgcolormoreinput3', 'svgcolorpicker3']
        ];

        for (var i = 0; i < 3; i++) {

            btColorShow[i] = document.getElementById(list[i][0]);
            inputColor[i] = btColorShow[i].getElementsByTagName('input')[0];
            listSvgColor[i] = eSelected.getElementsByClassName(list[i][2]);

            if (btColorShow[i] !== null && inputColor[i].style.display !== 'none') {

                colorDefault = listSvgColor[i][0].getAttribute('fill');

                inputColor[i].value = colorDefault;
                inputColor[i].style.backgroundColor = colorDefault;

                listTableColor = document.getElementById(list[i][1])
                listTableColor = listTableColor.getElementsByTagName('li');
                numbersColor = listTableColor.length;

                for (var j = 0; j < numbersColor; j++) {
                    aColor = listTableColor[j].getElementsByClassName('colorcustomize')[0];
                    if (typeof aColor === 'undefined')
                        return;

                    if (j === 55) {
                        eInputColorCustomer = listTableColor[j].getElementsByClassName('colormoreinput')[0];
                        if (typeof eInputColorCustomer !== 'undefined') {
                            eInputColorCustomer.setAttribute('value', colorDefault);
                            eInputColorCustomer.style.backgroundColor = colorDefault;

                        }

                    }
                    aColor.addEventListener('click', setEventChooseTableColor, false);
                }

                btColorShow[i].addEventListener('click', setEventChooseShowColor, false);
                var colors = jsColorPicker('#' + list[i][3], {
                    customBG: '#222',
                    //readOnly: true,
                    appenTo: document.getElementById(list[i][4])
                });
            }

        }
    }


}

function removedi() {

    var elementSelected, i, nElements, elementSvg, eIndiv;
    elementSelected = document.getElementById("pageedit").getElementsByClassName("selected")[0]
    eIndiv = document.getElementById("indiv");
    if (typeof elementSelected !== 'undefined') {
        elementSelected.className = elementSelected.className.replace('selected', '');
        if (hasClass(elementSelected, 'txt')) {
            if (typeof eIndiv !== 'undefined') {
                if (eIndiv.childNodes[0].textContent !== '') {

                    var spanIndiv = eIndiv.getElementsByTagName('span')[0];
                    spanIndiv.removeAttribute('contenteditable');
                    elementSelected.innerHTML = eIndiv.innerHTML;
                    elementSelected.style.width = eIndiv.parentNode.style.width;
                    elementSelected.style.height = eIndiv.parentNode.style.height;
                    elementSelected.style.opacity = 1;
                } else {
                    elementSelected.parentNode.removeChild(elementSelected);
                }
            }
        }

    }


    if (document.getElementById("di1")) {
        document.getElementById("di1").parentNode.removeChild(document.getElementById("di1"));
    }

    if (document.getElementById("menu1")) {
        document.getElementById("menu1").parentNode.removeChild(document.getElementById("menu1"))
    }
    ;
    if (document.getElementById("indivParent")) {
        document.getElementById("indivParent").parentNode.removeChild(document.getElementById("indivParent"));
    }
}

function saveYourCate() {
    var cate = '';
    $('#category ul li i').each(function (b) {
        if ($(this).hasClass('active')) {
            cate += $(this).attr('dataid') + ',';
        }
    });
    cate = utf8_to_b64(cate);


    $.ajax({
        url: site_url + "some-post/done",
        type: "POST",
        data: {a: 1, c: cate},
        error: function () {
        },
        dataType: "json",
        success: function (msg) {

        }
    });

}

function MaxPageSize() {
    var w = $('.head').width();//console.log(w);
    var aw = $('#ac12').attr('dataw');
    var ah = $('#ac12').attr('datah');
    if (w < aw) {
        ah = w * ah / aw;
        aw = w;
    }


    return aw;
}

function FitSize(widthInput, heightInput, widthConfig, heightConfig) {
    this.widthOutput = widthInput;
    this.heightOutput = heightInput;
    this.setSizeByFixedHeight = function (widthConfig, heightConfig) {
        var ratioInput;
        ratioInput = this.widthOutput / this.heightOutput;
        this.widthOutput = widthConfig;

        if (widthConfig / ratioInput > heightConfig) {
            this.heightOutput = heightConfig;
            this.widthOutput = heightConfig * ratioInput;

        } else {
            this.heightOutput = widthConfig / ratioInput;
        }

    };
    this.setSizeByFixedWidth = function (widthConfig, heightConfig) {
        var ratioInput;
        ratioInput = heightConfig / widthConfig;
        this.heightOutput = heightConfig;
        if (heightConfig / ratioInput > widthConfig) {
            this.widthOutput = widthConfig;
            this.heightOutput = widthConfig * ratioInput;

        }
    };


    widthConfig < heightConfig ? this.setSizeByFixedWidth(widthConfig, heightConfig) : this.setSizeByFixedHeight(widthConfig, heightConfig);
}

function getNewCoordinatesByRotate(xOld, yOld, wOld, hOld, angle) {
    var xCenterOld, yCenterOld, sin, cos
    xCenterOld = xOld + wOld / 2;
    yCenterOld = yOld + hOld / 2;

    angle *= Math.PI / 180;

    cos = Math.cos(angle)
    sin = Math.sin(angle)

    var solutionCoordinates = function (wNew, hNew) {
        var xDeltaLeng, yDeltaLeng, xCenterNew, yCenterNew, xNew, yNew;
        xDeltaLeng = ( wNew - wOld ) / 2;
        yDeltaLeng = ( hNew - hOld ) / 2;
        xCenterNew = xCenterOld + xDeltaLeng * cos - yDeltaLeng * sin;
        yCenterNew = yCenterOld + xDeltaLeng * sin + yDeltaLeng * cos;
        xNew = xCenterNew - wNew / 2;
        yNew = yCenterNew - hNew / 2;
        return [xNew, yNew]
    }
    return solutionCoordinates;
}

function getWidthChange(angle, widthOld) {
    var typeIdentity, sin, cos, widthOld;
    angle *= Math.PI / 180;
    cos = Math.cos(angle);
    sin = Math.sin(angle);

    if (cos < 0) {
        typeIdentity = cos < -0.5 ? 'cos' : 'sin';
    } else {
        typeIdentity = cos > 0.5 ? 'cos' : 'sin';
    }
    var getSizeWidth = function (ePageX, ePageY, ePageXBegin, ePageYBegin) {
        var width = typeIdentity === 'cos' ? ((ePageX - ePageXBegin) * cos + widthOld) : ((ePageY - ePageYBegin) * +sin + widthOld);
        return width;
    }
    return getSizeWidth;
}

function menumorechk() {
    if (document.getElementById("memumore")) {
        document.getElementById("memumore").addEventListener('click', function () {
            if (document.getElementById("morespacefont")) {
                if (document.getElementById("morespacefont").style.display == "block") {
                    document.getElementById("morespacefont").style.display = "none";
                }
            }
        }, false);
    }
}

function getFontSizeTextElement(widthOld, heightOld, widthNew, heightNew) {
    var ratio = widthNew > heightNew ? widthNew / widthOld : heightNew / heightOld;
    return roundFloat(16 * ratio, 0);
}

function getSizeTextByContent(content, fontSize, fontFamily) {

    var boxText, boxTextStyle, widthBoxOld, heightBoxOld, footer;
    footer = document.getElementsByClassName('footer')[0];
    boxText = document.createElement('span');
    boxTextStyle = boxText.style;
    boxTextStyle.display = 'inline';
    boxTextStyle.fontSize = fontSize + 'px';
    boxTextStyle.fontFamily = fontFamily;
    boxText.innerHTML = content;
    footer.appendChild(boxText);
    widthBoxOld = boxText.offsetWidth;
    heightBoxOld = boxText.offsetHeight;

    footer.removeChild(boxText);
    return [widthBoxOld, heightBoxOld];
    ;
}

function getSizeImageByContent(src) {
    var boxText, boxTextStyle;
    var pageEdit = document.getElementById('pageedit');
    boxText = document.createElement('span');
    boxTextStyle = boxText.style;
    boxTextStyle.display = 'inline';
    boxTextStyle.fontSize = '16px';
    boxTextStyle.fontFamily = 'Courgette';
    boxText.innerHTML = content;
    pageEdit.appendChild(boxText);
    return [boxText.offsetWidth, boxText.offsetHeight];
}

function SizePhotoInFrame(widthImage, heightImage, widthFrame, heightFrame) {

    this.x = 0;
    this.y = 0;
    this.widthFrame = widthFrame;
    this.heightFrame = heightFrame;

    this.setSizeByFixedWidthHeight = function (widthFrame, heightFrame) {

        if (widthFrame >= heightFrame) {

            this.heightFrame = this.widthFrame;
            this.y = Math.round((heightFrame - this.heightFrame) / 2);
            this.x = Math.round((widthFrame - this.widthFrame) / 2);

        } else {

            this.widthFrame = this.heightFrame;
            this.y = Math.round((heightFrame - this.heightFrame ) / 2);
            this.x = Math.round((widthFrame - this.widthFrame ) / 2);
        }
    }

    this.setSizeByFixedHeight = function (widthImage, heightImage) {
        var ratio;
        ratio = widthImage / heightImage;
        this.setXCenterImageInFrame(ratio);
        this.widthFrame = Math.round(this.heightFrame * ratio);
    }

    this.setSizeByFixedWidth = function (widthImage, heightImage) {
        var ratio;
        ratio = heightImage / widthImage;
        this.setYCenterImageInFrame(ratio);
        this.heightFrame = Math.round(this.widthFrame * ratio);
    }

    this.setXCenterImageInFrame = function (ratio) {
        this.x = -Math.round((this.heightFrame * ratio - this.widthFrame) / 2);
    }

    this.setYCenterImageInFrame = function (ratio) {
        this.y = -Math.round((this.widthFrame * ratio - this.heightFrame) / 2);
    }

    if (widthImage === heightImage) {

        this.setSizeByFixedWidthHeight(widthFrame, heightFrame);

    } else if (widthImage > heightImage) {

        this.setSizeByFixedHeight(widthImage, heightImage);

    } else {

        this.setSizeByFixedWidth(widthImage, heightImage);
    }
}

function roundFloat(nFloat, nRound) {
    return Number((nFloat).toFixed(nRound));
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function setEventColor(type) {

    var list, inputColor = [], listTableColor, eInputColorCustomer, numbersColor, aColor, eSelected, listSvgColor = [], btColorShow = [],
        eMenu, colorChangeMenu, colorDefault
    colorDefault = '#fff';
    eMenu = document.getElementById('menu1');
    eSelected = document.getElementsByClassName('selected')[0];
    if (typeof eSelected === 'undefined' & typeof eMenu === 'undefined')
        return;

    var setEventChooseShowColor = function (e) {
        var btColorShowDetail = [];
        for (var i = 0; i < 3; i++) {
            btColorShowDetail = document.getElementById(list[i][1]);

            if (btColorShowDetail !== null) {

                if (this.id === list[i][0])
                    btColorShowDetail.style.display = 'block';
                else {
                    btColorShowDetail.style.display = 'none';
                }
            }
        }
    }
    var setEventChooseShowColorText = function (e) {
        var btColorShowDetail = [];
        for (var i = 0; i < 1; i++) {
            btColorShowDetail = document.getElementById(list[i][1]);

            if (btColorShowDetail !== null) {

                if (this.id === list[i][0])
                    btColorShowDetail.style.display = 'block';
                else {
                    btColorShowDetail.style.display = 'none';
                }
            }
        }
    }
    var setEventChooseTableColor = function (e) {
        e.stopPropagation();
        var typeInputColor, typeSvgColor, listSvgFill, numberSvgColor, aColor;

        aColor = this.getAttribute('acolor');
        typeInputColor = this.parentNode.parentNode.parentNode.parentNode.id;

        typeSvgColor = typeInputColor === 'svgcolormoredetail1' ? '0' : typeInputColor === 'svgcolormoredetail2' ? '1' :
            typeInputColor === 'svgcolormoredetail3' ? '2' : 'undefined';

        if (typeSvgColor == 'undefined')
            return;

        if (!hasClass(this, 'colormoreinput')) {
            inputColor[typeSvgColor].value = aColor;
            inputColor[typeSvgColor].style.backgroundColor = aColor;
            listSvgFill = listSvgColor[typeSvgColor];
        }


        eInputColorCustomer.setAttribute('value', aColor);
        eInputColorCustomer.style.backgroundColor = aColor;

        if (listSvgColor !== null) {
            numberSvgColor = listSvgFill.length;
            for (var z = 0; z < numberSvgColor; z++) {
                listSvgFill[z].setAttribute('fill', aColor);

            }
        }
    }
    var setEventChooseTableColorText = function (e) {
        e.stopPropagation();
        var typeInputColor, spanText, numberSvgColor, aColor, eDi1;
        eDi1 = document.getElementById('di1');

        aColor = this.getAttribute('acolor');
        if (!hasClass(this, 'colormoreinput')) {
            inputColor[0].value = aColor;
            inputColor[0].style.backgroundColor = aColor;
            spanText = listSvgColor[0];
        }
        if (listSvgColor !== null) {
            eDi1.getElementsByTagName('span')[0].style.color = aColor;
            eInputColorCustomer.setAttribute('value', aColor);
            eInputColorCustomer.style.backgroundColor = aColor;

        }
    }

    if (type === 'txt') {
        list = [['color', 'chocolor3', 'acolor', 'colormoreinput', 'colorpicker']];
        for (i = 0; i < 1; i++) {
            btColorShow[i] = document.getElementById(list[i][0]);
            inputColor[i] = btColorShow[i].getElementsByTagName('a')[0];
            listSvgColor[i] = eSelected.getElementsByTagName('span')[0];
            if (btColorShow[i] !== null) {
                colorDefault = listSvgColor[i].style.color;
                inputColor[i].value = colorDefault;
                inputColor[i].style.cssText = 'background:' + colorDefault;

                listTableColor = document.getElementById(list[i][1])
                listTableColor = listTableColor.getElementsByTagName('li');
                numbersColor = listTableColor.length;
                for (var j = 0; j < numbersColor; j++) {
                    aColor = listTableColor[j].getElementsByClassName('colorcustomize')[0];

                    if (typeof aColor === 'undefined')
                        return;

                    if (j === 55) {
                        eInputColorCustomer = listTableColor[j].getElementsByClassName('colormoreinput')[0];
                        if (typeof eInputColorCustomer !== 'undefined') {
                            eInputColorCustomer.setAttribute('value', colorDefault);
                            eInputColorCustomer.style.backgroundColor = colorDefault;
                        }

                    }
                    aColor.addEventListener('click', setEventChooseTableColorText, false);
                }

                btColorShow[i].addEventListener('click', setEventChooseShowColorText, false);

                var colors = jsColorPicker('.' + list[i][3], {
                    customBG: '#222',
                    readOnly: true,
                    appenTo: document.getElementById(list[i][4])
                });

            }
        }

    } else {
        list = [
            ['svgcolormoremenua1', 'svgcolormoredetail1', 'svgchangecolor1', 'svgcolormoreinput1', 'svgcolorpicker1'],
            ['svgcolormoremenua2', 'svgcolormoredetail2', 'svgchangecolor2', 'svgcolormoreinput2', 'svgcolorpicker2'],
            ['svgcolormoremenua3', 'svgcolormoredetail3', 'svgchangecolor3', 'svgcolormoreinput3', 'svgcolorpicker3']
        ];

        for (var i = 0; i < 3; i++) {

            btColorShow[i] = document.getElementById(list[i][0]);
            inputColor[i] = btColorShow[i].getElementsByTagName('input')[0];
            listSvgColor[i] = eSelected.getElementsByClassName(list[i][2]);

            if (btColorShow[i] !== null && inputColor[i].style.display !== 'none') {

                colorDefault = listSvgColor[i][0].getAttribute('fill');

                inputColor[i].value = colorDefault;
                inputColor[i].style.backgroundColor = colorDefault;

                listTableColor = document.getElementById(list[i][1])
                listTableColor = listTableColor.getElementsByTagName('li');
                numbersColor = listTableColor.length;

                for (var j = 0; j < numbersColor; j++) {
                    aColor = listTableColor[j].getElementsByClassName('colorcustomize')[0];
                    if (typeof aColor === 'undefined')
                        return;

                    if (j === 55) {
                        eInputColorCustomer = listTableColor[j].getElementsByClassName('colormoreinput')[0];
                        if (typeof eInputColorCustomer !== 'undefined') {
                            eInputColorCustomer.setAttribute('value', colorDefault);
                            eInputColorCustomer.style.backgroundColor = colorDefault;

                        }

                    }
                    aColor.addEventListener('click', setEventChooseTableColor, false);
                }

                btColorShow[i].addEventListener('click', setEventChooseShowColor, false);
                var colors = jsColorPicker('#' + list[i][3], {
                    customBG: '#222',
                    //readOnly: true,
                    appenTo: document.getElementById(list[i][4])
                });
            }

        }
    }


}

function loadGFont(fontFamily) {

    if (fontFamily.indexOf('Roboto') > -1) {
        if (fontFamily.indexOf('Condensed') === -1) {
            fontFamily = 'Roboto';
        } else {
            fontFamily = 'Roboto+Condensed';
        }
    } else if (fontFamily.indexOf('Open') > -1) {
        fontFamily = 'Open+Sans:800';
    }

    WebFont.load({
        google: {
            families: [fontFamily]
        }
    });
    settrueHeighttxt();
}

function settrueHeighttxt() {
    if (hasClass(document.getElementById("indiv"), "txt")) {
        var Tcont = document.getElementById("indiv");
        var a6span = Tcont.getElementsByTagName("span");
        var a6height = 0, a6Width = 0;
        for (var i = 0; i < a6span.length; i++) {
            a6height += Tcont.getElementsByTagName("span")[i].offsetHeight;
            if (parseInt(Tcont.getElementsByTagName("span")[i].offsetWidth) > a6Width)
                a6Width = Tcont.getElementsByTagName("span")[i].offsetWidth;
        }
        if (a6height == 0) a6height = 10;
        a6height += "px";
        Tcont.style.height = a6height;
        document.getElementById("di1").style.height = a6height;

        var sync2 = document.getElementById("pageedit").getElementsByClassName("selected")[0];
        sync2.style.height = a6height;
        if (a6Width == 0) a6Width = 10;
        sync2.style.width = a6Width + "px";
    }
}

function addfont() {
    document.getElementById("choosefont").addEventListener('change', function () {
        var e = document.getElementById("choosefont");
        var choosefont12 = document.getElementById("indiv").getElementsByTagName("span");
        for (var i = 0; i < choosefont12.length; i++) {
            choosefont12[i].style.fontFamily = e.options[e.selectedIndex].value;
        }
    }, false);

    document.getElementById("fontselected").addEventListener('click', function (e) {
        var par1 = document.getElementById("choosefont");
        var ul1 = par1.parentNode;
        var fontother = document.getElementById("fontother");
        fontother.style.display = "block";

        //var doc = doc.docElement;
        var left = (window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0);
        var top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);

        if (top + window.innerHeight < e.pageY + 316) {
            if (window.innerHeight < 316) {
                document.getElementById("chofontfamily3").style.top = (0 - eval(e.pageY - top) + 8 ) + "px";
            } else {
                var ahe1 = (e.pageY - top - 8) - parseInt((window.innerHeight - 316) / 2);
                document.getElementById("chofontfamily3").style.top = (0 - ahe1 ) + "px";
            }
        }

        var afont8 = document.getElementById("indiv").getElementsByTagName("span")[0].style.fontFamily;
        afont8 = afont8.replace(/'/g, "");

        var fontcustomize8 = document.getElementById("fontother").getElementsByClassName("fontcustomize");
        for (var i = 0; i < fontcustomize8.length; i++) {
            if (fontcustomize8[i].getElementsByTagName("input")[0].value == afont8) {
                fontcustomize8[i].className = fontcustomize8[i].className + " activef";
            }
        }

        e.preventDefault();
    }, false);

    var choosefontcount = document.getElementById("fontother").getElementsByTagName("div");
    for (var i = 0; i < choosefontcount.length; i++) {
        document.getElementById("fontother").getElementsByTagName("div")[i].addEventListener('click', function (e) {
            for (var j = 0; j < choosefontcount.length; j++) {
                document.getElementById("fontother").getElementsByTagName("div")[j].className = document.getElementById("fontother").getElementsByTagName("div")[j].className.replace("activef", "");
            }

            this.className += " activef";

            var fontsel1 = e.target.parentNode.getElementsByTagName("input")[0].getAttribute("value");
            var choosefont12 = document.getElementById("indiv").getElementsByTagName("span");
            for (var i = 0; i < choosefont12.length; i++) {
                choosefont12[i].style.fontFamily = fontsel1;
            }
            loadGFont(fontsel1);
            e.preventDefault();
        }, false);
    }

    document.getElementById("fontselected").addEventListener('click', function (e) {
        if (document.getElementById("chofontfamily3").style.display == "none") {

            document.getElementById("chofontfamily3").style.display = "block";
        } else {
            document.getElementById("chofontfamily3").style.display = "none";
        }

    }, false);

    document.getElementById("acolor").addEventListener('click', function (e) {
        if (document.getElementById("chocolor3").style.display == "none") {

            document.getElementById("chocolor3").style.display = "block";
        } else {
            document.getElementById("chocolor3").style.display = "none";
        }
        e.preventDefault();

    }, false);


    document.getElementById("texttransform3").addEventListener('click', function (e) {
        var uppercase = "none";
        if (this.innerHTML == "hH") {
            uppercase = "uppercase";
            this.innerHTML = "HH";
        } else {
            this.innerHTML = "hH";
        }
        var upperfont = document.getElementById("indiv").getElementsByTagName("span");
        for (var i = 0; i < upperfont.length; i++) {
            upperfont[i].style.textTransform = uppercase;
        }
        settrueHeighttxt();
        e.preventDefault();

    }, false);

    //-----text align-----
    document.getElementById("malignimg").addEventListener('click', function (e) {
        if (document.getElementById("maligndetail").style.display == "block") {
            document.getElementById("maligndetail").style.display = "none";
        } else {

            document.getElementById("maligndetail").style.display = "block";
            var sel2 = document.getElementById("pageedit").getElementsByClassName("selected")[0];
            if (sel2.style.textAlign == "right") {
                malignimgClass("malignright");
            } else if (sel2.style.textAlign == "center") {
                malignimgClass("maligncenter");
            } else if (sel2.style.textAlign == "justify") {
                malignimgClass("malignjustify");
            } else {
                malignimgClass("malignleft");
            }
        }
        e.preventDefault();
    }, false);

    document.getElementById("malignleft").addEventListener('click', function (e) {
        var sel2 = document.getElementById("pageedit").getElementsByClassName("selected")[0];
        sel2.style.textAlign = "left";
        document.getElementById("indiv").getElementsByTagName('span')[0].style.textAlign = "left";
        malignimgClass("malignleft");
        e.preventDefault();
    }, false);

    document.getElementById("maligncenter").addEventListener('click', function (e) {
        var sel2 = document.getElementById("pageedit").getElementsByClassName("selected")[0];
        sel2.style.textAlign = "center";
        document.getElementById("indiv").getElementsByTagName('span')[0].style.textAlign = "center";
        malignimgClass("maligncenter");
        e.preventDefault();
    }, false);

    document.getElementById("malignright").addEventListener('click', function (e) {
        var sel2 = document.getElementById("pageedit").getElementsByClassName("selected")[0];
        sel2.style.textAlign = "right";
        document.getElementById("indiv").getElementsByTagName('span')[0].style.textAlign = "right";
        malignimgClass("malignright");
        e.preventDefault();
    }, false);

    document.getElementById("malignjustify").addEventListener('click', function (e) {
        var sel2 = document.getElementById("pageedit").getElementsByClassName("selected")[0];
        sel2.style.textAlign = "justify";
        document.getElementById("indiv").getElementsByTagName('span')[0].style.textAlign = "justify";
        malignimgClass("malignjustify");
        e.preventDefault();
    }, false);

    function malignimgClass(a) {
        document.getElementById("malignleft").className = "";
        document.getElementById("maligncenter").className = "";
        document.getElementById("malignright").className = "";
        document.getElementById("malignjustify").className = "";
        document.getElementById(a).className = "act128";
    }

}

$(document).ready(function () {
    $(".supportformclose").click(function () {
        $(".supportformclose").css("display", "none");
        setTimeout(function () {
            $(".support1bg").css({"width": "0", "height": "0"});
        }, 500)
        $(".supportformd").css({"height": "0"});
        setTimeout(function () {
            $(".supportform").css("display", "none");
        }, 500);
        return false;
    });
    $(".support1c a, .support1t").click(function () {
        $(".supportformf2").css("display", "none");
        $(".supportform, .supportformd").css("display", "block");
        $(".support1bg").css({"width": "340px", "height": "100%"});
        setTimeout(function () {
            $(".supportformd").css({"height": "305px"});
            $(".supportformclose").css("display", "block");
        }, 500);
        return false;
    });

    $(".supportformsub").click(function () {
        var title1 = $("#supportformtitle").val();
        var email1 = $("#supportformemail").val();
        var content1 = $(".supportformarea").val();
        content1 = content1.trim();
        if (title1 == "") {
            alert("Your title is blank");
            return false;
        }
        if (!ValidateEmail(email1)) {
            alert("Your email is not validate");
            return false;
        }

        if (content1 == "") {
            alert("Your content is blank");
            return false;
        }

        email1 = utf8_to_b64(email1);
        content1 = utf8_to_b64(content1);

        $.ajax({
            url: site_url + "contact/quick",
            type: "POST",
            data: {a: email1, t: title1, p: content1},
            error: function () {
            },
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    $(".supportformd").css("display", "none");
                    $(".supportformf2").css("display", "block");
                    $(".supportformf2").html(msg.m);
                } else {
                    $(".supportformd").css("display", "none");
                    $(".supportformf2").css("display", "block");
                    $(".supportformf2").html(msg.m);
                }
            }
        });

        return false;
    });
});

$(document).ready(function () {
    $(".supportformclose").click(function () {
        $(".supportformclose").css("display", "none");
        setTimeout(function () {
            $(".support1bg").css({"width": "0", "height": "0"});
        }, 500)
        $(".supportformd").css({"height": "0"});
        setTimeout(function () {
            $(".supportform").css("display", "none");
        }, 500);
        return false;
    });
    $(".support1c a, .support1t").click(function () {
        $(".supportformf2").css("display", "none");
        $(".supportform, .supportformd").css("display", "block");
        $(".support1bg").css({"width": "340px", "height": "100%"});
        setTimeout(function () {
            $(".supportformd").css({"height": "305px"});
            $(".supportformclose").css("display", "block");
        }, 500);
        return false;
    });

    $(".supportformsub").click(function () {
        var title1 = $("#supportformtitle").val();
        var email1 = $("#supportformemail").val();
        var content1 = $(".supportformarea").val();
        content1 = content1.trim();
        if (title1 == "") {
            alert("Your title is blank");
            return false;
        }
        if (!ValidateEmail(email1)) {
            alert("Your email is not validate");
            return false;
        }

        if (content1 == "") {
            alert("Your content is blank");
            return false;
        }

        email1 = utf8_to_b64(email1);
        content1 = utf8_to_b64(content1);

        $.ajax({
            url: site_url + "contact/quick",
            type: "POST",
            data: {a: email1, t: title1, p: content1},
            error: function () {
            },
            dataType: "json",
            success: function (msg) {
                if (msg.status == 1) {
                    $(".supportformd").css("display", "none");
                    $(".supportformf2").css("display", "block");
                    $(".supportformf2").html(msg.m);
                } else {
                    $(".supportformd").css("display", "none");
                    $(".supportformf2").css("display", "block");
                    $(".supportformf2").html(msg.m);
                }
            }
        });

        return false;
    });
});

function ValidateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}


var fontlist_arr, fontlist, site_url;
fontlist = site_url = '';
fontlist_arr = [
    {link: "Open+Sans:700", image: "open-sans-bold-png", title: "Open Sans", lang: ''},
    {link: "http://fonts.googleapis.com/css?family=Roboto", image: "roboto-thin.png", title: "Roboto Thin", lang: ''},
    {
        link: "http://fonts.googleapis.com/css?family=Roboto",
        image: "robotocondensed-regular.png",
        title: "Roboto Condensed",
        lang: ''
    },
    {link: "Lobster&subset=latin,vietnamese", image: "lobster-png", title: "Lobster", lang: ''},
    {link: "Itim&subset=latin,vietnamese", image: "itim-png", title: "Itim", lang: ''},
    {link: "Chonburi&subset=latin,vietnamese", image: "chonburi-png", title: "Chonburi", lang: ''}
];

for (var i = 0; i < fontlist_arr.length; i++) {
    fontlist += '<li><div class="fontcustomize"><img ulink="' + fontlist_arr[i].link + '" src="font/' + fontlist_arr[i].image + '" /><input type="hidden" value="' + fontlist_arr[i].title + '" />' + fontlist_arr[i].lang + '</div></li>';
}
function PositionOver() {
    this.eleBorder = (function () {
        var eDi = document.createElement('div');
        eDi.id = 'di1';
        eDi.className = 'element2';
        return eDi;
    })();
    this.eleIndiv = (function () {
        var eIndiv = document.createElement('div');
        eIndiv.id = 'indiv';
        eIndiv.className = 'indiv';
        return eIndiv;
    })();
    this.eleMenu = (function () {
        var eMenu = document.createElement('div');
        eMenu.id = 'menu1';
        eMenu.className = 'menuimage';
        return eMenu;
    })();
    this.eleOver = document.getElementById('over1');

    this.getEleBorder = function () {
        return this.eleBorder;
    }
    this.getEleOver = function () {
        return this.eleOver;
    }
    this.getEleMenu = function () {
        return this.eleMenu;
    }
    this.getEleIndiv = function () {
        return this.eleIndiv;
    }
}
PositionOver.prototype.setEleIndiv = function () {
    this.eleIndiv = document.getElementById('indiv');
}
PositionOver.prototype.mButtonOneDrag = '<div href="" id="a1" style="display:none;"></div>' +
    '<div href="" id="a2" style="display:none;"></div>' +
    '<div href="" id="a3" style="display:none;"></div>' +
    '<div href="" id="a4"></div>' +

    '<div href="" id="a5" style="display:none;"></div>' +
    '<div href="" id="a6" style="display:none;"></div>' +
    '<div href="" id="a7" style="display:none;"></div>' +
    '<div href="" id="a8" style="display:none;"></div>' +

    '<div id="itemclose"></div>' +
    '<div id="itemrotate"></div>' +

    '</div>';
PositionOver.prototype.mColor = ["#00c2df", "#00a7cf", "#00698f", "#003764", "#1226aa", "#2b7de1", "#6babe5", "#00aa90", "#008476", "#007582",
    "#006853", "#009d4f", "#4a8b2c", "#77a641", "#f8ea49", "#ffde00", "#ffb700", "#d87900", "#ee7624", "#ff4e00",
    "#e53e30", "#ff5a5a", "#e8004c", "#e60895", "#c129b9", "#922c49", "#f63440", "#d50058", "#d1af22", "#7b98ac",
    "#898bb4", "#d1c782", "#ad9e3d", "#9f912a", "#8b7b18", "#c78a3e", "#976036", "#847870", "#00ae8e", "#0082cc",
    "#00269a", "#4d008c", "#898b8e", "#9e958c", "#a3aaae", "#a7a089", "#7b6856", "#b7a99a", "#decaa4", "#bcc7c4",
    "#ffffff", "#d0d3d4", "#7c868d", "#5b6770", "#212322"];

PositionOver.prototype.mText = '<div class="menufont1" id="menufont1">' +
    '<div id="choosefont">' +
    '<div id="fontselected">A<i>B</i> <img src="" /></div>' +

    '<div id="chofontfamily3">' +
    '<div id="chofontfamily3bg"></div>' +
    '<div id="chofontfamily3hov">' +
    '<ul id="fontother">' +
    fontlist +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div id="texttransform3">' +
    'hH' +
    '</div>' +

    '<div id="color" class="">' +
    '<a class="acolor" id="acolor" href="#ff0000" style="background:#ff0000;">A</a>' +
    '<div id="chocolor3">' +
    '<div id="chocolor3bg"></div>' +
    '<div id="chocolor3hov">' +
    '<ul id="colorother" class="clearfix">' +
    '#colorchain#' +
    '<li><div class="colorcustomize colormore "><input class="colormoreinput" value="#ffffff" style="" /></div></li>' +
    '</ul>' +
    '</div>' +

    '<div id="colorpicker"></div>' +

    '</div>' +
    '</div>' +

    '<div id="malign">' +
    '<img id="malignimg" src="images/m-align.png" alt="layer" />' +
    '<div id="maligndetail">' +
    '<img id="malignleft" src="images/m-align1.png" alt="align left" />' +
    '<img id="maligncenter" src="images/m-align2.png" alt="align center" />' +
    '<img id="malignright" src="images/m-align3.png" alt="align right" />' +
    '<img id="malignjustify" src="images/m-align4.png" alt="align justify" />' +
    '</div>' +
    '</div>' +

    '</div>' +

    '<div class="fontsize3" id="fontsize3">' +
    '<div id="fontsize">' +
    '<div class="fontsize3a"><img src="images/arrow4.png" alt="change font size" /></div>' +
    '<div id="fontresize">' +
    '<div id="fontresizecontr"></div>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div id="layer3">' +
    '<img id="layerotherUp" src="images/layer12.png" alt="layer Up" />' +
    '<img id="layerotherDown" src="images/layer22.png" alt="layer Down" />' +
    '</div>' +

    '<div id="memumore">' +

    '<div class="morespacefont" id="morespacefont">' +
    '<div id="morespacefontbg"></div>' +
    '<div id="fontspace">' +
    '<img id="fontspaceimg" src="images/mfont1.png" />' +
    '<div id="fontrespace">' +
    '<div id="fontrespacecontr"></div>' +
    '</div>' +
    '</div>' +

    '<div id="fontlineheight">' +
    '<img id="fontlineheightimg" src="images/arrow5.png" />' +
    '<div id="fontrelineheight">' +
    '<div id="fontrelineheightcontr"></div>' +
    '</div>' +
    '</div>' +

    '<div id="opacityresize">' +
    '<img id="fontlineheightimg" src="images/arrow55.png" />' +
    '<div id="opacityresizemama">' +
    '<div id="opacityresizecontr"></div>' +
    '</div>' +
    '</div>' +

    '<div class="line1" style="top:62px;"></div> <div class="line1" style="top:115px;"></div>' +

    '<div class="copyitem copyitemclk clearfix" style="top:142px;">Copy <img src="images/iconcopy.png" class="copyitemclk2" alt="copy" /></div>' +

    '</div>' +

    '</div>';

var positionOver = new PositionOver();


function getStyleChange(typeCube, angle, oldX, oldY, mouseOldX, mouseOldY, oldWidth, oldHeight) {
    var typeIdentity, sin, cos, centerOldX, centerOldY;
    angle = parseFloat(angle), oldX = parseFloat(oldX) , oldY = parseFloat(oldY), mouseOldX = parseFloat(mouseOldX),
        mouseOldY = parseFloat(mouseOldY), oldWidth = parseFloat(oldWidth), oldHeight = parseFloat(oldHeight);

    angle *= Math.PI / 180;

    cos = Math.cos(angle)
    sin = Math.sin(angle)

    if( cos < 0 ) {
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
        console.log(newHeight + " _  " + oldHeight);
        switch (typeCube){
            case 3:
            case 5:
                newWidth = typeIdentity === 'cos' ? ((mouseNewX - mouseOldX) * cos  + oldWidth) : ((mouseNewY - mouseOldY) * sin  + oldWidth);
                newHeight = newWidth / oldWidth * oldHeight;
                break;
            case 7:
            case 1:
                newWidth = typeIdentity === 'cos' ? ((mouseOldX - mouseNewX) * cos  + oldWidth) : ((mouseOldY - mouseNewY) * sin  + oldWidth);
                newHeight = newWidth / oldWidth * oldHeight;
                break;
            case 4:
                newWidth = typeIdentity === 'cos' ? ((mouseNewX - mouseOldX) * cos  + oldWidth) : ((mouseNewY - mouseOldY) * sin  + oldWidth);
                newHeight = oldHeight;
                break;
            case 8:
                newWidth = typeIdentity === 'cos' ? (( mouseOldX - mouseNewX) * cos  + oldWidth) : ((mouseOldY - mouseNewY) * sin  + oldWidth);
                newHeight = oldHeight;
                break;
            case 2:
                newHeight = typeIdentity === 'cos' ? ((mouseOldY - mouseNewY) * cos  + oldHeight) : ((mouseNewX - mouseOldX) * sin  + oldHeight);
                newWidth = oldWidth;
                break;
            case 6:
                newHeight = typeIdentity === 'cos' ? ((mouseNewY - mouseOldY) * cos  + oldHeight) : ((mouseOldX - mouseNewX) * sin  + oldHeight);
                newWidth = oldWidth;
                break;
            case 10:
                newWidth = typeIdentity === 'cos' ? ((mouseNewX - mouseOldX) * cos  + oldWidth) : ((mouseNewY - mouseOldY) * sin  + oldWidth);
                break;

        }

        newWidth <= 1 ? (newWidth = 1) : newHeight <= 1 ? (newHeight = 1) : 1;
        deltaLengX = ( newWidth - oldWidth ) / 2;
        deltaLengY = ( newHeight - oldHeight ) / 2;

        switch (typeCube){
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

        newX =  centerNewX - newWidth / 2;
        newY =  centerNewY - newHeight / 2;
        return {newWidth: newWidth, newHeight: newHeight, newX: newX, newY: newY};
    }
    return getStyle;
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

        if(dataElement.getSelected() &&  ghostElement){
            if(elementSelect.hasClass("text")){
                elementSelect.trigger("change");
            }
        }
        isText ? (styleChangeNew = styleChange(mouseX, mouseY, elementSelect)) : (styleChangeNew = styleChange(mouseX, mouseY));
        if(dataElement.getSelected() &&  ghostElement){
            ghostElement.css(getStyleElementObject(styleChangeNew.newX, styleChangeNew.newY, styleChangeNew.newWidth, styleChangeNew.newHeight, rotate));
            elementSelect.css(getStyleElementObject(styleChangeNew.newX, styleChangeNew.newY, styleChangeNew.newWidth, styleChangeNew.newHeight, rotate));
            if(elementSelect.hasClass("text")){
                elementSelect.children(".inner").css("width", styleChangeNew.newWidth);
            }
        }

        dataElement.setStyle(styleChangeNew.newX, styleChangeNew.newY, styleChangeNew.newWidth, styleChangeNew.newHeight, rotate);
        return !1;
    }

    function setEventMouseUp(event) {
        eventDocument.off("mousemove|touchmove", setEventMouseMove).off("mouseup|touchend", setEventMouseUp);
    }

    if(3 == event.which || event.ctrlKey)
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


