*****Facts*****:
1. text-align: center --> centers all the inline elements in a form like label, input elements etc.
2. Browser doesn't allow button, input, textarea etc. these elements to inherit font properties from its parents.
   You have to force these elements to inherit the parent's font styles.
    Do: font: inherit;

3. You can send data with GET request with the help of the property `query` on req object. Though it's not recommended.