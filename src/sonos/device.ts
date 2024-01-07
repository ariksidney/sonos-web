export interface Player {
  apiVersion: string;
  capabilities: string[];
  id: string;
  isUnregistered: boolean;
  minApiVersion: string;
  name: string;
  softwareVersion: string;
  websocketUrl: string;
}
