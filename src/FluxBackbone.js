/*
    A thin wrapper around Backbone Model and collection to make sure they are not changed from view or other places.
    All function that mutates the data are stubbed and they can only be changed from inside the dispatchCallback()
    This ensures that the only time data changes is via flux Dispatcher

    dispatchCallback() is registered with Dispatcher to feed data.

 */

    "use strict";

    var _ = require('underscore');
    var Backbone = require('backbone');

    var _immutable = true;

    var DispatcherMixin = {

        setDispatcher: function(dispatcher) {
            this.dispatchToken = dispatcher.register(this.getDispatchCallback());
            return this.dispatchToken;
        },

        dispatchCallback: function(action) {
            // Only dispatchCallback can set/update this model.
            // Override this to update model.
        },

        getDispatchToken: function() {
            return this.dispatchToken;
        },

        removeDispatcher: function(dispatcher) {

            if (this.dispatchToken) {
                dispatcher.unregister(this.dispatchToken);
                this.dispatchToken = null;
            }

        },

        getDispatchCallback: function() {

            var model = this;

            return function() {
                _immutable = false;
                try {
                    model.dispatchCallback.apply(model, arguments);
                } catch (e) {
                    _immutable = true;
                    throw e;
                }
                _immutable = true;
            };
        }

    };


    /* stubs mixin */

    var _model_setters = ["set", "unset", "clear", "fetch", "save", "destroy"],
        _collection_setters = ["sync", "add", "remove", "set", "reset", "push", "pop",
                                "unshift", "shift","fetch","create","sort"];

    var ModelStubs = _.reduce(_model_setters, function(obj, func){
        obj[func] = function() {
            if (_immutable) {
                throw new Error("FluxModel#"+func+" stubbed func called!");
            }
            return Backbone.Model.prototype[func].apply(this, arguments);
        };
        return obj;
    }, {
        constructor: function(attributes, options) {

            var alreadyImmutable =  (_immutable === false);  // when collection creates Model etc.

            _immutable = false;
            try {
                if (options && options.dispatcher) {
                    this.setDispatcher(options.dispatcher);
                }
                Backbone.Model.apply(this, arguments);
            } catch(e) {

                if (!alreadyImmutable)
                    _immutable = true;
                throw e;
            }

            if (!alreadyImmutable)
                _immutable = true;

        }
    });


    var CollectionStubs = _.reduce(_collection_setters, function(obj, func){
        obj[func] = function() {
            if (_immutable) {
                throw new Error("FluxCollection#"+func+" stubbed func called!");
            }
            return Backbone.Collection.prototype[func].apply(this, arguments);
        };
        return obj;
    }, {
        constructor: function(attributes, options) {
            _immutable = false;
            try {
                if (options && options.dispatcher) {
                    this.setDispatcher(options.dispatcher);
                }
                Backbone.Collection.apply(this, arguments);
            } catch(e) {
                _immutable = true;
                throw e;
            }
            _immutable = true;

        },

        _onModelEvent: function(event, model, collection, options) {
            // Do not propogate mount/unmount event to collection from model
            if (event === 'mount' || event === 'unmount' || event == 'update') {
                return;
            }
            Backbone.Collection.prototype._onModelEvent.apply(this, arguments);
        }
    });


    var Model = Backbone.Model.extend(_.extend({}, DispatcherMixin, ModelStubs));
    var Collection = Backbone.Collection.extend(_.extend({}, DispatcherMixin, CollectionStubs, {model: Model}));


    // exports
    module.exports =  {
        Model: Model,
        Collection: Collection
    };


