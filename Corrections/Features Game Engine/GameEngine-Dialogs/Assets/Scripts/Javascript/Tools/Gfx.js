var Gfx = {
	Filters: {
		Grayscale : function(affectedZone) {
			var pixels = ctx.getImageData(affectedZone.x,affectedZone.x,affectedZone.w,affectedZone.h);
			var d = pixels.data;

			for (var i = 0; i < d.length; i+=4) {
				var r = d[i];
				var g = d[i+1];
				var b = d[i+2];

				var variation = 0.2126*r + 0.7152*g + 0.0722*b;

				d[i] = d[i+1] = d[i+2] = variation;

			}

			ctx.putImageData(pixels,affectedZone.x,affectedZone.y);

		},
		Sepia : function(affectedZone) {
			var pixels = ctx.getImageData(affectedZone.x,affectedZone.x,affectedZone.w,affectedZone.h);
			var d = pixels.data;

			for (var i = 0; i < d.length; i+=4) {
				var r = (d[i] * 0.393) + (d[i+1] *.769) + (d[i+2] * .189);
				var g = (d[i] * 0.349) + (d[i+1] *.686) + (d[i+2] * .168);
				var b = (d[i] * 0.272) + (d[i+1] *.534) + (d[i+2] * .131);


				d[i] = r;
				d[i+1] = g;
				d[i+2] = b;

			}

			ctx.putImageData(pixels,affectedZone.x,affectedZone.y);
		},
		Tint: function (affectedZone,color) {
			Gfx.Filters.Greyscale(affectedZone);
			ctx.fillStyle = color;
			ctx.fillRect(affectedZone.x,affectedZone.x,affectedZone.w,affectedZone.h)

		},
		AlphaMask: function(maskData) {
			var pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
			var d = pixels.data;

			for (var i = 0; i < d.length; i+=4) {
				var r = maskData[i];
				var g = maskData[i+1];
				var b = maskData[i+2];

				var newAlpha = (((g+b+r))*0.33333333333333);

				d[i+3] = newAlpha;

			}

			ctx.putImageData(pixels,0,0);
		},
		Flash: function(affectedZone, power, color) {
			
			//Linear: function (time, base, change, duration) {return b + c*(t/d);},
			var alpha = 10 * Tween.Back.Out(Time.TweenCounter, 0, Time.DeltaTime, 1);

			Time.TweenCounter += Time.DeltaTime*2;
			console.log(alpha);
			
			if (alpha >= 2) {
				return;
			}
			else if (alpha >= 1) {
				alpha = 2- alpha;
			}
			
			ctx.globalAlpha = alpha*power;

			ctx.fillStyle = color;
			ctx.fillRect(affectedZone.x,affectedZone.y,affectedZone.w,affectedZone.h);
			ctx.globalAlpha = 1;
		}
	}
}