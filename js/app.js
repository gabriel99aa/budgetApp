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
                <div class="elemento_valor">+${ingreso.valor}</div>
                <div class="elemento_eliminar">
                    <button class = 'elemento_eliminar--btn'>
                        <ion-icon name="trash"></ion-icon>
                    </button>
                </div>
            </div>
        
    `;
    return ingresoHTML;
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
                    <ion-icon name="trash"></ion-icon>
                </button>    
            </div>
        </div>
    `;
    return egresoHTML;
}