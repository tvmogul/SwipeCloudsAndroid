/**
 *
 * Puzzle box game jQuery plugin
 * 
 * Copyright 2013, Dhiraj kumar
 * http://dhirajkumarsingh.wordpress.com/
 */

var zi = 1; var EmptySquare = 16;
$.fn.extend({puzzle_dg:function(e){var t="#"+$(this).attr("id");var n=e+"px";var r=e*4+"px";$(t).html('<div id="board"></div>');$("#board").css({position:"absolute",width:r,height:r,border:"1px solid gray"});for(var i=0;i<16;i++){$("#board").append("<div style='left: "+i%4*e+"px; top: "+Math.floor(i/4)*e+"px; width: "+e+"px; height: "+e+"px; background-position: "+ -(i%4)*e+"px "+ -Math.floor(i/4)*e+"px ' title="+(i+1)+"></div>")}$("#board").children("div:nth-child("+EmptySquare+")").css({backgroundImage:"",background:"#ffffff"});$("#board").children("div").click(function(){Move(this,e)})}})
function Move(e,t){var n=false;var r=$("#board").children("div:nth-child("+EmptySquare+")").css("left");var i=$("#board").children("div:nth-child("+EmptySquare+")").css("top");var s=$(e).css("left");var o=$(e).css("top");if(r==s&&o==parseInt(i)-t+"px")n=true;if(r==s&&o==parseInt(i)+t+"px")n=true;if(parseInt(r)-t+"px"==s&&o==i)n=true;if(parseInt(r)+t+"px"==s&&o==i)n=true;if(n){$(e).css("z-index",zi++);$(e).animate({left:r,top:i},200,function(){$("#board").children("div:nth-child("+EmptySquare+")").css("left",s);$("#board").children("div:nth-child("+EmptySquare+")").css("top",o)})}}
