import net from "net";
import pLimit from "p-limit";

export class Scanner {
  static async scan(
    prefix = "192.168.1",
    start = 100,
    end = 255,
    port = 554,
    timeout = 1000
  ) {
    const limit = pLimit(16);
    const ips = [];
    for (let i = start; i <= end; i++) {
      ips.push(`${prefix}.${i}`);
    }

    const results = await Promise.all(
      ips.map(ip =>
        limit(async () => {
          console.log(`测试 ${ip}:${port}`);
          const ok = await this.testConnect(ip, port, timeout);
          if (ok) {
            console.log(`找到 ${ip}:${port}`);
            return ip;
          }
          return null;
        })
      )
    );

    return results.filter(Boolean);
  }
  /**
   * 测试端口是否开放
   */
  static testConnect(host: string, port: number, timeout: number) {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      let connected = false;

      socket.setTimeout(timeout);

      socket.on("connect", () => {
        connected = true;
        socket.destroy();
        resolve(true);
      });

      socket.on("timeout", () => {
        socket.destroy();
        resolve(false);
      });

      socket.on("error", () => {
        resolve(false);
      });

      socket.connect(port, host);
    });
  }
}
