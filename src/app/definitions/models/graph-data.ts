/**
* Model that defines the Graph info needed for creating the GraphData object instance
*/
export class GraphData<T> {
    /**
     * Nodes of our graph
     */
    private _nodes: T;
    /**
     * Links of our graph
     */
    private _links: T;

    constructor(nodes: T, links: T) {
        this._nodes = nodes;
        this._links = links;
    }

    get nodes(): T {
        return this._nodes;
    }

    set nodes(value: T) {
        this._nodes = value;
    }

    get links(): T {
        return this._links;
    }

    set links(value: T) {
        this._links = value;
    }

    reset(nodes: T, links: T) {
        this._nodes = nodes;
        this._links = links;
    }
}
