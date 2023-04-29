import debug from "debug";

const logger = debug("Apps1");
logger.enabled = true;
export default () => {
  logger.log = console.log.bind(console);
  console.log("logger -------", logger);
  return logger;
};

export const getExtentedLogger = (namespace, logger) =>
  logger.extend(namespace);
