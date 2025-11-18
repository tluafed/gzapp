// Mock API layer for video monitor management.
// Replace placeholders with real request logic when backend is ready.
const delay = (result, ms = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(result), ms))

export function fetchAvailableDevices() {
  // Should call backend to retrieve unbound devices.
  return delay([
    { id: 'dev-101', name: '监控点-1', location: '工点A' },
    { id: 'dev-102', name: '监控点-2', location: '工点B' },
    { id: 'dev-103', name: '监控点-3', location: '工点C' }
  ])
}

export function bindMonitorDevice({ boreholeId, deviceId }) {
  // Should post binding request to backend.
  return delay({
    success: true,
    monitor: {
      id: `monitor-${deviceId}`,
      boreholeId,
      deviceId,
      deviceName: `设备-${deviceId}`,
      status: 'online'
    }
  })
}

export function unbindMonitorDevice({ monitorId }) {
  // Should notify backend to unbind device.
  return delay({ success: true, monitorId })
}

export function exportMonitorVideo({ deviceId, startTime, endTime }) {
  // Should request backend to generate export task.
  return delay({
    success: true,
    url: `https://example.com/export/${deviceId}?from=${startTime}&to=${endTime}`
  }, 800)
}

