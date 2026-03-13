// CONFIG SUPABASE
const SUPABASE_URL = 'https://ifgzperqnxoomyvvytzr.supabase.co';
const SUPABASE_API_KEY = 'sb_publishable_s4C8y1rgb321cEF5B969MA_3jMwVpNJ';

// ----------------------------
// FUNCION PARA ENVIAR FORMULARIO
// ----------------------------
function enviarFormulario(event) {
  event.preventDefault(); // esto funciona correctamente
  var formMessage = document.getElementById('formMessage');
  formMessage.textContent = '';
  formMessage.style.color = '';

  var data = {
    email: document.getElementById('email').value,
    subject: document.getElementById('asunto').value,
    message: document.getElementById('mensaje').value,
    name: document.getElementById('nombre').value
  };

  fetch('https://ifgzperqnxoomyvvytzr.supabase.co/rest/v1/forms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'sb_publishable_s4C8y1rgb321cEF5B969MA_3jMwVpNJ',
      'Authorization': 'Bearer sb_publishable_s4C8y1rgb321cEF5B969MA_3jMwVpNJ'
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
    if (!response.ok) throw new Error('Insert error');
    return true;
  })
  .then(function() {
    formMessage.textContent = 'Mensaje enviado';
    formMessage.style.color = 'green';
    document.getElementById('contactForm').reset();
  })
  .catch(function(error) {
    console.error(error);
    formMessage.textContent = 'Error';
    formMessage.style.color = 'red';
  });

  return false; // evita submit normal
}


// ----------------------------
// FUNCION PARA VER MENSAJES EN ADMIN
// ----------------------------
async function verMensajes() {
  const tableBody = document.getElementById('formsBody');
  const status = document.getElementById('status');

  if (!tableBody || !status) return;

  status.textContent = 'Cargando...';

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/forms`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': `Bearer ${SUPABASE_API_KEY}`
      }
    });

    if (!response.ok) throw new Error('Error al cargar');

    const data = await response.json();

    tableBody.innerHTML = '';

    data.forEach(form => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${form.id}</td>
        <td>${form.name}</td>
        <td>${form.email}</td>
        <td>${form.subject}</td>
        <td>${form.message}</td>
        <td>${form.sent_at}</td>
      `;
      tableBody.appendChild(row);
    });

    status.textContent = `Se cargaron ${data.length} registros`;

  } catch (error) {
    console.error(error);
    status.textContent = 'Error al cargar los mensajes';
  }
}


