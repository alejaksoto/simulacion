var micro = {
	microbios: 0,
	microbios_exist: 0,
	min: 1000,
	max: 3000,
	m: 0,
	efect_m: 10,
	muert_seg_min: 500,
	muert_seg_max: 2500,
	segundos: 0,
	naci: 0,
	muerte: 0,
	after: 0,
	before: 0,
	initial: function(){
		var array = new Array();
		window.graf = {"obj": array,"tittle": ""};
		window.graf.obj = new Array();
		window.graf.obj.push(["Segundos","Nacimiento","Muerte","Microbios","Microbios-antes M","Microbios-despues M","Cantidad de M"])
		this.microbios= 0;
		this.microbios_exist= 0;
		this.min= 1000;
		this.max= 3000;
		this.m= 0;
		this.efect_m= 10;
		this.muert_seg_min= 500;
		this.muert_seg_max= 2500;
		this.segundos= 0;
		this.naci= 0;
		this.muerte= 0;
		this.after= 0;
		this.before= 0;
	},
	run: function(table_target){
		this.initial();
		table_target.html("");
		while(true){
			this.cicloVida();
			this.apliM(this.m);
			window.graf.obj.push([String(this.segundos),this.naci,this.muerte,this.microbios,this.after,this.before,this.m]);
			table_target.append(window.table({segundos: this.segundos,nacimiento: this.naci,muerte: this.muerte,microbios: this.microbios, microbiosAntesM: this.after, microbiosDespuesM: this.before, m: this.m}));
			if(this.microbios<=0){
				return true;
			}
			this.segundos = this.segundos+1;
			this.m = this.m+10;
		}
	},
	cicloVida: function(){
		this.muerteNatural();
		this.nacimiento();
	},
	nacimiento: function(){
		this.naci = Math.round(Math.random() * (this.max - this.min) + this.min);
		this.microbios = this.microbios + this.naci;
		this.microbios_exist = this.microbios_exist+this.microbios;
	},
	apliM: function(m){
		this.after = this.microbios;
		this.microbios = this.microbios-(m * 10);
		if(this.microbios<0){
			this.microbios = 0;
		}
		this.before = this.microbios;
	},
	muerteNatural: function(){
		this.muerte = Math.round(Math.random() * (this.muert_seg_max - this.muert_seg_min) + this.muert_seg_min);
		this.microbios = this.microbios-this.muerte;
		if(this.microbios<0){
			this.microbios = 0;
		}
	}
}

var energia = {
	mw: 0,
	consumo: 0,
	consumo_max: 40,
	consumo_min: 10,
	beneficio: 0,
	beneficioReal: 0,
	costo: 0,
	beneficio_por_dia: 5,
	costo_ener_no_comer_por_dia: 3,
	costo_ener_extra: 0,
	distri: 0,
	perdidas: 0,
	costoAdicional: 0,
	costoTotal: 0,
	dia: 0,
	initial: function(){
		var array = new Array();
		window.graf = {"obj": array,"tittle": ""};
		window.graf.obj = new Array();
		window.graf.obj.push(["Dias","Costo","MW","Consumo","Costo de energia Extra","Costo Adiciola","Beneficio","Costo Total","Beneficio Real"])
		this.distri = new Array();
		for (var i = 1; i <= 40; i++) {
			this.distri.push( this.costo_ener_no_comer_por_dia+(this.costo_ener_no_comer_por_dia*0.25) );
		};
		for (var i = 1; i <= 15; i++) {
			this.distri.push( this.costo_ener_no_comer_por_dia-(this.costo_ener_no_comer_por_dia*0.2) );
		};
		for (var i = 1; i <= 45; i++) {
			this.distri.push( this.costo_ener_no_comer_por_dia+(this.costo_ener_no_comer_por_dia*0.3) );
		};
	},
	run: function(table_target){
		this.initial();
		table_target.html("");
		var compra = this.consumo_min;
		this.dia= 0;
		while(true){
			this.costoMayorista();
			if(compra>this.consumo_max){
				return true;
			}
			this.comprar(compra);
			this.consumoDiario();
			this.facturar();
			window.graf.obj.push([String(this.dia),this.costo,this.mw,this.consumo,this.costo_ener_extra,this.costoAdicional,this.beneficio,this.costoTotal,this.beneficioReal]);
			table_target.append(window.table({dia: this.dia,costo: this.costo,mw: this.mw,consumo: this.consumo, costo_ener_extra: this.costo_ener_extra, costoAdicional: this.costoAdicional, beneficio: this.beneficio, costoTotal: this.costoTotal, beneficioReal: this.beneficioReal}));
			this.dia = this.dia+1;
			comprar = compra++;
		}
	},
	consumoDiario: function(){
		this.consumo = Math.round(Math.random() * (this.consumo_max - this.consumo_min) + this.consumo_min);
	},
	comprar: function(cantidad){
		this.mw = cantidad;
		this.costo = this.mw * this.costo_ener_no_comer_por_dia;
	},
	facturar: function(){
		this.perdidas = 0;
		this.costoAdicional = 0;
		this.costoTotal = 0;
		this.beneficio = 0;
		this.beneficioReal = 0;
		if(this.mw<this.consumo){
			debugger;
			this.costoAdicional = (this.consumo-this.mw)*this.costo_ener_extra;
		}
		this.costoTotal = Math.round(this.costoAdicional+this.costo);
		this.beneficio = Math.round(this.consumo*this.beneficio_por_dia);
		if(this.beneficio < this.costoTotal){
			this.perdidas = this.costoTotal - this.beneficio;
		}
		this.beneficioReal = Math.round(this.beneficio - this.costoTotal);
	},
	costoMayorista: function(){
		debugger;
		this.costo_ener_extra = this.distri[Math.round(Math.random() * (100 - 0) + 0)];
	}
}
var contructora = {
	ladrillos: 0,
	stock_min: 1500,
	porce_danio: 5,
	cant_pedida: 0,
	max_ladri_pedidos: 1000,
	proba_peticion: 20,
	distri: 0,
	initial: function(){
		var array = new Array();
		window.graf = {"obj": array,"tittle": ""};
		window.graf.obj = new Array();
		window.graf.obj.push(["Dia","Ladrillos","Peticion","Daño","Ladrillos al fin del dia"])

		this.distri = new Array();
		for (var i = 1; i <= this.proba_peticion; i++) {
			this.distri.push( true );
		};
		for (var i = 1; i <= 100-this.proba_peticion; i++) {
			this.distri.push( false );
		};
	},
	run: function(table_target){
		this.initial();
		table_target.html("");
		var i = 1;
		while(true){
			var accionesdia = new Array();
			accionesdia.push(String(i));
			this.ingreso();
			accionesdia.push(this.ladrillos);
			accionesdia.push(this.peticion);
			this.daniarLadrillos();
			accionesdia.push(this.daniodia);
			if(this.peticionVeci()){
				this.ladrillos = this.ladrillos-1000;
			}
			accionesdia.push(this.ladrillos);
			if(i > 30){
				return true;
			}
			window.graf.obj.push(accionesdia);
			table_target.append(window.table({dia: i,ladrillos: this.ladrillos,peticion: this.peticion,daniodia: this.daniodia,ladrifin: this.ladrillos}));
			//console.log(accionesdia);
			i++;
		}
	},
	peticionVeci: function(){
		return this.distri[Math.round(Math.random() * (100 - 0) + 0)];
	},
	ingreso: function(){
		this.peticion = 0;
		if(this.stock_min>this.ladrillos){
			this.peticion = this.stock_min - this.ladrillos;
			this.ladrillos = this.peticion+this.ladrillos;
		}
	},
	daniarLadrillos: function(){
		this.daniodia = this.ladrillos*(this.porce_danio/100);
		this.ladrillos = this.ladrillos - Math.round(this.daniodia);
	}
}
var cartas = {
	cartas: 0,
	stock_max: 0,
	cartas_ing_max: 100,
	cartas_ing_min: 20,
	tiempo_exe: 0,
	cartas_ing: 0,
	initial: function(){
		var array = new Array();
		window.graf = {"obj": array,"tittle": ""};
		window.graf.obj = new Array();
		window.graf.obj.push(["Hora","Ingresan","Cartas","Salen","Almacenamiento Maximo","Cartas al Finalizar la Hora"])

		this.distri = new Array();
		for (var i = 1; i <= this.proba_peticion; i++) {
			this.distri.push( true );
		};
		for (var i = 1; i <= 100-this.proba_peticion; i++) {
			this.distri.push( false );
		};
	},
	run: function(table_target){
		this.initial();
		table_target.html("");
		var i = 1;
		this.stock_max = parseInt(prompt("Capacidad maxima de Cartas"));
		while(true){
			var cartas_por_hora = parseInt(prompt("Cartas que sacan los Carteros por Hora"));
			var accionesHora = new Array();
			accionesHora.push(String(i));
			this.ingreso();
			accionesHora.push(this.cartas_ing);
			accionesHora.push(this.cartas);
			accionesHora.push(cartas_por_hora);

			this.accionCarteros(cartas_por_hora);
			accionesHora.push(this.stock_max);
			if(this.cartas > this.stock_max){
				this.tiempo_exe++;
			}
			accionesHora.push(this.cartas);
			if(i > 8){
				return true;
			}
			window.graf.obj.push(accionesHora);
			console.log(accionesHora);
			table_target.append(window.table({hora: i,cartas_ing: this.cartas_ing,cartas: this.cartas,cartas_por_hora: this.cartas_por_hora,stock_max: this.stock_max,cartas_fin_dia: accionesHora[5]}));
			//console.log(accionesdia);
			i++;
		}
	},
	ingreso: function(){
		this.cartas_ing = Math.round(Math.random() * (this.cartas_ing_max - this.cartas_ing_min) + this.cartas_ing_min);
		this.cartas = this.cartas + this.cartas_ing;
	},
	accionCarteros: function(desc){
		this.cartas = this.cartas-desc;
	}
}
var silo = {
	silo_max: 20000,
	silo: 0,
	bar_max: 4000,
	bar_min: 2000,
	date: 0,
	sale: 0,
	ingr: 0,
	initial: function(obj){
		this.date = new Date(obj.fecha.val());
		this.ndias = obj.ndias.val();

		var array = new Array();
		window.graf = {"obj": array,"tittle": ""};
		window.graf.obj = new Array();
		window.graf.obj.push(["Dia","Cantidad Barcos","Cantidad de Camiones","Ingreso dia","Salida de Camiones","Silo Final"])
	},
	run: function(table_target,obj){
		this.initial(obj);
		var i = 0;
		cant_camiones = parseInt(prompt("Cantidad de Camiones Diarios"));
		while(true){
			//["Sun Aug 04 2013 00:00:00 GMT-0500 (Hora est. Pacífico, Sudamérica)", 3, 25, -26155, 25000, -40216] 
			var accionesDia = new Array();
			accionesDia.push(String(this.date));
			var cant_barc = 5;
			//console.log(this.date);
			if(this.date.is().saturday() || this.date.is().sunday()){
				cant_barc = 3;
			}
			accionesDia.push(cant_barc);
			accionesDia.push(cant_camiones);
			this.ingreso(cant_barc);
			accionesDia.push(this.ingr);
			this.cargarCamiones(cant_camiones);
			accionesDia.push(this.sale);
			accionesDia.push(this.silo);
			if(i==this.ndias){
				return false;
			}
			this.date.setDate(this.date.getDate()+1);
			window.graf.obj.push(accionesDia);
			console.log(accionesDia);
			table_target.append(window.table({dia: i,cant_barc: cant_barc,cant_camiones: cant_camiones,silo: this.silo,carga_barco: accionesDia[3],sale: this.sale}));
			i++;
		}
	},
	ingreso: function(barcos){
		this.ingr = 0;
		for (var i = 0 ; i <= barcos; i++) {
			this.carga_barco = Math.round(Math.random() * (this.bar_max - this.bar_min) + this.bar_min);
			this.silo = this.silo + this.carga_barco;
			this.ingr = this.ingr + this.carga_barco;
		}
	},
	cargarCamiones: function(cant_camiones){
		this.sale = 1000*cant_camiones;
		this.silo = this.silo - this.sale;
	}
}
var granja = {
	comen_max: 30,
	comen_min: 10,
	granos: 0,
	tamanio: 0,
	desperdicio: 0,
	come: 0,
	initial: function(obj){
		this.tamanio = obj.tamanio.val();
		this.recambio = obj.recambio.val();

		var array = new Array();
		window.graf = {"obj": array,"tittle": ""};
		window.graf.obj = new Array();
		window.graf.obj.push(["Hora","Granos","Come","Desperdicio"])
	},
	run: function(table_target,obj){
		this.initial(obj);
		horas_simuladas = parseInt(prompt("Cantidad de Horas Simuladas"));
		var i = 0;
		var temp = 1;
		this.granos = this.tamanio;
		while(i<horas_simuladas){
			var accionesHora = new Array();
			accionesHora.push(String(i));
			accionesHora.push(parseInt(this.granos));
			this.comer();
			accionesHora.push(this.come);
			if (temp == this.recambio) {
				temp = 0;
				this.cambiar();
			}
			accionesHora.push(this.desperdicio);
			temp++;
		 	window.graf.obj.push(accionesHora);
			table_target.append(window.table({hora: accionesHora[0],granos: accionesHora[1],desperdicio: accionesHora[3],come: accionesHora[2]}));
			i++;
		}
		console.log(window.graf.obj);
	},
	cambiar: function(){
		this.desperdicio = this.granos+this.desperdicio;
		this.granos = this.tamanio;
	},
	comer: function(){
		this.come = Math.round(Math.random() * (this.comen_max - this.comen_min) + this.comen_min);
		console.log(this.come);
		if(this.come>this.granos){
			this.granos = 0;
		}else{
			this.granos = this.granos - this.come;
		}
	}
}
var bigMadDoc = {
	prob_max_venta: 30,
	prob_min_venta: 10,
	horas_simuladas: 0,
	ganancia: 4,
	ganancia_real: 0,
	costos_real: 0,
	perdida_real: 0,
	perdida_falta_bmd: 3,
	costo_pan: 0.04,
	costo_hamburgesa: 0.1,
	venta: 0,
	nosepudovender: 0,
	vendidas: 0,
	initial: function(obj){
		/****/
		this.prob_max_venta = 30;
		this.prob_min_venta = 10;
		this.horas_simuladas = 0;
		this.ganancia = 4;
		this.ganancia_real = 0;
		this.costos_real = 0;
		this.perdida_real = 0;
		this.perdida_falta_bmd = 3;
		this.costo_pan = 0.04;
		this.costo_hamburgesa = 0.1;
		this.venta = 0;
		this.nosepudovender = 0;
		this.vendidas = 0;
		/****/
		this.horas_simuladas = parseInt(prompt("Cantidad de Horas que abre el almacen"));
		this.panes = parseInt(prompt("Cantidad de Panes"));
		this.hamburguesas = parseInt(prompt("Cantidad de Hamburguesas"));
		var array = new Array();
		window.graf = {"obj": array,"tittle": ""};
		window.graf.obj = new Array();
		window.graf.obj.push(["Hora","Pedido","Vendidas","P/Venta","Ganancia","Costos","Perdida","Panes","Hambur"])
	},
	run: function(table_target,obj){
		this.initial(obj);
		
		var i = 0;
		while(i<this.horas_simuladas){
			var accionesHora = new Array();
			accionesHora.push(String(i));
			this.ventaPorHora();
			accionesHora.push(this.venta);
			accionesHora.push(this.vendidas);
			accionesHora.push(this.nosepudovender);
			accionesHora.push(this.ganancia_real);
			accionesHora.push(this.costos_real);
			accionesHora.push(this.perdida_real);
			accionesHora.push(this.panes);
			accionesHora.push(this.hamburguesas);
		 	window.graf.obj.push(accionesHora);
			table_target.append(window.table({
				hora: accionesHora[0],
				venta: accionesHora[1],
				vendidas: accionesHora[2],
				nosepudovender: accionesHora[3],
				ganancia_real: accionesHora[4],
				costos_real: parseInt( accionesHora[5] ),
				perdida_real: accionesHora[6],
				panes: accionesHora[7],
				hamburguesas: accionesHora[8]
			}));
			this.vendidas = 0;
			this.nosepudovender = 0;
			i++;
		}
		console.log(window.graf.obj);
	},
	ventaPorHora: function(){
		this.venta = Math.round(Math.random() * (this.prob_max_venta - this.prob_min_venta) + this.prob_min_venta);
		for (var i = 0; i < parseInt( this.venta ); i++) {
			bmd = this.bigMadD();
			if(bmd.flag){
				this.ganancia_real = this.ganancia_real + bmd.ganancia;
				this.costos_real = this.costos_real + bmd.costo;
				this.vendidas++;
			}else{
				this.perdida_real = this.perdida_real + this.perdida_falta_bmd;
				this.nosepudovender++;
			}
		}
	},
	bigMadD: function(){
		flag = true;
		costo = (this.costo_pan*3)+(this.costo_hamburgesa*2);
		if(this.panes>=3 && this.hamburguesas>=2){
			this.panes  = this.panes - 3;
			this.hamburguesas  = this.hamburguesas - 2;
			return {costo: costo,ganancia: this.ganancia,flag: flag}
		}else{
			flag = false;
			return {costo: costo,ganancia: this.ganancia,flag: flag}
		}
	}
}