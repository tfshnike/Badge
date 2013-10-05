var EL = Ext.Element;
//Ext.get('elid').addBadge(5, 'br-br', null, true)
EL.addMethods({
	addBadge: function(num, position, offset, animate, monitorScroll, callback) {
		var me = this, badge = null, shouldUpdateNum = false, originalNum = me.badge.num;
		me.badge = me.badge || me.createChild({tag: 'span', html: num});
		badge = me.badge;
		shouldUpdateNum = Ext.isDefined(num) && (badge.num != num);
		Ext.apply(badge, {
			num: Ext.isDefined(num) ? num : badge.num,
			position: Ext.isDefined(position) ? position : badge.position,
			offset: Ext.isDefined(offset) ? offset : badge.offset,
			doAnimate: Ext.isDefined(animate) ? animate : badge.doAnimate,
			monitorScroll: Ext.isDefined(monitorScroll) ? num : badge.monitorScroll,
			callback: Ext.isDefined(callback) ? callback : badge.callback
		});
		var updateFn = function() {
			if (shouldUpdateNum) {
				badge.update(badge.num);
			}
		};
		updateFn();
		badge.anchorTo(me, badge.position, badge.offset, false, badge.monitorScroll, null);
		if (!shouldUpdateNum) {
			return badge;
		}

		if (shouldUpdateNum) {
			badge.update(originalNum);
		}
		if (badge.doAnimate) {
			var animateCallBack = badge.animate.createDelegate(badge, [
	    		{
	        		opacity: {to: 1, from: 0.3},
	        		top  : {by: 10, unit: 'px'}
	    		},
	    		0.35,      // animation duration
	    		badge.callback,      // callback
	    		'easein', // easing method
	    		'run'      // animation type ('run','color','motion','scroll')
			]);
			var animUpdateFn = updateFn.createSequence(animateCallBack, badge);
		
			badge.animate(
	    		{
	        		opacity: {to: 0.3, from: 1},
	        		top  : {by: -10, unit: 'px'}
	    		},
	    		0.35,      // animation duration
	    		animUpdateFn,      // callback
	    		'easeOut', // easing method
	    		'run'      // animation type ('run','color','motion','scroll')
			);
		} else {
			updateFn();
		}
		
		return badge; 
	},
	anchorBadgeTo: function(position, offset, animate, monitorScroll, callback) {
		var me = this;
		return me.addBadge(undefined, position, offset, animate, monitorScroll, callback);
	},
	setBadgeNumber: function(num, animate) {
		var me = this;
		return me.addBadge(num, undefined, undefined, animate, undefined, undefined);
	},
	removeBadge: function() {
		Ext.destroy(this.badge);
		delete this.badge;
	}
});