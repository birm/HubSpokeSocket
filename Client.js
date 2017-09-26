import io from 'socket.io-client'; // requires socket io client


/* Spoke - communicate state information with hub using (this).state = {Value}
 * @constructor
 * @param hub_id - the hub's hash, and this item's base hash
 * @param id - identifier for the spoke given the parent
 * @param hostname - the hostname of the server
 */
class Spoke {
    constructor(hub_id, id, hostname) {
        this.hub_id = hub_id
        this.id = hub_id + "-" + id;
        this._state = "";
        this.socket = io(hostname);
        this.socket.on('event', (e) => this.listen(e));
    }

    listen(event) {
        if (event.key == this.hub_id) {
            this._state = event.value;
        }
    }

    set state(value) {
        /* set this hub's state and update hub */
        this._state = value;
        this.socket.emit("event", {
            key: this.id,
            value: value
        });
    }
    get state() {
        /* get parent state */
        // the last hub state is the state we need alyways
        return this._state;
    }

}

/* Hub - communicate state information with spokes using (this).state = {Value}
 * @constructor
 * @param hostname - the hostname of the server
 */
class Hub {
    constructor(hostname) {
        this._state = "";
        // INSECURE HASH FUNCTION to avoid collision
        var dt = new Date().toString(),
            hash = 0;
        for (var i = 0; i < dt.length; i++) {
            var char = dt.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
            hash = Math.abs(hash);
        }
        this.id = hash;
        this.socket = io(hostname);
        this.socket.on('event', (e) => this.listen(e));
    }

    // TODO confirm it won't self trigger. I think storage doesn't apply in window
    listen(event) {
        if (event.key.split("-")[0] == this.id) {
            this._state = event.value;
        }
    }

    set state(value) {
        /* set this hub's state and update spokes*/
        this._state = value;
        this.socket.emit("event", {
            key: this.id,
            value: value
        });
    }
    get state() {
        // the state is the last updated of all states
        return this._state;
    }

}

module.exports = {Hub:Hub, Spoke:Spoke};
