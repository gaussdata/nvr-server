import os from 'node:os'

export class NetworkUtils {
  /**
   * 获取当前设备的IP地址
   * @returns 当前设备的IP地址
   */
  static getCurrentIpAddress() {
    return (
      Object.values(os.networkInterfaces())
        .flat()
        .find(
          address =>
            address && address.family === 'IPv4'
            && !address.internal
            && address.address !== '127.0.0.1',
        )
        ?.address || null
    )
  }

  /**
   * 获取IP地址所属的区域
   * @param ip IP地址
   * @returns IP地址所属的区域
   */
  static getCurrentIArea(ip: string) {
    const segments = ip.split('.')
    return segments.slice(0, 3).join('.')
  }
}
