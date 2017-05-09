var controllers = controllers || {};

(function(scope) {

    function addEstate(context) {
        (function add() {
            var component = $('#main');
            (function main() {
                const data = ['ДОБАВИ ИМОТ'];
                $('#main').html('');
                templates.get('main_page_header').then(function(template) {
                    $('#main').append(template(data));
                    templates.get('create_estate_template').then(function(template) {
                        $('#arrow').after(template);
                        templates.get('communication_container').then(function(template) {
                            $('#estate').after(template);
                            attach();
                        });
                    });
                });
            })();

            function attach() {
                var regform = $('#form__register'),
                    submitBtn = $('#reg-submit');
                regform.children('input.form__input--text').addClass('alert');
                submitBtn.removeClass('form__input--submit').addClass('form__input--submit--alert')
                    .attr('disabled', 'disabled');

                function validate(targetId, check) {
                    $(targetId).on('keyup', function(ev) {
                        var target = $(ev.target),
                            value = $(this).val();

                        if (!check.test(value)) {
                            target.addClass('alert');
                        } else {
                            target.removeClass('alert');
                        }
                        if (regform.children('.alert').length === 0) {
                            submitBtn.removeClass('form__input--submit--alert').addClass('form__input--submit')
                                .removeAttr('disabled', 'disabled');
                        } else {
                            submitBtn.removeClass('form__input--submit').addClass('form__input--submit--alert')
                                .attr('disabled', 'disabled');
                        }
                    });
                }

                validate('#price', /[0-9-()+]{6,20}/i);
                validate('#image', /(http(s?))\:\/\//i);

                submitBtn.on('click', function() {
                    let options = {
                        data: {
                            price: $('#price').val(),
                            image: $('#image').val(),
                            info: $('#info').val(),
                            type: $('#type').val(),
                            location: $('#location').val()
                        }
                    };

                    requester.post('/api/estates/add', options).then((res) => {
                        toastr.success(`Estate added!`);
                        setTimeout(function() {
                            context.redirect('#/top');
                        }, 1000);
                    }).catch((err) => toastr.warning(err.statusCode));
                });
            }
        })();
    }
    scope.estates = {
        addEstate
    };
}(controllers));