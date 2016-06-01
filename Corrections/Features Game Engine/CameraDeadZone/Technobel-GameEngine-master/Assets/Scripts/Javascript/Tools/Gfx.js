Gfx = {
	Filters: {
		Greyscale: function(affectedZone) {
			var pixels = ctx.getImageData(affectedZone.x, affectedZone.y, affectedZone.w, affectedZone.h);
			var d = pixels.data;

			for (var i = 0; i < d.length; i+=4) {

				var r = d[i];
				var g = d[i + 1];
				var b = d[i + 2];

				var variation = (0.2126 * r) + (0.7152 * g) + ( 0.0722 * b);

				d[i] = d[i+1] = d[i+2] = variation;
			}

			ctx.putImageData(pixels, affectedZone.x, affectedZone.y);
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

		Tint : function(affectedZone, color){

			var box = {
				x: affectedZone.x,
				y: affectedZone.y,
				w: affectedZone.w,
				h: affectedZone.h
			};

			ctx.fillStyle = color;
			ctx.fillRect(box.x, box.y, box.w, box.h);
		},

		Mask: function(affectedZone, oldpixels) {
			
			var pixels = ctx.getImageData(affectedZone.x, affectedZone.y, affectedZone.w, affectedZone.h);

			var op = oldpixels.data;
			var d = pixels.data;

			for (var i = 0; i < d.length; i += 4) {
				
				if (d[i] != 0 && d[i+1] != 0 && d[i+2] != 0) {

					d[i] = op[i];
					d[i+1] = op[i+1];
					d[i+2] = op[i+2];
					d[i+3] = op[i+3];
				}
			}

			ctx.putImageData(pixels, affectedZone.x, affectedZone.y);
		},

		Flash: function(affectedZone, power, color) {

			power = Tween.Cubic.In(Time.DeltaTime, power, .1, 10);

			console.log(power);

			color = "rgba(255,255,255," + power + ")";
			
			ctx.fillStyle = color;
			ctx.fillRect(affectedZone.x, affectedZone.y, affectedZone.w, affectedZone.h);
		}
	}
};