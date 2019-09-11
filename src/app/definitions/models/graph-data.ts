/**
* Model that defines the Graph info needed for creating the GraphData object instance
*/
export class GraphData {
    // Nodes of our graph
    private _nodes: any[];
    // Links of our graph
    private _links: any[];

    constructor(nodes: any[], links: any[]) {
        this._nodes = nodes;
        this._links = links;
    }

    get nodes(): any[] {
        return this._nodes;
    }

    set nodes(value: any[]) {
        this._nodes = value;
    }

    get links(): any[] {
        return this._links;
    }

    set links(value: any[]) {
        this._links = value;
    }

    reset() {
        this._nodes = [];
        this._links = [];
    }
}
