export function buildMonitorReport(websites) {
  const rows = websites.map(w => `
    <tr>
      <td>${w.name}</td>
      <td>${w.url}</td>
      <td style="color:${w.isOnline ? 'green' : 'red'}">
        ${w.isOnline ? 'ONLINE' : 'OFFLINE'}
      </td>
      <td>${new Date(w.lastCheck).toLocaleString()}</td>
    </tr>
  `).join('');

  return `
    <h2> BÁO CÁO MONITOR WEBSITE</h2>
    <table border="1" cellpadding="8" cellspacing="0">
      <tr>
        <th>Tên website</th>
        <th>URL</th>
        <th>Trạng thái</th>
        <th>Thời gian check</th>
      </tr>
      ${rows}
    </table>
  `;
}
