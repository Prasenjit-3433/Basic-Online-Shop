*****Facts*****:
1. text-align: center --> centers all the inline elements in a form like label, input elements etc.
2. Browser doesn't allow button, input, textarea etc. these elements to inherit font properties from its parents.
   You have to force these elements to inherit the parent's font styles.
    Do: font: inherit;

3. You can send data with GET request with the help of the property `query` on req object. Though it's not recommended.
4. The custom middleware for adding csrf token should appear after the registered csrf middleware in app.js because
   we use csrfToken() method on req object in custom middleware to generate token, otherwise the method will not be available there.

5. Asynchronous Error Handling: If there is any error happened in any routes, then it'll be handled by default-error
                                handling middleware. But unfortunately, Express ignores errors that are occuring inside
                                of any asynchronous operations.
                                Solution: Use `try-catch` clause. Try async operation in `try` block, if any error
                                occurs then pass the `error` obejct to `next` and execute `next` param inside catch block to forward the request to the default-error-handling middleware.

                                *** When we pass `error` to `next` and execute next like this: next(error);
                                    the default-error-handling middleware will become active.
                                
6. Adding CSRF Token in the form that uploads a file:
         When working with form that contains a file, you have to add the CSRF Token as a `query parameter` on the URl 
         the request is send to. You can add query param by adding an `?` at the end of url, follwed by param-name &
         value as key-value pair.
         e.g: /admin/products?_csrf=<%= locals.csrfToken %>

7. *** Keep in mind that without `Multer` being involved, no body data is parsed Because the default body parser for 
       form data does not work when `enctype` = 'multipart/form-data'. So don't forget to add multer middleware in 
       the post route of the forms that contain any kind of file upload.

8. Note: with the help of links and forms, we can send only `GET` & `POST` request to server. We can't send `PUT`, 
         `PATCH`, `DELETE` requests. It can be done with browser side javascript.
         *** Don't forget to add CSRF Token in the url as a query parameter.

9. Note: There are some naming convension for `data-` attribute in the html element.
         Like: data-productId ---> not correct
               data-productid ---> correct

10. Working with stripe: Stripe offers two types of api:
                         1. The package based api which we'll use in our code.
                         2. The URL-based api to which the package talks.
                         Stripe doesn't allow us to directly send HTTP requests to the URl-based api,
                         Instead the package we installed in our project sends the request to the url behind the scenes.