/**
 * @class Ext.ux.Badge
 * @extends Ext.BoxComponent
 * @xtype ux_badge
 */
Ext.ux.Badge = Ext.extend(Ext.BoxComponent, {
   /**
    * @cfg {String} baseCls
    * The base CSS class to apply to the badgeelement (defaults to 'ux-badge')
    */
    baseCls: 'ux-badge',

    /**
    * @cfg {String} position
    * The position is used to anchor to the container (defaults to undefined)
    */
    position: undefined,

    /**
    * @cfg {Boolean} animate
    * True to animate the badge during transitions (defaults to true)
    */
    animate: true,

    /**
    * @cfg {Number} animateDistance
    * How far to move the badge (defaults to 10)
    */
    animateDistance: 10,
    
    /**
    * @cfg {Number} animateDelayTime
    * delay to update the badge value (defaults to 350)
    */
    animateDelayTime: 350,

    // private
    onRender: function(ct, position) {
    	var me = this;
        var tpl = new Ext.Template(
            '<span class="{cls}">',
            '</span>'
        );

        me.el = position ? tpl.insertBefore(position, {cls: this.baseCls}, true)
            : tpl.append(ct, {cls: this.baseCls}, true);
                
        if(me.id){
            me.el.dom.id = me.id;
        }
    },
    
    // private
    afterRender: function() {
    	var me = this;
        Ext.ux.Badge.superclass.afterRender.call(me);
        if(me.value){
            me.el.update(me.value);
        }
        if (me.position) {
        	me.anchorTo(me.position);
        }
    },

    /**
     * Updates the badge value.
     * @param {String} value (optional) The string to display (defaults to 0)
     * @param {Boolean} force (optional) force to update value
     * @return {Ext.ux.Badge} this
     */
    updateText: function(value, force){
    	var me = this, badge = me.el,
    	shouldUpdatevalue = force === true || (Ext.isDefined(value) && (me.value != value));
        me.value = value || 0;
 
        if(me.rendered && !me.isDestroyed && shouldUpdatevalue) {
			if (me.animate) {
				badge.addClass('ux-badge-animate-up');
				badge.move('up', me.animateDistance);
			}
			badge.update.defer(me.animateDelayTime || 350, badge , [me.value]);
			if (me.animate) {
				badge.removeClass.defer(me.animateDelayTime || 350, badge, ['ux-badge-animate-up']);
				badge.move.defer(me.animateDelayTime || 350, badge, ['down', me.animateDistance]);
			}
        }
        return me;
    },
    anchorTo: function(position, offset, animate, monitorScroll, callback) {
    	var me = this, badge = me.el;
    	badge.anchorTo(me.container, position, offset, animate, monitorScroll, callback);
    }
});
Ext.reg('ux_badge', Ext.ux.Badge);