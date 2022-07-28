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
                                