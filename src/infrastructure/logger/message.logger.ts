export function createConsoleMessage(info: any): string {
  const traceId = info['traceId'];
  const terminal = info['terminal'];
  const timestamp = info['timestamp'];
  const message = info.message;

  const logContext = info['0'][0] || '???';
  const logLevel = info.level.toUpperCase();

  const formattedLogContext = logContext.padEnd(30, ' ');
  const formattedLogLevel = logLevel.padEnd(5, ' ');

  let logLine = `${timestamp} | ${formattedLogLevel} | ${formattedLogContext} | `;

  if (traceId) {
    logLine += `ID::${traceId} | `;
  }

  if (terminal) {
    logLine += `TERMINAL::${terminal} | `;
  }

  logLine += `${message}`;

  return logLine;
}
