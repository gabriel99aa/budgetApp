const ingresos = [
    new Ingresos("Salario", 2012569),
    new Ingresos("Venta coche", 68432188)
];

const egresos = [
    new Egresos("Renta departamento", 1126255),
    new Egresos("Ropa", 846620)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngresos = 0;
    for (let ingreso of ingresos) {
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

let totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgresos = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = `${formatoMoneda(presupuesto)}`;
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgresos);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 1 })
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-CO', { style: 'percent', minimumFractionDigits: 2 });
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
        
            <div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${ingreso.descripcion}</div>
                <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(ingreso.valor/totalIngresos())}</div>
                <div class="elemento_eliminar">
                    <button class = 'elemento_eliminar--btn'>
                        <ion-icon name="trash" onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
                    </button>
                </div>
            </div>
        
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

 const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class = 'elemento_eliminar--btn'>
                    <ion-icon name="trash" onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
                </button>    
            </div>
        </div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if (descripcion.value !== '' && valor.value !== ''){
        if (tipo.value === 'ingreso'){
        // El (más) en: +valor.value es una sintaxis resumida en javaScript que remplaza el metodo Number(), 
        // es decir que si la variable valor.value es un String, entonces lo combierte en un Number y si ya es un Number, no altera nada.
        ingresos.push(  new Ingresos(descripcion.value, +valor.value));
        cargarCabecero();
        cargarIngresos();
        }

        else if (tipo.value === 'egreso'){
            egresos.push(new Egresos(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}