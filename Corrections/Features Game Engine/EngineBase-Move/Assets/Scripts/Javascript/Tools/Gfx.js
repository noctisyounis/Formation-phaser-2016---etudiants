var Gfx = {
	Filters : {
		Greyscale : function(affectedZone){
			var pixels = ctx.getImageData(affectedZone.x,affectedZone.y,affectedZone.w,affectedZone.h);
			var d = pixels.data;
			for(var i = 0; i < d.length; i += 4)
			{
				var r = d[i];
				var g = d[i + 1];
				var b = d[i + 2];

				var variation = (0.2126*r) + (0.7152 *g) + (0.0722*b);

				d[i] = d[i+1] = d[i+2]= variation;
			}
			ctx.putImageData(pixels, affectedZone.x,affectedZone.y);
		},
		Sepia : function(affectedZone){

			var pixels = ctx.getImageData(affectedZone.x, affectedZone.y, affectedZone.w, affectedZone.h);

			var d = pixels.data;

			for (var i = 0; i < d.length; i += 4) {
				var r = d[i];
				var g = d[i+1];
				var b = d[i+2];

				var outR = (r * 0.393) + (g *.769) + (b * .189);
				var outG = (r * 0.349) + (g *0.686) + (b * 0.168);
				var outB = (r * 0.272) + (g *0.534) + (b * 0.131);

				d[i] = outR;
				d[i + 1] = outG;
				d[i + 2] = outB
			}

			ctx.putImageData(pixels, affectedZone.x, affectedZone.y);
		},
		MaskAlpha : function(affectedZone,mask){
			var pixels = ctx.getImageData(affectedZone.x, affectedZone.y, affectedZone.w, affectedZone.h);
			ctx.drawImage(mask,affectedZone.x,affectedZone.y,affectedZone.w,affectedZone.h);
			var mask = ctx.getImageData(affectedZone.x, affectedZone.y, affectedZone.w, affectedZone.h);
			var d = pixels.data;
			var m = mask.data;

			for (var i = 0; i < m.length; i+=4) {
				var r = m[i];
				var g = m[i+1];
				var b = m[i+2];
				if(r==0 && g == 0 && b ==0)
				{
					m[i] = m[i+1] = m[i+2]= false;
				}
				
			}
			for (var j = 0; j < d.length; j += 4) {
				var M = m[j];

				var r = d[j];
				var g = d[j+1];
				var b = d[j+2];

				if(M == false)
				{	

				var outR = (r * 1) + (g *1) + (b * 1);
				var outG = (r *1) + (g *1) + (b *1);
				var outB = (r *1) + (g *1) + (b * 1);

				d[j] = outR;
				d[j + 1] = outG;
				d[j + 2] = outB
				}

			}
			ctx.putImageData(pixels, affectedZone.x, affectedZone.y);
		}
	}
	
}