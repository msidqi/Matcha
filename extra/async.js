function test(param){
	return new Promise((resolve, reject) => {
		console.log('promise');
		if (param === 'param')
			resolve('param recieved');
		else
			reject('no param');
	});
}

async function asyncf() {
	try {
		console.log('1');
		const ret = await test('param');
//		console.log(ret);
	}
	catch (err) {
		console.log(err)
	}
}


//console.log("TEST")
//var res;
//test('param')
//.then(function (ret) {console.log("then : " + ret)})
//.catch(function (err) {
//	console.log('ERROR : ' + err);
//});
//console.log("TEST")

asyncf();
