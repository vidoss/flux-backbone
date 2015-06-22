// __tests__/FluxBackbone-test.js

jest.dontMock('underscore');
jest.dontMock('backbone');
jest.dontMock('../FluxBackbone.js');


describe('FluxBackbone.Model', function(){
	it('calls set() on Model', function(){
		var FluxBackbone = require('../FluxBackbone');
		var model = new FluxBackbone.Model();
		expect( function(){ model.set({test: '123'}); } )
			.toThrow(new Error("FluxModel#set stubbed func called!"));
			
	});
});

describe('FluxBackbone.Collection', function(){
	it('calls set() on Collection', function(){
		var FluxBackbone = require('../FluxBackbone');
		console.log(typeof FluxBackbone.Collection);
		var collection = new FluxBackbone.Collection();
		expect( function(){ collection.fetch(); } )
			.toThrow(new Error("FluxCollection#fetch stubbed func called!"));
			
	});
});