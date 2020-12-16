class Calculadora {
	constructor(textoOperadorAtual, textoOperadorAnterior) {
		this.textoOperadorAtual = textoOperadorAtual
		this.textoOperadorAnterior = textoOperadorAnterior
		this.resetar = false
		this.limpa()
	}

	limpa(){
		this.operadorAtual = ''
		this.operadorAnterior = ''
		this.operacao = undefined
	}

	deleta(){
		this.operadorAtual = this.operadorAtual.slice(0, -1)
	}

	escreveNumero(numero){
		if(numero == '.' && this.operadorAtual.includes('.') || numero == 'π' && this.operadorAtual.includes('.')) return

		this.operadorAtual = this.operadorAtual.toString() + numero.toString()
	}

	escolheOperacao(operacao){
		if(this.operadorAtual == '') return
		if(this.operadorAnterior != ''){
			this.calcula()
		}

		this.operacao = operacao
		this.operadorAnterior = this.operadorAtual + this.operacao
		this.operadorAtual = ''
	}

	calcula(){
		var calculo
		const numeroAtual = parseFloat(this.operadorAtual)
		const numeroAnterior = parseFloat(this.operadorAnterior)

		if(isNaN(numeroAnterior)){
			if(this.operadorAtual.includes('π')){
				calculo = Math.PI
				console.log('includes pi')
				this.resetar = true
			} else {
				calculo = numeroAtual
				console.log('does not include pi')
				this.resetar = true
			}
		}

		switch(this.operacao){
			case '+':
				if(isNaN(numeroAtual)) return
				calculo = numeroAnterior + numeroAtual
				break
			case '-':
				if(isNaN(numeroAtual)) return
				calculo = numeroAnterior - numeroAtual
				break
			case '×':
				if(isNaN(numeroAtual)) return
				calculo = numeroAnterior * numeroAtual
				break
			case '*' || '×':
				if(isNaN(numeroAtual)) return
				calculo = numeroAnterior * numeroAtual
				break
			case '÷':
				if(isNaN(numeroAtual)){return} else if(numeroAtual == '0'){
					calculo = 'Impossível dividir por 0'
				} else {
					calculo = numeroAnterior / numeroAtual}
				break
			case '/':
				if(isNaN(numeroAtual)){return} else if(numeroAtual == '0'){
					calculo = 'Impossível dividir por 0'
				} else {
					calculo = numeroAnterior / numeroAtual}
				break
			case '%':
				if(isNaN(numeroAtual)){
					calculo = numeroAnterior/100
				} else {
					calculo = numeroAnterior/100*numeroAtual
				}
				break
			default: return
		}

		this.operadorAtual = calculo
		this.operadorAnterior = ''
		this.operacao = undefined
		this.resetar = true
	}

	atualizaDisplay(){
		this.textoOperadorAtual.innerText = this.operadorAtual
		this.textoOperadorAnterior.innerText = this.operadorAnterior
	}
}

const botoesNumero = document.querySelectorAll('[data-numero]')
const botoesOperacao = document.querySelectorAll('[data-operacao]')
const botaoClear = document.querySelector('[data-clear]')
const botaoIgual = document.querySelector('[data-igual]')
const botaoDelete = document.querySelector('[data-delete]')
const textoOperadorAtual = document.querySelector('[data-operador-atual]')
const textoOperadorAnterior = document.querySelector('[data-operador-anterior]')

const calculadora = new Calculadora(textoOperadorAtual, textoOperadorAnterior)

botoesNumero.forEach(botao => {
    botao.addEventListener('click', () => {
		if(calculadora.resetar){
			calculadora.operadorAtual = ''
			calculadora.resetar = false
			calculadora.escreveNumero(botao.innerText)
			calculadora.atualizaDisplay()
		} else {
        	calculadora.escreveNumero(botao.innerText)
        	calculadora.atualizaDisplay()
		}
		botao.blur()
	})
})

botoesOperacao.forEach(botao => {
	botao.addEventListener('click', () => {
		calculadora.escolheOperacao(botao.innerText)
		calculadora.atualizaDisplay()
	})
})

botaoIgual.addEventListener('click', () => {
	calculadora.calcula()
	calculadora.atualizaDisplay()
})

botaoDelete.addEventListener('click', () => {
	calculadora.deleta()
	calculadora.atualizaDisplay()
})

botaoClear.addEventListener('click', () => {
	calculadora.limpa()
	calculadora.atualizaDisplay()
})

window.addEventListener('keydown', (tecla) => {
	const arrNumeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
	const arrOperacoes = ['+', '-', '×', '*', '÷', '/', '%']

	if(arrNumeros.includes(tecla.key)){
		if(calculadora.resetar){
			calculadora.limpa()
			calculadora.resetar = false
			calculadora.escreveNumero(tecla.key)
			calculadora.atualizaDisplay()
		} else {
			calculadora.escreveNumero(tecla.key)
			calculadora.atualizaDisplay()
		}

	} else if(arrOperacoes.includes(tecla.key)){
		calculadora.escolheOperacao(tecla.key)
		calculadora.atualizaDisplay()

	} else if(tecla.key == '=' || tecla.key == 'Enter'){
		calculadora.calcula()
		calculadora.atualizaDisplay()

	} else if(tecla.key == 'Backspace'){
		calculadora.deleta()
		calculadora.atualizaDisplay()

	} else if(tecla.key == 'C'){
		calculadora.limpa()
		calculadora.atualizaDisplay()
	} else return
})