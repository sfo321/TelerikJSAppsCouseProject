var controllers = controllers || {};

(function(scope) {
    function all(context) {
        (function main() {
            const data = ['ДОВЕРИЕ', 'КАЧЕСТВО', 'КОРЕКТНОСТ'];
            $('#main').html('');
            templates.get('main_page_header').then(function(template) {
                $('#main').append(template(data));
                templates.get('main_page_we').then(function(template) {
                    $('#arrow').after(template);
                    templates.get('main_icon_container').then(function(template) {
                        requester.get('api/images/all').then((images) => {
                            $('#page_we').after(template(images));
                            templates.get('contact_us_template').then(function(template) {
                                $('#main_icon').after(template);
                                templates.get('communication_container').then(function(template) {
                                    $('#contact_us').after(template);
                                });
                            });
                        });
                    });
                });
            });
        })();
    }

    scope.home = {
        all: all
    };
}(controllers));