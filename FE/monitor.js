async function loadWebsites() {
      try {
        const response = await fetch('http://localhost:3000/websites');
        const data = await response.json();

        const tbody = document.getElementById('website-table');
        tbody.innerHTML = '';

        if (data.length === 0) {
          tbody.innerHTML = '<tr><td colspan="5">Chưa có website nào</td></tr>';
          return;
        }

        data.forEach(site => {
          const statusClass = site.isOnline ? 'online' : 'offline';
          const statusText = site.isOnline ? 'ONLINE' : 'OFFLINE';

          const row = `
            <tr>
              <td>${site.id}</td>
              <td>${site.name}</td>
              <td>
                <a href="${site.url}" target="_blank">${site.url}</a>
              </td>
              <td class="${statusClass}">${statusText}</td>
              <td>${site.responsible?.name || 'Chưa gán'}</td>
            </tr>
          `;

          tbody.innerHTML += row;
        });

      } catch (error) {
        document.getElementById('website-table').innerHTML =
          '<tr><td colspan="5">Không kết nối được backend</td></tr>';
      }
    }

    // Load khi mở trang
    loadWebsites();

    // Tự refresh mỗi 10 giây
    setInterval(loadWebsites, 10000);