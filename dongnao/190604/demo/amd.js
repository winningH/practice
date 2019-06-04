define([], function(require, factory) {
	'use strict';
	return {
		add: function(a, b) {
			console.log(a+b)
		},
		sub: function(a, b) {
			console.log(a-b)
		}
	}
});