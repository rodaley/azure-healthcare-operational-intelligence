import { createApp } from "./app.js";
import { loadConfig } from "./config.js";
import { createFileDataStores } from "./repository/dataStores.js";
import { DeterministicDemoProvider } from "./ai/DeterministicDemoProvider.js";
import { generatePresenterCode } from "./presenterCode.js";

const config = loadConfig();
const dataStores = createFileDataStores(config.dataDirectory);
const aiProvider = new DeterministicDemoProvider();

const app = createApp({ config, dataStores, aiProvider });

// Local presenter authentication: generate a temporary presenter access code and
// display it only in the local process console. It is never written to disk and
// expires when this process stops. See prompt/03-API.md, "Local Presenter
// Authentication" and prompt/04-Security.md, "Local Development Security".
const presenterCode = generatePresenterCode();

app.listen(config.port, config.host, () => {
  // eslint-disable-next-line no-console
  console.log(`Azure Healthcare Operational Intelligence API listening on http://${config.host}:${config.port}`);
  // eslint-disable-next-line no-console
  console.log(`Presenter access code (do not share): ${presenterCode}`);
});
