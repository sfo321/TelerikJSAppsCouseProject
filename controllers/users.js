var controllers = controllers || {};

(function(scope) {
    function login(context) {
        (function login() {
            var component = $('#main');

            $('#main').html('');
            $('#caruzel___container').remove();
            requester.get('/api/cards/all').then((result) => {
                console.log(result);
                templates.get('widget_template').then(function(template) {
                    templates.get('login_template').then(function(tempol) {
                        Handlebars.registerPartial('widget', template);
                        component.prepend(tempol(result));
                        attach();
                    });
                });
            });

            function attach() {
                var regform = $('#form__login'),
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

                validate('#password__login', /^[a-z0-9_-]{6,25}$/i);
                validate('#username__login', /^[a-z0-9_-]{6,25}$/i);

                submitBtn.on('click', function() {
                    let options = {
                        data: {
                            username: $('#username__login').val(),
                            password: $('#password__login').val()
                        }
                    };

                    requester.post('/api/users/login', options).then((res) => {
                        toastr.success(`Login successful!`);
                        setTimeout(function() {
                            context.redirect('#/home');
                        }, 800);
                    }).catch((err) => toastr.warning('Invalid name or password!'));
                });
            }
        })();
    }

    function register(context) {
        (function register() {
            var component = $('#main');

            $('#main').html('');
            $('#caruzel___container').remove();

            requester.get('/api/cards/all').then((result) => {
                templates.get('widget_template').then(function(template) {
                    templates.get('single_template').then(function(tempol) {
                        Handlebars.registerPartial('widget', template);
                        component.prepend(tempol(result));
                        attach();
                    });
                });
            });

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
                        if (target.attr('id') === 'password__again' && $(this).val() !== $('#password__register').val()) {
                            target.addClass('alert');
                        }
                        if (target.attr('id') === 'password__register' && $(this).val() !== $('#password__again').val()) {
                            $('#password__again').addClass('alert');
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

                validate('#firstname__register', /^[a-zA-Z]{3,25}$/i);
                validate('#lastname__register', /^[a-zA-Z]{3,25}$/i);
                validate('#email', /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
                validate('#password__register', /^[a-z0-9_-]{6,25}$/i);
                validate('#password__again', /^[a-z0-9_-]{6,25}$/i);
                validate('#username__register', /^[a-z0-9_-]{6,25}$/i);
                validate('#imageUrl', /(http(s?))\:\/\//i);

                submitBtn.on('click', function() {
                    let options = {
                        data: {
                            firstName: $('#firstname__register').val(),
                            lastName: $('#lastname__register').val(),
                            email: $('#email').val(),
                            username: $('#username__register').val(),
                            password: $('#password__register').val(),
                            gender: $('#gender__type').val(),
                            imageUrl: $('#imageUrl').val()
                        }
                    };

                    requester.post('/api/users', options).then((res) => {
                        toastr.success(`User registerd!`);
                        setTimeout(function() {
                            context.redirect('#/users/login');
                        }, 800);
                    }).catch((err) => toastr.warning(err.statusCode));
                });
            }
        })();
    }
    scope.users = {
        login,
        register
    };
}(controllers));