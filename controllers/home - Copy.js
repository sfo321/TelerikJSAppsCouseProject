var controllers = controllers || {};

(function(scope) {
    function all(context) {
        (function carousel() {
            $('#main').html('');
            $("header").after('<div id="caruzel___container"></div>');
            $("#main").append('<div id="cards___container"></div>');
            $("#main").append('<div id="quote___container"></div>');
            $("#main").append('<div id="quote__separator__container"></div>');
            $("#main").append('<div id="gallery___container"></div>');
            var imagesArray,
                incomingImages;
            requester.get('/api/images/all').then((result) => {

                imagesArray = result.splice(0, 5);
                incomingImages = result;

                return new Promise((res, rej) => {
                    templates.get('carousel_template').then(function(template) {
                        res($('#caruzel___container').append(template(imagesArray)));
                    }).then(() => {
                        attach();
                    });
                });
            }).catch((err) => console.log(err.status));

            function attach() {
                $('#carousel_container').on('click', function(ev) {
                    var elements = $('.carrousel__image'),
                        container = $('.carrousel__image__container'),
                        active = $('.carrousel__image--center'),
                        imgSource = imagesArray,
                        imgStorage = incomingImages,
                        len = imgSource.length,
                        target = $(ev.target);

                    if (target.hasClass('fa-chevron-right')) {
                        imgSource.push(imgStorage.shift());
                        imgStorage.push(imgSource.shift());
                        var elementToGo = elements.first(),
                            elementToCome = $("<div><img src=" + imgSource[len - 1].imageUrl + "></div>").addClass('carrousel__image');
                        elementToGo.addClass('shrink--right');
                        container.append(elementToCome.addClass('grow--right'));
                        setTimeout(function() {
                            active.attr('src', imgSource[2].imageUrl);
                            $('.carrousel__title').html(imgSource[2].title);
                            elementToGo.remove();
                            elementToCome.removeClass('grow--right');
                        }, 350);
                    }
                    if (target.hasClass('fa-chevron-left')) {
                        imgSource.unshift(imgStorage.pop());
                        imgStorage.unshift(imgSource.pop());
                        var _elementToGo = $('.carrousel__image:nth-child(5)'),
                            _elementToCome = $("<div><img src=" + imgSource[0].imageUrl + "></div>").addClass('carrousel__image');
                        _elementToGo.addClass('shrink--left');
                        container.prepend(_elementToCome.addClass('grow--left'));
                        setTimeout(function() {
                            active.attr('src', imgSource[2].imageUrl);
                            $('.carrousel__title').html(imgSource[2].title);
                            _elementToGo.remove();
                            _elementToCome.removeClass('grow--left');
                        }, 350);
                    }
                });
            }
        })();

        (function cards() {
            requester.get('/api/cards/all').then((result) => {
                templates.get('card_template').then(function(template) {
                    $('#cards___container').after(template(result));
                })
            }).catch((err) => console.log(err.status));
            var text = 'Vivamus id feugiat ligula. Nulla facilisi. Integer lacus justo, elementum eget consequat a, molestie nec sapien. Quisque tincidunt, nunc vitae adipiscing vulputate';
            templates.get('quote_template').then(function(template) {
                $('#quote___container').after(template(text));
            });
            templates.get('separator_template').then(function(template) {
                $('#quote__separator__container').after(template);
            });
            requester.get('/api/images/all').then((result) => {
                templates.get('gallery_template').then(function(template) {
                    $('#gallery___container').after(template(result));
                });
            }).catch((err) => console.log(err.status));
        }());
    }

    scope.home = {
        all: all
    };
}(controllers));