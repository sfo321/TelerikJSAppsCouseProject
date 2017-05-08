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

        // this.get('#/blog/single', function(context) {
        //     context.redirect('#/blogsingle');
        // });

        // this.get('#/blogsingle', controllers.blog.single);

        // this.get('#/blog/info', function(context) {
        //     context.redirect('#/bloginfo');
        // });

        // this.get('#/bloginfo', controllers.blog.info);

        // this.get('#/gallery/pics', function(context) {
        //     context.redirect('#/pics');
        // });

        // this.get('#/pics', controllers.gallery.pics);

        // this.get('#/gallery', controllers.gallery.gallery);

        // this.get('#/login', function(context) {
        //     context.redirect('#/log');
        // });
        // this.get('#/users/login', function(context) {
        //     context.redirect('#/log');
        // });
        // this.get('#/log', controllers.users.login);

        // this.get('#/register', function(context) {
        //     context.redirect('#/sign-up');
        // });
        // this.get('#/users/register', function(context) {
        //     context.redirect('#/sign-up');
        // });
        // this.get('#/sign-up', controllers.users.register);

    });

    $(function() {
        sammyApp.run('#/');


        $(window).on('resize', function() {
            var win = $(this);
            console.log(win.width());
        });
    });
}());