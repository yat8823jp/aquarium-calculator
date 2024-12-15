const app       = document.getElementById( 'app' );
const makeWater = document.getElementById( 'makewater' );
const reset     = document.querySelector( '.reset' );

const resultsBoxies = {
	"chalk": document.getElementById( 'result-chalk' ),
	"zicra-benissim": document.getElementById( 'result-zicra-benissim' ),
	"tetra-co2plus": document.getElementById( 'result-tetra-co2plus' ),
}

makeWater.addEventListener( 'input', () => {
	const inputWater = makeWater.value;
	calcDisplay( inputWater );
} );

reset.addEventListener( 'click', () => {
	makeWater.value = '';
	for( const [ key, value ] of objectToArray( resultsBoxies ) ) {
		value.textContent = '';
	}
} );

function objectToArray( object ) {
	const results = Object.entries( object );
	return results;
}

//load JSON to Display.
function calcDisplay( inputWater ) {
	fetch( 'data.json' )
		.then( ( response ) => {
			if ( ! response.ok ) {
				throw new Error(`HTTP error: ${ response.status }`);
			}
			return response.json()
		} )
		.then( ( response ) => {
			calculator( response, inputWater );
		} );
}

// JSON data to calculator.
function calculator( response, inputWater ) {
	const datas = objectToArray( response );
	const inputs = objectToArray( resultsBoxies );
	datas.forEach( ( data, index ) => {
		inputs[index][1].textContent = Math.ceil( ( inputWater * 1000 ) * data[1].medicine / data[1].water * 10 ) / 10;
	} );
}
