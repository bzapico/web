export class AssetsForController {
    asset_id: string;
    eic_net_ip: string;
    status: string;
    edge_controller_id: string;

    constructor(asset_id: string, eic_net_ip: string, status: string, edge_controller_id: string) {
        this.asset_id = asset_id;
        this.eic_net_ip = eic_net_ip;
        this.status = status;
        this.edge_controller_id = edge_controller_id;
    }
}
