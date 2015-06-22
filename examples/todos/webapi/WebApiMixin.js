/**
 * Created by vdoss on 4/5/15.
 */

    "use strict";

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Constants = require('../constants/Constants');

    var WebApiMixin = _.extend({}, Backbone.Events, {

        dispatch: function(payload) {
            throw "Override WebApiMixin#dispatch() and send payload to your apps dispatcher";
        },

        _dispatch: function(key, response, params) {
            var payload = {actionKey: key, data: response};
            if (params) {
                payload.params = params;
            }
            this.dispatch(payload);
        },

        doRequest: function(method, options) {

            var opts = options ? _.clone(options) : {},
                key = options.key;


            options.success = _.bind(function(resp) {
                if (resp && resp.error) {
                    this._dispatch(Constants.request.ERROR, resp, opts);
                    return;
                }

                this._dispatch(key, resp, opts);
            }, this);

            options.error = _.bind(function(resp) {
                this._dispatch(Constants.request.ERROR, resp, opts);
            }, this);

            this._dispatch(Constants.request.PENDING, opts);

            return this.callSync(method, options);
        },

        callSync: function(method, options) {
            return Backbone.sync.call(this, method, this, options);
        }

    });

    module.exports = WebApiMixin;
