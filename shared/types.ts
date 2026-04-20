/**
 * Definiciones de tipos para el ecosistema Smart Garden
 */

export interface SensorsData {
  temperature: number | null;
  humidity_air: number | null;
  humidity_soil: number | null;
  light: number | null;
  conductivity: number | null;
  flow_rate: number | null;
  flow_total: number | null;
}

export interface SensorUpdatePayload {
  device_id: string;
  timestamp: string | Date;
  sensors: SensorsData;
}

export interface DeviceCommandPayload {
  device_id: string;
  action: string;
  value: any;
}

export interface CommandConfirmedPayload {
  device_id: string;
  action: string;
  status: string;
  confirmed_at: string | Date;
}
