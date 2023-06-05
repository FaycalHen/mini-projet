# Cass

> It rhymes with jax-rs.

A convenience layer to build JSON APIs using
[`Quinn`](https://github.com/quinnjs/quinn).

```js
import { createServer } from 'http';

import cass from 'cass';
import Boom from 'boom'; // `boom` is whitelisted for providing status codes
import { Inject, Provides } from 'nilo';
import { PUT } from 'wegweiser';
import quinn from 'quinn';

import RadioTuner from './tuner';

@Inject(RadioTuner)
class RadioResource {
  constructor(tuner) { this.tuner = tuner; }

  @PUT('/radio/:station')
  setStation(req, params) {
    if (params.station.length > 10) {
      throw new Boom(400, 'Invalid station, max length is 10');
    }
    this.tuner.tuneTo(params.station);
    return { ok: true };
  }
}

const app = cass(RadioResource);
app.graph.scan({ // "scan for dependency providers"
  @Provides(RadioTuner)
  getRadioTuner() {
    return new RadioTuner(process.env.RADIO_FILE || '/dev/null');
  }
});

createServer(quinn(app)).listen(3000);
```
