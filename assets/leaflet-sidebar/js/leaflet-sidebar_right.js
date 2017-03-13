/**
 * @name Sidebar
 * @class L.Control.Sidebar
 * @extends L.Control
 * @param {string} id - The id of the sidebar_right element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar_right: 'left' or 'right'
 * @see L.control.sidebar_right
 */
L.Control.Sidebar = L.Control.extend(/** @lends L.Control.Sidebar.prototype */ {
    includes: L.Mixin.Events,

    options: {
        position: 'left'
    },

    initialize: function (id, options) {
        var i, child;

        L.setOptions(this, options);

        // Find sidebar_right HTMLElement
        this._sidebar_right = L.DomUtil.get(id);

        // Attach .sidebar_right-left/right class
        L.DomUtil.addClass(this._sidebar_right, 'sidebar_right-' + this.options.position);

        // Attach touch styling if necessary
        if (L.Browser.touch)
            L.DomUtil.addClass(this._sidebar_right, 'leaflet-touch');

        // Find sidebar_right > div.sidebar_right-content
        for (i = this._sidebar_right.children.length - 1; i >= 0; i--) {
            child = this._sidebar_right.children[i];
            if (child.tagName == 'DIV' &&
                    L.DomUtil.hasClass(child, 'sidebar_right-content'))
                this._container = child;
        }

        // Find sidebar_right ul.sidebar_right-tabs > li, sidebar_right .sidebar_right-tabs > ul > li
        this._tabitems = this._sidebar_right.querySelectorAll('ul.sidebar_right-tabs > li, .sidebar_right-tabs > ul > li');
        for (i = this._tabitems.length - 1; i >= 0; i--) {
            this._tabitems[i]._sidebar_right = this;
        }

        // Find sidebar_right > div.sidebar_right-content > div.sidebar_right-pane
        this._panes = [];
        this._closeButtons = [];
        for (i = this._container.children.length - 1; i >= 0; i--) {
            child = this._container.children[i];
            if (child.tagName == 'DIV' &&
                L.DomUtil.hasClass(child, 'sidebar_right-pane')) {
                this._panes.push(child);

                var closeButtons = child.querySelectorAll('.sidebar_right-close');
                for (var j = 0, len = closeButtons.length; j < len; j++)
                    this._closeButtons.push(closeButtons[j]);
            }
        }
    },

    /**
     * Add this sidebar_right to the specified map.
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
     * Removes this sidebar_right from the map.
     * @param {L.Map} map
     * @returns {Sidebar}
     */
     removeFrom: function(map) {
         console.log('removeFrom() has been deprecated, please use remove() instead as support for this function will be ending soon.');
         this.remove(map);
     },

    /**
     * Remove this sidebar_right from the map.
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
     * Open sidebar_right (if necessary) and show the specified tab.
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

        // open sidebar_right (if necessary)
        if (L.DomUtil.hasClass(this._sidebar_right, 'collapsed')) {
            this.fire('opening');
            L.DomUtil.removeClass(this._sidebar_right, 'collapsed');
        }

        return this;
    },

    /**
     * Close the sidebar_right (if necessary).
     */
    close: function() {
        // remove old active highlights
        for (var i = this._tabitems.length - 1; i >= 0; i--) {
            var child = this._tabitems[i];
            if (L.DomUtil.hasClass(child, 'active'))
                L.DomUtil.removeClass(child, 'active');
        }

        // close sidebar_right
        if (!L.DomUtil.hasClass(this._sidebar_right, 'collapsed')) {
            this.fire('closing');
            L.DomUtil.addClass(this._sidebar_right, 'collapsed');
        }

        return this;
    },

    /**
     * @private
     */
    _onClick: function() {
        if (L.DomUtil.hasClass(this, 'active'))
            this._sidebar_right.close();
        else if (!L.DomUtil.hasClass(this, 'disabled'))
            this._sidebar_right.open(this.querySelector('a').hash.slice(1));
    },

    /**
     * @private
     */
    _onCloseClick: function () {
        this.close();
    }
});

/**
 * Creates a new sidebar_right.
 *
 * @example
 * var sidebar_right = L.control.sidebar_right('sidebar_right').addTo(map);
 *
 * @param {string} id - The id of the sidebar_right element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar_right: 'left' or 'right'
 * @returns {Sidebar} A new sidebar_right instance
 */
L.control.sidebar_right = function (id, options) {
    return new L.Control.Sidebar(id, options);
};