/**
 * Created by Janne on 26.5.2015.
 */
// Local (client-only) errors
Errors = new Mongo.Collection(null);

throwError = function(message) {
    Errors.insert({ message : message});
};