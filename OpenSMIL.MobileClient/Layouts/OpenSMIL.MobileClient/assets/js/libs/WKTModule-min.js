﻿var WKTModule=new function(){var l={pushpinOptions:{},polylineOptions:{strokeColor:new Microsoft.Maps.Color(200,255,0,0),strokeThickness:2},polygonOptions:{fillColor:new Microsoft.Maps.Color(100,0,0,255),strokeColor:new Microsoft.Maps.Color(200,255,0,0),strokeThickness:2}};function q(u){var s=l;for(attrname in u){s[attrname]=u[attrname]}return s}function r(s){var t=s.replace(/(^\s|\s+$)/gi,"").split(/\s+/);if(t.length==2){return new Microsoft.Maps.Location(parseFloat(t[1]),parseFloat(t[0]))}return null}function h(u){var s=u.replace(/(^\s|\s+$)/gi,"").split(/,\s*/);var v=[],w;for(var t=0;t<s.length;t++){w=r(s[t]);if(w!=null){v.push(w)}}return v}function d(t,s){t=t.replace(/(POINT|[\(\)]*)/gi,"");var u=r(t);if(u!=null){return new Microsoft.Maps.Pushpin(u,s.pushpinOptions)}}function e(t,s){t=t.replace(/(LINESTRING|[\(\)]*|^\s*|\s$)/gi,"");return new Microsoft.Maps.Polyline(h(t),s.polylineOptions)}function a(v,u){var t=v.replace(/(POLYGON|\(\(|\)\))/gi,"").split(/\),\s*\(/);var w=[];for(var s in t){w.push(h(t[s]))}return new Microsoft.Maps.Polygon(w,u.polygonOptions)}function f(w,v){var s=new Microsoft.Maps.EntityCollection(),x;var u=w.replace(/(MULTIPOINT|[\(\)]*)/gi,"").split(/,\s*/);for(var t in u){x=r(u[t]);if(x!=null){s.push(new Microsoft.Maps.Pushpin(x,v.pushpinOptions))}}return s}function o(w,v){var s=new Microsoft.Maps.EntityCollection();var u=w.replace(/(MULTILINESTRING|\(\(|\)\))/gi,"").split(/\),\s*\(/);for(var t in u){s.push(new Microsoft.Maps.Polyline(h(u[t]),v.polylineOptions))}return s}function n(x,w){var s=new Microsoft.Maps.EntityCollection();var y=x.replace(/(MULTIPOLYGON|\(\(\(|\)\)\))/gi,"").split(/\)\),\s*\(\(/);var z,u;for(var t in y){z=[];u=y[t].split(/\),\s*\(/);for(var v in u){z.push(h(u[v]))}s.push(new Microsoft.Maps.Polygon(z,w.polygonOptions))}return s}function p(w,v){var t=new Microsoft.Maps.EntityCollection(),s;var x=w.replace(/(GEOMETRYCOLLECTION\s*\(|(\)\s*)$)/gi,"").replace(/(\))(,\s*)([a-zA-Z])/gi,"$1|$3").split("|");for(var u in x){s=k(x[u],v);if(s!=null){t.push(s)}}return t}function k(u,t){if(u){var s=u.substring(0,u.indexOf("(",0));s=s.replace(/\s/g,"");switch(s.toLowerCase()){case"point":return d(u,t);case"linestring":return e(u,t);case"polygon":return a(u,t);case"multipoint":return f(u,t);case"multilinestring":return o(u,t);case"multipolygon":return n(u,t);case"geometrycollection":return p(u,t);default:break}}return null}function c(v){var t=["("];var s=v.length;for(var u=0;u<s;u++){t.push(Math.round(v[u].longitude*100000)/100000," ",Math.round(v[u].latitude*100000)/100000);if(u<s-1){t.push(",")}}t.push(")");return t.join("")}function m(s){var t=s.getLocation();return"POINT("+Math.round(t.longitude*100000)/100000+" "+Math.round(t.latitude*100000)/100000+")"}function g(s){return"LINESTRING"+c(s.getLocations())}function i(t){var u=["POLYGON("];if(t.getRings){var v=t.getRings();var w=v.length;for(var s=0;s<w;s++){u.push(c(v[s]));if(s<w-1){u.push(",")}}}else{u.push(c(t.getLocations()))}u.push(")");return u.join("")}function j(u){var A=u.getLength(),w,v=["GEOMETRYCOLLECTION("],z,x=0,s=0,y=0;for(var t=0;t<A;t++){w=u.get(t);if(w.getFillColor){v.push(i(w),",");y++}else{if(w.getIcon){v.push(m(w),",");x++}else{if(w.getStrokeColor){v.push(g(w),",");s++}}}}z=v.join("").replace(/,+$/g,"")+")";if(x>0&&s==0&&y==0){z=z.replace(/POINT/gi,"").replace(/GEOMETRYCOLLECTION/gi,"MULTIPOINT")}else{if(x==0&&s>0&&y==0){z=z.replace(/LINESTRING/gi,"").replace(/GEOMETRYCOLLECTION/gi,"MULTILINESTRING")}else{if(x==0&&s==0&&y>0){z=z.replace(/POLYGON/gi,"").replace(/GEOMETRYCOLLECTION/gi,"MULTIPOLYGON")}}}return z}function b(s){if(s.getFillColor){return i(s)}else{if(s.getIcon){return m(s)}else{if(s.getStrokeColor){return g(s)}else{if(s.getLength){return j(s)}}}}return null}this.Read=function(t,s){return k(t,q(s))};this.Write=function(s){return b(s)}};(function(){var a=new Microsoft.Maps.Polygon();if(!a.getRings){Microsoft.Maps.loadModule("Microsoft.Maps.AdvancedShapes",{callback:function(){Microsoft.Maps.moduleLoaded("WKTModule")}})}else{Microsoft.Maps.moduleLoaded("WKTModule")}})();