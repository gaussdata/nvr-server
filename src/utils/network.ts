import os from "os";

export class NetworkUtils {

  /**
   * 
   * @returns 
   */
  static getCurrentIpAddress() {
    return (
      Object.values(os.networkInterfaces())
        .flat()
        .find(
          (address) =>
            address && address.family === "IPv4" &&
            !address.internal &&
            address.address !== "127.0.0.1"
        )?.address || null
    );
  }

  /**
   * 
   * @param ip 
   * @returns 
   */
  static getCurrentIArea(ip: string) {
    const segments = ip.split(".");
    return segments.slice(0, 3).join(".");
  }
}