// workerd has no MessageChannel; react-dom's scheduler constructs one at
// module scope. Minimal async port pair is enough for renderToString.
if (typeof globalThis.MessageChannel === "undefined") {
  class PortShim {
    otherPort = null;
    onmessage = null;
    postMessage(data) {
      queueMicrotask(() => this.otherPort?.onmessage?.({ data }));
    }
    start() {}
    close() {}
  }
  globalThis.MessageChannel = class MessageChannelShim {
    constructor() {
      this.port1 = new PortShim();
      this.port2 = new PortShim();
      this.port1.otherPort = this.port2;
      this.port2.otherPort = this.port1;
    }
  };
}
