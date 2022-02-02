const ingresos = [
    new Ingresos("Salario", 2012569),
    new Ingresos("Venta coche", 68432188)
];

const egresos = [
    new Egresos("Renta departamento", 1126255),
    new Egresos("Ropa", 84662)
];

let cargarApp = () => {
    cargarCabecero();
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
    return valor.toLocaleString('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits:1})
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-CO', {style : 'percent', minimumFractionDigits: 2});
}