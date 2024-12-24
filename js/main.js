const app       = document.getElementById( 'app' );
const makeWater = document.getElementById( 'makewater' );
const reset     = document.querySelector( '.reset' );
const items     = document.getElementById( 'items' );
const dts       = items.querySelectorAll( 'dt' );

init();

/*
 * EventListener
 */
makeWater.addEventListener( 'input', () => {
	const inputWater = makeWater.value;
	calcDisplay( inputWater );
} );

reset.addEventListener( 'click', () => {
	makeWater.value = '';
	const dds = items.querySelectorAll( 'dd' );
	items.querySelectorAll( 'dd' ).forEach( ( dd, index ) => {
		const ddChild = dds[index].querySelector( 'span' );
		ddChild.textContent = '';
	} );
} );

/*
 * init
 */
function init () {
	calcDisplay( "", "ture" );
}

function objectToArray( object ) {
	const results = Object.entries( object );
	return results;
}

//load JSON to Display.
function calcDisplay( inputWater, first = false ) {
	fetch( 'data.json' )
	.then( ( response ) => {
		if ( ! response.ok ) {
			throw new Error(`HTTP error: ${ response.status }`);
		}
		return response.json();
	} )
	.then( ( response ) => {
		const datas = objectToArray( response );
		if ( first ) {
			addElemetns( datas );
		}
		calculator( datas, inputWater );
	} );
}

/*
 * addElemetns
 */
function addElemetns( datas ) {
	const dataLength = datas.length;
	for ( let i = 0; i < dataLength; i++ ) {
		const dtElement = document.createElement( 'dt' );
		const ddElement = document.createElement( 'dd' );
		// const spanElements = document.createElement( 'span' );
		dtElement.classList.add( "first" );
		items.appendChild( dtElement );
		items.appendChild( ddElement );
		addTitle( datas[i], dtElement );
		addImg( datas[i], dtElement );
		addSpan( ddElement );
	}
}

function addTitle( data, dt ) {
	dt.textContent = data[1].name;
}

function addImg( data, dt ) {
	if ( data[1].img ) {
		const imgElemtns = document.createElement('img');
		imgElemtns.src   = data[1].img;
		imgElemtns.alt   = data[0];
		if ( data[1].affiliate ) {
			const link = document.createElement('a');
			link.href  = data[1].affiliate;
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
}

function addLink( datas ) {
	dts.forEach( ( dt, index ) => {
		if ( datas[index][1].affiliate ) {
			const link = document.createElement('a');
			link.href  = datas[index][1].affiliate;
			link.target = "_blank";
			dt.prepend( link );
		}
	} );
}

function addSpan( dd ) {
	const spanElement = document.createElement( 'span' );
	spanElement.classList.add( 'result' );
	dd.textContent = " ml";
	dd.prepend( spanElement );
}

// JSON data to calculator.
function calculator( datas, inputWater ) {
	const dds = items.querySelectorAll( 'dd' );
	datas.forEach( ( data, index ) => {
		const ddChild = dds[index].querySelector( 'span' );
		ddChild.textContent = Math.ceil( ( inputWater * 1000 ) * data[1].medicine / data[1].water * 10 ) / 10;
	} );
}
