/**
 * Contrato de comunicación: Eventos y Tópicos
 */
export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  SENSOR_UPDATE: 'sensor:update',
  COMMAND_SEND: 'command:send',
  COMMAND_CONFIRMED: 'command:confirmed',
  ERROR: 'system:error'
};

export const MQTT_TOPICS = {
  SENSORS: 'jardin/+/sensores',
  COMMANDS: 'jardin/+/comandos',
  STATUS: 'jardin/+/status'
};

export const DEVICE_ACTIONS = {
  WATER_PUMP: 'water_pump',
  LIGHTS: 'lights',
  VENTILATION: 'ventilation'
};

// Mantenemos un export default para mayor compatibilidad
export default {
  SOCKET_EVENTS,
  MQTT_TOPICS,
  DEVICE_ACTIONS
};
