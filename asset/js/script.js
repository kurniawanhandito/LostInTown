// var sickTimes = new Array();
// var isSickExist = false;
// var curIndex, curStrangerPoint;
// var status = 0;
// var n = 0, s = 0, sickIndex = 0;
var nodePlaces = new Array(), nodeBuildings = new Array(), strangers = new Array(), hearts = new Array(), stars = new Array();
var pengaliScore = 20;
var score = 0, temp = 0;
var nodes = new Array();
var allNodes = new Array();
var point, p;
var n = 0, s = 0;
var time = 300;
var pick = false, pickSick = false;
var gameTime = 120;
var subTop = 10;
var humanWidth = 5, humanHeight = 18;
var nyawa = 5;
var showed, text, charIndex = 0;
var finish;
//sick
var sickPerson;
var sickTimes = new Array();
var sickPoint;
var isSick = false;
function Node(id,left, top){
	this.id = id;
	this.left=left;
	this.top=top;
}
var dissapear = function(){
	$(this.id).css({"opacity":"0.1"});
}
var show = function(){
	$(this.id).css({"opacity":"1"});
}
function Star(id){
	this.id = id;
}
Star.prototype.dissapear = dissapear;
Star.prototype.show = show;
function Heart(id){
	this.id = id;
}
Heart.prototype.dissapear = dissapear;
Heart.prototype.show = show;
function stand(){
	var rand = Math.floor(Math.random() * 10);
	if((0 <= rand) && (rand < nodePlaces.length)){
		// var left = Math.ceil((parseInt($(nodePlaces[rand].id).css("left")) / bodyWidth ) * 100);
		// var top = Math.ceil((parseInt($(nodePlaces[rand].id).css("top")) / bodyHeight)* 100);
		var helpTop = parseInt(nodePlaces[rand].top) - subTop;
		$("#help").css({"left":nodePlaces[rand].left,"top": helpTop + "%"});
		point = nodePlaces[rand];
	}else{
		stand();
	}
}
function getKoor(des, src){
	var desLeft = ($(des).css("left") == "auto") ? 0 : parseInt($(des).css("left"));
	var desTop = ($(des).css("top") == "auto")? 0 : parseInt($(des).css("top"));
	var srcLeft = ($(src).css("left") == "auto") ? 0 : parseInt($(src).css("left"));
	var srcTop = ($(src).css("top") == "auto") ? 0 : parseInt($(src).css("top"));
	return [desLeft, desTop, srcLeft, srcTop];
}
function standStranger(ind){
	var rand = Math.floor(Math.random() * 10);
	if(0 <= rand && rand < nodePlaces.length){
		p = nodePlaces[rand];
		if(p != point){
			var left, top;
			if(p == allNodes[4]){
				left = parseInt(p.left) + (0.45 * humanWidth);
				top = parseInt(p.top) - subTop;
				$(strangers[ind].id).css({"left":left + "%", "top":top+"%","display":"inline"});
			}else if(p == allNodes[13]){
				left = parseInt(p.left) - humanWidth;
				top = parseInt(p.top) - subTop;
				$(strangers[ind].id).css({"left":left + "%", "top":top+"%","display":"inline"});
			}else if(p == allNodes[10]){
				left = parseInt(p.left) + humanWidth;
				top = parseInt(p.top) - subTop;
				$(strangers[ind].id).css({"left":left + "%", "top":top+"%","display":"inline"});
			}
			while(true){
				rand = Math.floor(Math.random() * 10);
				if(0 <= rand && rand < nodeBuildings.length){
					if(nodeBuildings[rand] != p){
						strangers[ind].request = nodeBuildings[rand];
						var num = strangers[ind].request.id.split("_")[1];
						var reqBuilding = $("#building_" + num).clone();
						$(".span-req").html("");
						reqBuilding.attr("class","building-req");
						reqBuilding.appendTo(".span-req");
						for(var i = 0; i < strangers[ind].num; i++){
							hearts[i].show();
						}
						strangers[ind].interval = setInterval(function(){
							strangers[ind].num--;
							if(strangers[ind].num >= 0){
								hearts[strangers[ind].num].dissapear();
							}
							if(strangers[ind].num <= 0){
								addSoul(-1);
								if(nyawa > 0){
									switchStranger();
								}
							}
						},5000);
						break;
					}
				}
			}
		}else{
			standStranger(ind);
		}
	}else{
		standStranger(ind);
	}
}
//sick
function standSick(){
	var rand = Math.floor(Math.random() * 10);
	if(0 <= rand && rand < nodePlaces.length){
		sickPoint = nodePlaces[rand];
		if(sickPoint != point && sickPoint != p){
			var left, top;
			if(sickPoint == allNodes[4]){
				left = parseInt(sickPoint.left) + (0.45 * humanWidth);
				top = parseInt(sickPoint.top) - subTop;
				$(sickPerson.id).css({"left":left + "%", "top":top+"%","display":"inline"});
			}else if(sickPoint == allNodes[13]){
				left = parseInt(sickPoint.left) - humanWidth;
				top = parseInt(sickPoint.top) - subTop;
				$(sickPerson.id).css({"left":left + "%", "top":top+"%","display":"inline"});
			}else if(sickPoint == allNodes[10]){
				left = parseInt(sickPoint.left) + humanWidth;
				top = parseInt(sickPoint.top) - subTop;
				$(sickPerson.id).css({"left":left + "%", "top":top+"%","display":"inline"});
			}
			//didit
			sickPerson.num = 3;
			sickPerson.sick = true;
			sickPerson.request = allNodes[12];
			// sickPerson.interval = setInterval(function(){
			// 	sickPerson.num--;
			// 	if(sickPerson.num <= 0){
			// 		switchSick();
			// 	}
			// },5000);
		}else{
			standSick();
		}
	}else{
		standSick();
	}
}
function checkNodes(des){
	var allow = true;
	if(
		(point.id == "#node_5") && (des.id == "#node_8") ||
		(point.id == "#node_8") && (des.id == "#node_5") ||
		(point.id == "#node_5") && (des.id == "#node_6") ||
		(point.id == "#node_6") && (des.id == "#node_5") ||
		(point.id == "#node_1") && (des.id == "#node_8") ||
		(point.id == "#node_8") && (des.id == "#node_1") ||
		(point.id == "#node_1") && (des.id == "#node_6") ||
		(point.id == "#node_6") && (des.id == "#node_1") ||
		(point.id == "#node_3") && (des.id == "#node_12") ||
		(point.id == "#node_12") && (des.id == "#node_3")
	){
		allow = false;
	}
	return allow;
}
function move(){
	if(nodes.length > 0){
		if(nodes[0].left == point.left){
			var topDes = parseInt(nodes[0].top)- subTop;
			$("#help").animate({"top":topDes + "%"},time,function(){
					if(pickSick && isSick){
						$(sickPerson.id).animate({"top":topDes + "%"},time);
					}else if(pick && !isSick){
						$(strangers[s].id).animate({"top":topDes + "%"},time);
					}
				point = nodes[0];
				nodes.splice(0,1);
				n--;
			});
		}
		if(nodes[0].top == point.top){
			$("#help").animate({"left":nodes[0].left},time,function(){
					if(pickSick && isSick){
						$(sickPerson.id).animate({"left":nodes[0].left},time);
					}else if(pick && !isSick){
						$(strangers[s].id).animate({"left":nodes[0].left},time);
					}
				point = nodes[0];
				nodes.splice(0,1);
				n--;
			});
		}
	}
}
function moveSick(){
	if(nodes.length > 0){
		if(nodes[0].left == point.left){
			var topDes = parseInt(nodes[0].top)- subTop;
			$("#help").animate({"top":topDes + "%"},time,function(){
				if(pick){
						$(sickPerson.id).animate({"top":topDes + "%"},time);
				}
				point = nodes[0];
				nodes.splice(0,1);
				n--;
			});
		}
		if(nodes[0].top == point.top){
			$("#help").animate({"left":nodes[0].left},time,function(){
				if(pick){
						$(sickPerson.id).animate({"left":nodes[0].left},time);
				}
				point = nodes[0];
				nodes.splice(0,1);
				n--;
			});
		}
	}
}
function Stranger(id){
	this.id = id;
	this.request = "";
	this.num = 5;
	this.interval;
	this.sick = false;
}
function countScore(limit){
	score = parseInt($("#score").text()) + 1;
	$("#score").text(score);
	if(score < (temp + limit)){
		setTimeout("countScore("+limit+")",10);
	}
}
function switchStranger(){
	$(strangers[s].id).css({"display":"none"});
	clearInterval(strangers[s].interval);
	strangers[s].num = 5;
		s++;
		if(strangers.length == s){
			s = 0;
		}
		pick = false;
		standStranger(s);
}
function switchSick(){
	$(sickPerson.id).css({"display":"none"});
	// clearInterval(sickPerson.interval);
	pickSick = false;
	isSick = false;
}
function addSoul(num){
	nyawa += num;
	if(num < 0){
		stars[nyawa].dissapear();
	}else if(num > 0){
		stars[nyawa - 1].show();
	}
	if(nyawa <= 0){
		gameEnd();
	}
}
function setSickTime(){
	var sickTime = Math.floor(Math.random() * 100);
	if(sickTimes.length == 0){
		if(20 <= sickTime && sickTime < 50){
			sickTimes[0] = sickTime;
		}
		setSickTime();
	}else if(sickTimes.length == 1){
		sickTimes[1] = sickTimes[0] + 30;
		sickTimes[2] = sickTimes[1] + 40;
	}
}
function setGameTime(){
	gameTime--;
	//sick
	if(gameTime == sickTimes[0] - 15 || gameTime == sickTimes[1] - 15 || gameTime == sickTimes[2] - 15){
		$(".notif").fadeOut("slow",function(){
			$(this).css({"top":"0%"});
		});
		switchSick();
	}
	if(gameTime == sickTimes[0] || gameTime == sickTimes[1] || gameTime == sickTimes[2]){
		standSick();//didit
		$(".notif").css({"display":"block","opacity":"0"}).animate({"opacity":1, "top":"20%"},500);
	}
	if(gameTime == 0){
		$("#sec").text("00");
		gameEnd();
	}else{
		var min = Math.floor(gameTime / 60);
		var sec = gameTime % 60;
		$("#min").text("0" + min);
		$("#sec").text((sec.toString().length == 1) ? ("0" + sec) : sec);
	}
}
function gameEnd(){
	clearInterval(gameTimeInterval);
	clearInterval(strangers[s].interval);
	showBackground();
	var bef = score;
	if(nyawa > 2){
		score += 200;
		score += ((nyawa - 2) * 200);
	}else{
		score += (nyawa * 100);
	}
	$("#num_score").text(bef + " + " + nyawa +" star(s) = " + score);
	$("#player_score").text(localStorage.getItem("username"));
	var one = parseInt(localStorage.getItem("high_1").split(":")[1]);
	var two = parseInt(localStorage.getItem("high_2").split(":")[1]);
	var three = parseInt(localStorage.getItem("high_3").split(":")[1]);
	if(score >= one){
		var oldUser = localStorage.getItem("high_1").split(":")[0];
		var oldUser2 = localStorage.getItem("high_2").split(":")[0];
		localStorage.setItem("high_1",localStorage.getItem("username")+":"+score);
		localStorage.setItem("high_2",oldUser+":"+one);
		localStorage.setItem("high_3",oldUser2+":"+two);
		var oldScore = one, oldScore2 = two;
		one = score;
		two = oldScore;
		three = oldScore2;
	}else if(score >= two){
		var oldUser = localStorage.getItem("high_2").split(":")[0];
		localStorage.setItem("high_2",localStorage.getItem("username")+":"+score);
		localStorage.setItem("high_3",oldUser+":"+two);
		var oldScore = two;
		two = score;
		three = oldScore;
	}else if(score >= three){
		localStorage.setItem("high_3",localStorage.getItem("username")+":"+score);
		three = score;
	}
	var listHigh = "-";
	if(one > 0){
		listHigh = "<ol type='1'><li>"+ localStorage.getItem("high_1").replace(":"," = ") +"</li>"
	}
	if(two > 0){
		listHigh += "<li>"+ localStorage.getItem("high_2").replace(":"," = ") +"</li>"
	}
	if(three > 0){
		listHigh += "<li>"+ localStorage.getItem("high_3").replace(":"," = ") +"</li>"
	}
	if(listHigh != "-"){
		listHigh += "</ol>";
	}
	$("#high_score").html(listHigh);
	if(gameTime == 0 && nyawa >= 0){
		$("#congrats").css({"display":"inline"});
		$("#game_end").css({"display":"block","opacity":"0"}).animate({"opacity":1, "top":"10%"},500);
	}else if(gameTime > 0){
		$("#over").css({"display":"inline"});
		$("#game_end").css({"display":"block","opacity":"0"}).animate({"opacity":1, "top":"10%"},500);
	}
}
function gameSplash(){
	$("#teaser_2").delay(2000).fadeOut("slow",function(){
		$("#teaser_1").delay(2000).fadeOut("slow",function(){
			if(localStorage.getItem("username") === "noone"){
				showInputUserName();
			}else if(localStorage.getItem("isEver") === "false"){
				tutorial();
			}else{
				gameStart();
			}
		});
	});
}
function showInputUserName(){
	showBackground();
	$("#form").css({"display":"block","opacity":"0"}).animate({"opacity":1, "top":"10%"},500);
}
function tutorial(){
	startSlide();
	if(localStorage.getItem("isEver") == "true"){
		$(".skip").css("display","block");
	}
	showBackground();
	$("#tutorial").css({"display":"block","opacity":"0"}).animate({"opacity":1, "top":"10%"},500);
}
function gameStart(){
	$("#over").css({"display":"none"});
	$("#congrats").css({"display":"none"});
	score = 0;
	$("#score").text(score);
	// nyawa = 5;
	nyawa = 2;
	for(var i = 0; i < stars.length; i++){
		if(0 <= i && i < nyawa){
			stars[i].show();
		}else{
			stars[i].dissapear();
		}
	}
	gameTime = 120;
	$("#min").text("02");
	$("#sec").text("00");
	stand();
	switchStranger();
	gameTimeInterval = setInterval("setGameTime()",1000);
	//sick
	sickTimes = new Array();
	setSickTime();
}
function showBackground(){
	$("#back").fadeIn("fast");
}
function hideBackground(){
	$("#back").fadeOut("fast");
}
//slide
function startSlide(){
	$(".next").css("display","inline");
	$(".prev").css("display","none");
	slideIndex = slideItems.length - 1;
	finish = new Array(slideItems.length);
	getText();
	charInterval = setInterval("trackText()",10);
}
function getText(){
	charIndex = 0;
	text = slideItems[slideIndex]["text"];
	slideItems[slideIndex]["textObj"].text("");
	showed = "";
}
function trackText(){
	if(charIndex < text.length){
		showed += text[charIndex];
		slideItems[slideIndex]["textObj"].text(showed);
		charIndex++;
	}else{
		finish[slideIndex] = true;
		clearInterval(charInterval);
		charIndex = 0;
	}
}
//slide
$(function(){
	$(".node").mousedown(function(e){
		if(e.which == 1){
			if(checkNodes(this)){
				var thisInd = parseInt($(this).attr("id").split("_")[1]) - 1;
				des = allNodes[thisInd];
				if((des.left == point.left) || (des.top == point.top)){
						if(nodes[nodes.length - 1] != des){
							nodes[n] = des;
							n++;
							move();
						}
				}
			}
		}
	});
	$(".stranger").click(function(){
		if(!pick && (point.id == p.id) && $(this).attr("id") == $(strangers[s].id).attr("id") && !pickSick){
				var top = parseInt(point.top) - subTop;
				$(this).css({"left":point.left, "top":top + "%"});
				pick = true;
				isSick = false;
				if(strangers[s].num < 5){
					strangers[s].num++;
					hearts[strangers[s].num - 1].show();
				}
		}
	});
	$(".building").click(function(){
		var id = $(this).attr("id").split("_")[1];
		if(pick && (strangers[s].request.id == point.id) && strangers[s].request.id.split("_")[1] == id && !isSick){
			//nambar score
			temp = score;
			countScore(strangers[s].num * pengaliScore);
			switchStranger();
		}else{
			//amarah
			strangers[s].num--;
			if(strangers[s].num >= 0){
				hearts[strangers[s].num].dissapear();
			}
			if(strangers[s].num == 0){
				addSoul(-1);
				if(nyawa > 0){
					switchStranger();
				}
			}
		}
	});
	//sick
	$(".ill").click(function(){
		if(!pickSick && (point.id == sickPoint.id) && !pick){
			var top = parseInt(point.top) - subTop;
			$(this).css({"left":point.left, "top":top + "%"});
			pickSick = true;
			isSick = true;
			if(sickPerson.num < 3){
				sickPerson.num++;
			}
		}
	});
	$(".hospital").click(function(){
		var id = $(this).attr("id").split("_")[1];
		if(pickSick && (sickPerson.request.id == point.id) && sickPerson.request.id.split("_")[1] == id && isSick){
			addSoul(1);
			$(".notif").fadeOut("slow",function(){
				$(this).css({"top":"0%"});
			});
			switchSick();
		}
	});
	$(".pause").click(function(){
		clearInterval(gameTimeInterval);
		clearInterval(strangers[s].interval);
		showBackground();
		$(".resume").css({"display":"block","opacity":"0"}).animate({"opacity":1, "top":"10%"},500);
	});
	$(".resume").click(function(){
		gameTimeInterval = setInterval("setGameTime()",1000);
		strangers[s].interval = setInterval(function(){
			strangers[s].num--;
			if(strangers[s].num >= 0){
				hearts[strangers[s].num].dissapear();
			}
			if(strangers[s].num <= 0){
				addSoul(-1);
				switchStranger();
			}
		},5000);
		$(".resume").animate({"opacity":0, "top":"0%"},500).css({"display":"none","opacity":"0"});
		hideBackground();
	});
	$(".again").click(function(){
		$("#game_end").animate({"opacity":0, "top":"0%"},500).css({"display":"none","opacity":"0"});
		hideBackground();
		gameStart();
	});
	$(".create").click(function(){
		$("#game_end").animate({"opacity":0, "top":"0%"},500).css({"display":"none","opacity":"0"});
		$("#form").css({"display":"block","opacity":"0"}).delay(500).animate({"opacity":1, "top":"10%"},500);
	});
	$(".clear").click(function(){
		localStorage.setItem("high_1","noone:0");
		localStorage.setItem("high_2","noone:0");
		localStorage.setItem("high_3","noone:0");
		localStorage.setItem("username","noone");
		$("#game_end").animate({"opacity":0, "top":"0%"},500).css({"display":"none","opacity":"0"});
		$("#form").css({"display":"block","opacity":"0"}).delay(500).animate({"opacity":1, "top":"10%"},500);
	});
	$(".start").click(function(){
		localStorage.setItem("isEver","true");
		$("#tutorial").animate({"opacity":0, "top":"0%"},500).css({"display":"none","opacity":"0"});
		hideBackground();
		gameStart();
		for(var i = 0; i < slideItems.length; i++){
			$(slideItems[i]["obj"]).css({"left":"0%"});
		}
	});
	$(".skip").click(function(){
		localStorage.setItem("isEver","true");
		$("#tutorial").animate({"opacity":0, "top":"0%"},500).css({"display":"none","opacity":"0"});
		hideBackground();
		gameStart();
		for(var i = 0; i < slideItems.length; i++){
			$(slideItems[i]["obj"]).css({"left":"0%"});
		}
	});
	$("#username").bind("enterKey",function(){
		if($(this).val() && $(this).val() != " "){
			localStorage.setItem("username",$(this).val());
			$("#form").animate({"opacity":0, "top":"0%"},500).css({"display":"none","opacity":"0"});
			$("#dialog_username").text($(this).val());
			tutorial();
		}else{
			$("#username").css({"outline":"5px solid red"}).delay(500).css({"outline":"none"});
		}
	});
	$("#username").keyup(function(e){
		if(e.keyCode == 13){
			$(this).trigger("enterKey");
		}
	});
	$("input[type='submit']").click(function(){
		if($("#username").val() && $("#username").val() != " "){
			localStorage.setItem("username",$("#username").val());
			$("#form").animate({"opacity":0, "top":"0%"},500).css({"display":"none","opacity":"0"});
			$("#dialog_username").text($(this).val());
			tutorial();
		}
	});
	//slide
	slideItems = new Array();
	var tempSlides = $("ul#slide_container").children();
	for(var i = (tempSlides.length - 1); i > -1; i--){
		slideItems[i] = new Array();
		slideItems[i]["obj"] = tempSlides[i];
		slideItems[i]["textObj"] = $(tempSlides[i]).find(".text");
		slideItems[i]["text"] = $(tempSlides[i]).find(".text").text();
	}
	$(".next").click(function(){
		if(finish[slideIndex]){
			$(slideItems[slideIndex]["obj"]).animate({"left":"-100%"});
			slideIndex--;
		}
		if(!finish[slideIndex] && (charIndex > 0)){
			charIndex = 0;
			$(slideItems[slideIndex]["obj"]).find(".text").text(slideItems[slideIndex]["text"]);
			finish[slideIndex] = true;
			clearInterval(charInterval);
		}
		if(!finish[slideIndex]){
			getText();
			charInterval = setInterval("trackText()",10);
		}
		if(slideIndex < slideItems.length -1){
			$(".prev").css("display","inline");
		}
		if(slideIndex <= 0){
			$(".start").fadeIn();
			$(this).css("display","none");
			slideIndex = 0;
		}
	});
	$(".prev").click(function(){
		slideIndex++;
		$(slideItems[slideIndex]["obj"]).animate({"left":"0%"});
		$(slideItems[slideIndex]["obj"]).find(".text").text(slideItems[slideIndex]["text"]);
		clearInterval(charInterval);
		if(slideIndex == 1){
			$(".next").css("display","inline");
		}
		if(slideIndex >= slideItems.length - 1){
			$(this).css("display","none");
			slideIndex = slideItems.length -1;
		}
	});
	//slide
	$( window ).resize(function() {
		bodyWidth = parseInt($(document).width());
		bodyHeight = parseInt($(document).height());
	});
	nodeWidth = parseInt($(".node").width());
	bodyWidth = parseInt($(document).width());
	bodyHeight = parseInt($(document).height());
	strangers = [
	new Stranger("#stranger_1"), 
	new Stranger("#stranger_2"), 
	new Stranger("#stranger_3"), 
	new Stranger("#stranger_4"),
    new Stranger("#stranger_5"),
	new Stranger("#stranger_6")
	];
	//sick
	sickPerson = new Stranger("#ill_1");
	allNodes = [
	new Node("#node_1","20.5%","77%"),
	new Node("#node_2","72%","29%"),
	new Node("#node_3","41.5%","44%"),
	new Node("#node_4","52%","29%"),
	new Node("#node_5","5%","77%"),	
	new Node("#node_6","88.5%","75%"),
	new Node("#node_7","34%","52%"),
	new Node("#node_8","71%","75%"),
	new Node("#node_9","20.5%","37%"),
	new Node("#node_10","48%","68.5%"),	
	new Node("#node_11","88.5%","91%"),
	new Node("#node_12","79.5%","45%"),
	new Node("#node_13","71%","57%"),
	new Node("#node_14","95%","29%"),
	new Node("#node_15","79.5%","57%"),	
	new Node("#node_16","41.5%","52%"),
	new Node("#node_17","63.5%","29%"),
	new Node("#node_18","79.5%","29%"),
	new Node("#node_19","63.5%","57%"),
	new Node("#node_20","34%","68.5%"),
	new Node("#node_21","20.5%","68.5%"),
	new Node("#node_22","41.5%","29%"),
	];
	nodePlaces= [allNodes[4],allNodes[10],allNodes[13]];
	nodeBuildings = [
	allNodes[4],
	allNodes[0],
	allNodes[8],
	allNodes[6],
	allNodes[2],
	allNodes[9],
	allNodes[3],
	allNodes[1],
	allNodes[11],
	allNodes[7],
	allNodes[5],
	allNodes[10]
	];
	hearts = [new Heart("#heart_0"),new Heart("#heart_1"),new Heart("#heart_2"),new Heart("#heart_3"),new Heart("#heart_4")];
	stars = [new Star("#star_0"),new Star("#star_1"),new Star("#star_2"),new Star("#star_3"),new Star("#star_4")];
	// gameStart();
    gameSplash();
	if(typeof(Storage) !== "undefined") {
	   if(!localStorage.hasOwnProperty("isEver")){
	   		localStorage.setItem("isEver","false");
	   		localStorage.setItem("high_1","noone:0");
	   		localStorage.setItem("high_2","noone:0");
	   		localStorage.setItem("high_3","noone:0");
	   		localStorage.setItem("username","noone");
	   }
	} 
	    if (!window.localStorage) {
		  window.localStorage = {
		    getItem: function (sKey) {
		      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
		      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
		    },
		    key: function (nKeyId) {
		      return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
		    },
		    setItem: function (sKey, sValue) {
		      if(!sKey) { return; }
		      document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
		      this.length = document.cookie.match(/\=/g).length;
		    },
		    length: 0,
		    removeItem: function (sKey) {
		      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
		      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
		      this.length--;
		    },
		    hasOwnProperty: function (sKey) {
		      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		    }
		  };
		  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
		}
		if (!window.sessionStorage) {
		  window.sessionStorage = {
		    getItem: function (sKey) {
		      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
		      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
		    },
		    key: function (nKeyId) {
		      return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
		    },
		    setItem: function (sKey, sValue) {
		      if(!sKey) { return; }
		      document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";
		      this.length = document.cookie.match(/\=/g).length;
		    },
		    length: 0,
		    removeItem: function (sKey) {
		      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
		      document.cookie = escape(sKey) + "=; path=/";
		      this.length--;
		    },
		    hasOwnProperty: function (sKey) {
		      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		    }
		  };
		  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
		}
		//from stackoverflow
		// target.html(target.text().replace(/./g, "<span>$&</span>"));
		// if(text.length >0){
  //       //append first character 
	 //        elem.append(text[0]);
	 //        setTimeout(
	 //            function(){
	 //                //Slice text by 1 character and call function again                
	 //                addTextByDelay(text.slice(1),elem,delay);            
	 //             },delay                 
	 //            );
	 //    }

	//  var showText = function (target, message, index, interval) {   
	//   if (index < message.length) {
	//     $(target).append(message[index++]);
	//     setTimeout(function () { showText(target, message, index, interval); }, interval);
	//   }
	// }
	// showText("#msg", "Hello, World!", 0, 500); 
});
