"use strict";
(function() {

    var sammyApp = Sammy('body', function() {

        this.get('#/', function(context) {
            context.redirect('#/home');
        });

        this.get('#/home', controllers.home.all);

        this.get('#/top_estates', function(context) {
            context.redirect('#/top');
        });

        this.get('#/top', controllers.top.top);

        this.get('#/gallery', controllers.carousel.all);

        this.get('#/estates', controllers.estates.addEstate);

        this.get('#/users/login', function(context) {
            context.redirect('#/login');
        });
        this.get('#/login', controllers.users.login);

        this.get('#/sign-up', controllers.users.register);

        this.get('#/register', function(context) {
            context.redirect('#/sign-up');
        });
        this.get('#/users/register', function(context) {
            context.redirect('#/sign-up');
        });
    });

    $(function() {
        sammyApp.run('#/');
        $(window).on('resize', function() {
            var win = $(this);
            console.log(win.width());
        });
        $('#main-nav').on('mouseenter', '.navigation__list__item', function(ev) {
            var target = $(ev.currentTarget);
            if (target.hasClass('navigation__list__item') && !target.children('.navigation--dropdown').hasClass('navigation--dropdown--show')) {
                target.children('.navigation--dropdown').addClass('navigation--dropdown--show').stop();
            }
            ev.stopPropagation();
            ev.preventDefault();
        });
        $('#main-nav').off('mouseleave');
        $('#main-nav').on('mouseleave', '.navigation__list__item', function(ev) {
            var target = $(ev.currentTarget);
            if (target.hasClass('navigation__list__item') && target.children('.navigation--dropdown').hasClass('navigation--dropdown--show')) {
                target.children('.navigation--dropdown').removeClass('navigation--dropdown--show');
            }
        });

        $('#navresp').on('click', function(ev) {
            var target = $(ev.target),
                nav = $('.navigation--responsive');
            if (target.hasClass('sandwich__image') && !nav.hasClass('is-visible')) {
                nav.removeClass('is-hidden').addClass('is-visible');
            } else if (target.hasClass('sandwich__image') && nav.hasClass('is-visible')) {
                nav.removeClass('is-visible').addClass('is-hidden');
            }
            if (target.hasClass('navigation--responsive__list__item__link')) {
                nav.removeClass('is-visible').addClass('is-hidden');
            }
        });
    });
}());