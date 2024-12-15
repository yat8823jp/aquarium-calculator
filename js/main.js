const app       = document.getElementById( 'app' );
const makeWater = document.getElementById( 'makewater' );
const reset     = document.querySelector( '.reset' );
const items     = document.getElementById( 'items' );

const resultsBoxies = {
	"chalk": document.getElementById( 'result-chalk' ),
	"zicra-benissim": document.getElementById( 'result-zicra-benissim' ),
	"tetra-co2plus": document.getElementById( 'result-tetra-co2plus' ),
	"water-supple": document.getElementById( 'result-water-supple' ),
	"green-f-gold-liquid": document.getElementById( 'result-green-f-gold-liquid' ),
	"eheim-4-in-1": document.getElementById( 'result-eheim-4-in-1' ),
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

init();

function init () {
	calcDisplay( "", "ture" );
}

//load JSON to Display.
function calcDisplay( inputWater, first = false ) {
	fetch( 'data.json' )
		.then( ( response ) => {
			if ( ! response.ok ) {
				throw new Error(`HTTP error: ${ response.status }`);
			}
			return response.json()
		} )
		.then( ( response ) => {
			const datas = objectToArray( response );
			if ( first ) {
				addImgTag( datas );
			}
			calculator( datas, inputWater );
		} );
}

function addImgTag( datas ) {
	const dts = items.querySelectorAll( 'dt' );
	dts.forEach( ( dt, index ) => {
		if( datas[index][1].img ) {
			const imgElemtns = document.createElement('img');
			imgElemtns.src   = datas[index][1].img;
			imgElemtns.alt   = datas[index][0];

			if( datas[index][1].affiliate ) {
				const link = document.createElement('a');
				link.href  = datas[index][1].affiliate;
				link.target = "_blank";
				link.appendChild( imgElemtns );
				dt.prepend( link );
			} else {
				dt.prepend( imgElemtns );
			}
		} else {
			const imgElemtns = document.createElement('img');
			imgElemtns.src   = "./img/noimage.png";
			imgElemtns.alt   = "no image";
			dt.prepend( imgElemtns );
		}
	} );
}

function addLink( datas ) {
	const dts = items.querySelectorAll( 'dt' );
	dts.forEach( ( dt, index ) => {
		if( datas[index][1].affiliate ) {
			const link = document.createElement('a');
			link.href  = datas[index][1].affiliate;
			link.target = "_blank";
			dt.prepend( link );
		}
	} );
}

// JSON data to calculator.
function calculator( datas, inputWater ) {
	const inputs = objectToArray( resultsBoxies );
	datas.forEach( ( data, index ) => {
		inputs[index][1].textContent = Math.ceil( ( inputWater * 1000 ) * data[1].medicine / data[1].water * 10 ) / 10;
	} );
}
