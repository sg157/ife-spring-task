window.onload=function(){
	var table = document.getElementById("table");
	var data = [
		{"姓名":"小明","语文":81,"数学":92,"英语":75},
		{"姓名":"小红","语文":82,"数学":100,"英语":74},
		{"姓名":"小菜","语文":83,"数学":64,"英语":73},
		{"姓名":"小蔡","语文":84,"数学":95,"英语":71}
	];
	init(data);
	var table = new Table(table,data);
}
/*这里把总分计算出来*/
function init(data){
	for(var i=0; i < data.length; i++){
		var obj = data[i];
		var total = 0;
		for(var attr in obj){
			if(typeof(obj[attr]) === 'number'){
				total+=obj[attr];
			}
		}
		obj['总分']=total;
	}
}
/*这里弄了个Table类方便管理*/
function Table(table,data){
	this.table = table;
	this.data = data;
	this.sortOrder = {};//记录每个属性的排序默认都升序
	this.tbody = [];
	this.tbodyHTML;
	this.thead = [];
	this.theadHTML;
	this.createthead(this.data[0]);
	this.createtbody();
	this.bindEvent();
}
/*排序函数*/
Table.prototype.sort=function(attr,order){
	var _this = this;
	this.data.sort(function(a,b){
		if(order){
			 _this.sortOrder[attr] = !order;
			return a[attr] - b[attr];
		}else{
			 _this.sortOrder[attr] = !order;
			return b[attr]- a[attr];
		}
	});
	this.cleantbody();
	this.createtbody();
}
/*清空tbody*/
Table.prototype.cleantbody=function(){
	this.tbodyHTML.innerHTML = "";
}
/*绑定事件*/
Table.prototype.bindEvent=function(){
	var _this = this;
	this.thead.forEach(function(td,i){
		td = _this.thead[i];
		_this.sortOrder[td.innerHTML]=true;
		td.addEventListener("click", function(){
			_this.sort(td.innerHTML,_this.sortOrder[td.innerHTML]);
		},false);
	})
}
/*创建头部*/
Table.prototype.createthead=function(oneOfData){
	var thead = createElement("thead");
	var tr	  = createElement("tr");
	thead.appendChild(tr);
	var attr;
	for(attr in oneOfData){
		var td = createElement("td");
		td.innerHTML = attr;
		tr.appendChild(td);
		this.thead.push(td);
	}
	this.theadHTML=thead;
	this.table.appendChild(thead);
}
/*创建tbody*/ 
Table.prototype.createtbody=function(){
	if(!this.tbodyHTML){
		this.tbodyHTML = createElement("tbody");
	}
	for(var i=0;i<this.data.length;i++){
		var tr = new TrObj(this.data[i]);
		this.tbody.push(tr);
		this.tbodyHTML.appendChild(tr.html);
	}
	this.table.appendChild(this.tbodyHTML);
}
/*这里不知道为什么要用个TrObj类*/
function TrObj(trDate){
	this.html;
	this.init(trDate);
}
TrObj.prototype.init=function(data){
	var tr = createElement("tr");
	for(attr in data){
		var td = createElement("td");
		td.innerHTML = data[attr];
		tr.appendChild(td);
	}
	this.html=tr;
}
/*工具函数*/
function createElement(tag){
	return document.createElement(tag);
}