// InventoryLocation defines the location of a device, ec or asset
export interface InventoryLocation {
    // geolocation defines the location
    geolocation?: string;
    // geohash defines the location using a short alphanumeric string
    geohash?: string;
}
