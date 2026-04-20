/**
 * Contrato de comunicación: Eventos y Tópicos
 */
const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  SENSOR_UPDATE: 'sensor:update',
  COMMAND_SEND: 'command:send',
  COMMAND_CONFIRMED: 'command:confirmed',
  ERROR: 'system:error'
};

const MQTT_TOPICS = {
  SENSORS: 'jardin/+/sensores',
  COMMANDS: 'jardin/+/comandos',
  STATUS: 'jardin/+/status'
};

const DEVICE_ACTIONS = {
  WATER_PUMP: 'water_pump',
  LIGHTS: 'lights',
  VENTILATION: 'ventilation'
};

module.exports = {
  SOCKET_EVENTS,
  MQTT_TOPICS,
  DEVICE_ACTIONS
};
