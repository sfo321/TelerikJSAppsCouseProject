var controllers = controllers || {};

(function(scope) {
    function top(context) {
        (function topche() {
            const data = ['ТОП ИМОТИ В ТОП ЛОКАЦИИ'];
            $('#main').html('');
            templates.get('main_page_header').then(function(template) {
                $('#main').append(template(data));
                templates.get('top_estates_template').then(function(template) {
                    requester.get('api/images/all').then((images) => {
                        $('#arrow').after(template(images));
                        templates.get('contact_us_template').then(function(template) {
                            $('#main_icon').after(template);
                            templates.get('communication_container').then(function(template) {
                                $('#contact_us').after(template);
                            });
                        });
                    });
                });
            });
        })();
    }


    scope.top = {
        top
    };
}(controllers));