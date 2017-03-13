/**
 * @name Sidebar
 * @class L.Control.Sidebar
 * @extends L.Control
 * @param {string} id - The id of the sidebar_left element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar_left: 'left' or 'right'
 * @see L.control.sidebar_left
 */
L.Control.Sidebar = L.Control.extend(/** @lends L.Control.Sidebar.prototype */ {
    includes: L.Mixin.Events,

    options: {
        position: 'left'
    },

    initialize: function (id, options) {
        var i, child;

        L.setOptions(this, options);

        // Find sidebar_left HTMLElement
        this._sidebar_left = L.DomUtil.get(id);

        // Attach .sidebar_left-left/right class
        L.DomUtil.addClass(this._sidebar_left, 'sidebar_left-' + this.options.position);

        // Attach touch styling if necessary
        if (L.Browser.touch)
            L.DomUtil.addClass(this._sidebar_left, 'leaflet-touch');

        // Find sidebar_left > div.sidebar_left-content
        for (i = this._sidebar_left.children.length - 1; i >= 0; i--) {
            child = this._sidebar_left.children[i];
            if (child.tagName == 'DIV' &&
                    L.DomUtil.hasClass(child, 'sidebar_left-content'))
                this._container = child;
        }

        // Find sidebar_left ul.sidebar_left-tabs > li, sidebar_left .sidebar_left-tabs > ul > li
        this._tabitems = this._sidebar_left.querySelectorAll('ul.sidebar_left-tabs > li, .sidebar_left-tabs > ul > li');
        for (i = this._tabitems.length - 1; i >= 0; i--) {
            this._tabitems[i]._sidebar_left = this;
        }

        // Find sidebar_left > div.sidebar_left-content > div.sidebar_left-pane
        this._panes = [];
        this._closeButtons = [];
        for (i = this._container.children.length - 1; i >= 0; i--) {
            child = this._container.children[i];
            if (child.tagName == 'DIV' &&
                L.DomUtil.hasClass(child, 'sidebar_left-pane')) {
                this._panes.push(child);

                var closeButtons = child.querySelectorAll('.sidebar_left-close');
                for (var j = 0, len = closeButtons.length; j < len; j++)
                    this._closeButtons.push(closeButtons[j]);
            }
        }
    },

    /**
     * Add this sidebar_left to the specified map.
     *
     * @param {L.Map} map
     * @returns {Sidebar}
     */
    addTo: function (map) {
        var i, child;

        this._map = map;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            var sub = child.querySelector('a');
            if (sub.hasAttribute('href') && sub.getAttribute('href').slice(0,1) == '#') {
                L.DomEvent
                    .on(sub, 'click', L.DomEvent.preventDefault )
                    .on(sub, 'click', this._onClick, child);
            }
        }

        for (i = this._closeButtons.length - 1; i >= 0; i--) {
            child = this._closeButtons[i];
            L.DomEvent.on(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    /**
     * @deprecated - Please use remove() instead of removeFrom(), as of Leaflet 0.8-dev, the removeFrom() has been replaced with remove()
     * Removes this sidebar_left from the map.
     * @param {L.Map} map
     * @returns {Sidebar}
     */
     removeFrom: function(map) {
         console.log('removeFrom() has been deprecated, please use remove() instead as support for this function will be ending soon.');
         this.remove(map);
     },

    /**
     * Remove this sidebar_left from the map.
     *
     * @param {L.Map} map
     * @returns {Sidebar}
     */
    remove: function (map) {
        var i, child;

        this._map = null;

        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            L.DomEvent.off(child.querySelector('a'), 'click', this._onClick);
        }

        for (i = this._closeButtons.length - 1; i >= 0; i--) {
            child = this._closeButtons[i];
            L.DomEvent.off(child, 'click', this._onCloseClick, this);
        }

        return this;
    },

    /**
     * Open sidebar_left (if necessary) and show the specified tab.
     *
     * @param {string} id - The id of the tab to show (without the # character)
     */
    open: function(id) {
        var i, child;

        // hide old active contents and show new content
        for (i = this._panes.length - 1; i >= 0; i--) {
            child = this._panes[i];
            if (child.id == id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        // remove old active highlights and set new highlight
        for (i = this._tabitems.length - 1; i >= 0; i--) {
            child = this._tabitems[i];
            if (child.querySelector('a').hash == '#' + id)
                L.DomUtil.addClass(child, 'active');
            else if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        this.fire('content', { id: id });

        // open sidebar_left (if necessary)
        if (L.DomUtil.hasClass(this._sidebar_left, 'collapsed')) {
            this.fire('opening');
            L.DomUtil.removeClass(this._sidebar_left, 'collapsed');
        }

        return this;
    },

    /**
     * Close the sidebar_left (if necessary).
     */
    close: function() {
        // remove old active highlights
        for (var i = this._tabitems.length - 1; i >= 0; i--) {
            var child = this._tabitems[i];
            if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        // close sidebar_left
        if (!L.DomUtil.hasClass(this._sidebar_left, 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(this._sidebar_left, 'collapsed');
        }

        return this;
    },

    /**
     * @private
     */
    _onClick: function() {
        if (L.DomUtil.hasClass(this, 'active'))
            this._sidebar_left.close();
        else if (!L.DomUtil.hasClass(this, 'disabled'))
            this._sidebar_left.open(this.querySelector('a').hash.slice(1));
    },

    /**
     * @private
     */
    _onCloseClick: function () {
        this.close();
    }
});

/**
 * Creates a new sidebar_left.
 *
 * @example
 * var sidebar_left = L.control.sidebar_left('sidebar_left').addTo(map);
 *
 * @param {string} id - The id of the sidebar_left element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar_left: 'left' or 'right'
 * @returns {Sidebar} A new sidebar_left instance
 */
L.control.sidebar_left = function (id, options) {
    return new L.Control.Sidebar(id, options);
};