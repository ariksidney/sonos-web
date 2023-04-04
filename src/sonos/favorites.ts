import { service } from "./service";

export interface favorite {
    id: string,
    name: string,
    description?: string,
    imageUrl?: string
    service: service,
    resource: resource
}

export interface favoritesList {
    version: string
    items: Array<favorite>;
}

export interface favoritesByType {
    type: string,
    items: Array<favorite>
}

export interface resource {
    type: string,
}