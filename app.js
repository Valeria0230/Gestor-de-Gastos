// Variables
const nombreInput = document.getElementById('nombre');
const montoInput = document.getElementById('monto');
const btnGuardar = document.getElementById('btnGuardar');
const lista = document.getElementById('lista');
const totalSpan = document.getElementById('total');

let gastos = JSON.parse(localStorage.getItem('misGastos')) || [];
let editandoIndex = -1;

function mostrarGastos() {
  lista.innerHTML = '';
  let total = 0;

  gastos.forEach((gasto, index) => {
    total += parseFloat(gasto.monto);

    const li = document.createElement('li');
    li.innerHTML = `
      <span><b>${gasto.nombre}</b> - $${gasto.monto}</span>
      <div>
        <button onclick="editarGasto(${index})">Editar</button>
        <button onclick="borrarGasto(${index})" style="background:#ef4444; margin-left:5px;">Borrar</button>
      </div>
    `;
    lista.appendChild(li);
  });

  totalSpan.textContent = total;
  localStorage.setItem('misGastos', JSON.stringify(gastos));
}

function guardarGasto() {
  const nombre = nombreInput.value.trim();
  const monto = montoInput.value.trim();

  if (nombre === '' || monto === '') {
    alert('Llena los dos campos');
    return;
  }

  if (editandoIndex === -1) {
    // CREAR - Guardar datos
    gastos.push({ nombre, monto: parseFloat(monto) });
  } else {
    // ACTUALIZAR - Actualizar datos
    gastos[editandoIndex] = { nombre, monto: parseFloat(monto) };
    editandoIndex = -1;
    btnGuardar.textContent = 'Guardar';
  }

  nombreInput.value = '';
  montoInput.value = '';
  mostrarGastos();
}

function borrarGasto(index) {
  // BORRAR - Borrar datos
  if (confirm('¿Borrar este gasto?')) {
    gastos.splice(index, 1);
    mostrarGastos();
  }
}

function editarGasto(index) {
  // RECUPERAR - Obtener datos para editar
  nombreInput.value = gastos[index].nombre;
  montoInput.value = gastos[index].monto;
  editandoIndex = index;
  btnGuardar.textContent = 'Actualizar';
}


btnGuardar.addEventListener('click', guardarGasto);

mostrarGastos();
