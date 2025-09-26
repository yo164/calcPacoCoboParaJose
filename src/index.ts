let currentInput: string = '0';
var operator: string = '';
let previousInput: string = '';
let numeroEnMemoria: string = '';

function appendToDisplay(value: string): void {
    let update = false;
    const signos = ['+', '-', '*', '/', '%', '^2', '^n', 'v2', 'vn', '-1', 'log2', 'log10', 'logn(X)', 'ln', 'abs', 'sen', 'cos', 'tan', 'sec', 'cosec', 'cotan'];
    if (signos.includes(value) ) {
        if (currentInput !== '0' && currentInput !== '') {
            if (previousInput !== '' && operator !== '') {
                calculate();
            }
            previousInput = currentInput;
            operator = value;
            currentInput = '0';
            
        }
    } else {
        update = true;
        //se usa este condicional para meter que si currentInput vale Error
        //para que si escribimos algo despues de Error la pantalla quede a lo que escribimos 
        if ((currentInput === '0' && value !== '.') || currentInput === 'ERROR') {
            currentInput = value; 
        } else {
            currentInput += value;
        }
    }
    if (update) {
        updateDisplay();
    }
}

function updateDisplay(): void {
    const display = document.getElementById('display') as HTMLInputElement;
    if (currentInput === 'pi') {
        const piNumero = Math.PI;
        currentInput = piNumero.toString()
    }else if(currentInput === 'e'){
        const eNumero = Math.E;
        currentInput = eNumero.toString();
    }else if (currentInput === 'phi') {
        const phiNumero = (1 + Math.sqrt(5)) / 2;
        currentInput = phiNumero.toString();
    }

    
    display.value = currentInput;
}

function clearDisplay(): void {
    currentInput = '0';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function deleteLast(): void {
    
    //&& currentInput.slice(0, 5) === 'ERROR' para que aunque escribe numeros despues de ERROR
    //dandole a delete nos deje la pantalla a 0 como cuando solo está ERROR 
    if (currentInput.length > 1 && currentInput !== 'ERROR') {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate(calculatorAux?:String): void {
    const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result: number =0;
    if (operator !== '' && currentInput !== '' && previousInput !== '' ) {
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '%':
                result = prev % current;
                break;
            case '/':
                result = prev / current; 
                break;
            case '^n':
                result = Math.pow(prev, current); 
                break;
            case 'vn':
                result = Math.pow(prev, (1 / current)); 
                break;
            case 'logn(X)':
                result = logNdX(prev, current); 
                break;
                //hasta aqui
            default:
                return;
        } 
    } else if(calculatorAux !== '') {
        const calcular = parseFloat(currentInput);
        switch (calculatorAux) {
           
            case '^2':
                result = Math.pow(calcular, 2); 
                break;
            
            case 'v2':
                result = Math.sqrt(calcular) 
                break;
           
            case '-1':
                result = calcular * -1; 
                break;
            case 'log2':
                result = Math.log2(calcular); 
                break;
            case 'log10':
                result = Math.log10(calcular); 
                break;
          
            case 'ln':
                result = Math.log(calcular); 
                break;
            case 'abs':
                result = Math.abs(calcular); 
                break;
            case 'sen':
                result = Math.sin(gradianes(calcular)); 
                break;
            case 'cos':
                result = Math.cos(gradianes(calcular)); 
                break;
            case 'tan':
                result = Math.tan(gradianes(calcular)); 
                break;
            case 'sec':
                result = 1 / Math.cos(gradianes(calcular)); 
                break;
            case 'cosec':
                result = 1 / Math.sin(gradianes(calcular)); 
                break;
            case 'cotan':
                result = 1 / Math.tan(gradianes(calcular)); 
                break;
                //hasta aqui
            default:
                return;
        } 
    }
        if (result === Infinity || Number.isNaN(result) ) {
        currentInput = 'ERROR';
        operator = '';
        previousInput = '';
        updateDisplay();
        } else {
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay();
        }  
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    setupEventListeners();
    iniciarReloj();
});

function setupEventListeners(): void {
    const buttonsContainer = document.querySelectorAll<HTMLDivElement>('.buttons');
    
    if (buttonsContainer) {

        buttonsContainer.forEach(container => {
            container.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            
            if (target.tagName === 'BUTTON') {
                const action = target.dataset.action;
                const value = target.dataset.value;
                //aqui es donde creo que tengo que tocar para decir que cuando haga por ejemplo
                //algo al cuadrado solo dando al action del cuadrado entre en calculate teniendo ya 
                //operator
                    if (value === '^2'){
                        calculate(value);
                    }else  if (value === 'v2'){
                        calculate(value);
                    }else  if (value === '-1'){
                        calculate(value);
                    }else  if (value === 'log2'){
                        calculate(value);
                    }else  if (value === 'log10'){
                        calculate(value);
                    }else  if (value === 'ln'){
                        calculate(value);
                    }else  if (value === 'abs'){
                        calculate(value);
                    }else  if (value === 'sen'){
                        calculate(value);
                    }else  if (value === 'cos'){
                        calculate(value);
                    }else  if (value === 'tan'){
                        calculate(value);
                    }else  if (value === 'sec'){
                        calculate(value);
                    }else  if (value === 'cosec'){
                        calculate(value);
                    }else  if (value === 'cotan'){
                        calculate(value);
                    }else if (value === 'clear') {
                        clearDisplay();
                    } else if (value === 'delete') {
                        deleteLast();
                    } else if (value === 'calculate') {
                        calculate();
                    }else if (action === 'mr' || action === 'm') {
                        //variable igual a lo que valga en ese momento currentInput
                        memorizarNumero(action);
                    } else if (value) {
                        appendToDisplay(value);
                    }else if (value && action) {
                    
                        calculate();
                    }
                }
            });
        });
        
    }
}

function memorizarNumero(value: string) {
    
    if (value === 'mr') {
         numeroEnMemoria = currentInput;
        
    }else{
        currentInput = numeroEnMemoria; 
        updateDisplay();
    }

}

function logNdX(base: number, numero: number): number {
    return Math.log(numero) / Math.log(base)
}

function gradianes(angulo: number): number{
    return angulo/(Math.PI/180);
}
function iniciarReloj(): void {
    const horaElemento = document.getElementById('hora');
    if (!horaElemento) return;
    function actualizarHora() {
        const ahora = new Date();
        if (horaElemento) {
            horaElemento.textContent = ahora.toLocaleTimeString();
        }
    }
    actualizarHora(); 
    setInterval(actualizarHora, 1000); 
}

//REVISA QUE CUANDO TENGAS UN NUMERO Y PRESIONES UN NUMERO IRREAL LO SUSTITUYA POR EL VALOR DEL NUEMRO IRREAL
// YT NO AÑADA EL DATA-VALUE(MIRA EL LA PARTE QUE CONTROLA VALOR Y ACCION DE CADA BOTON Y PON UN ACONCICION DE SI
//VALOR === PI ENTONCES UPDATEDISPLAY A VER QUE HACE)

//quita logaritmo neperiano y mete los botones de trigonometria dentro de los sci que solo añade una linea mas y los pongo con otro color o algo