/**
 * Adds post effect on stage <br/>
 * Create a Gfx and set the filters what you want
 *  
 * @namespace GFX/Gfx
 * */

var Gfx = 
{
	Filters: 
	{

		/**
		* 
		* @function Greyscale
		* @memberof GFX/Gfx
		*
		* @param {Box} _affectedZone - Set the position and size of the post effect area
		*
		* @description
		* Applies a grey filter on the post effect area.
		**/
		Greyscale : function(_affectedZone) 
		{
			var pixels = ctx.getImageData(_affectedZone.x, _affectedZone.x, _affectedZone.w, _affectedZone.h);
			var d = pixels.data;

			for (var i = 0; i < d.length; i+=4) 
			{
				var r = d[i];
				var g = d[i + 1];
				var b = d[i + 2];

				var variation = 0.2126 * r + 0.7152 * g + 0.0722 * b;

				d[i] = d[i + 1] = d[i + 2] = variation;

			}

			ctx.putImageData(pixels, _affectedZone.x, _affectedZone.y);

		},

		/**
		* Applies a Sepia filter on the post effect area.
		* @function Sepia
		* @memberof GFX/Gfx
		*
		* @param {Box} _affectedZone - Set the position and size of the post effect area
		**/
		Sepia : function(_affectedZone) 
		{
			var pixels = ctx.getImageData(_affectedZone.x, _affectedZone.y, _affectedZone.w, _affectedZone.h);
			var d = pixels.data;

			for (var i = 0; i < d.length; i+=4) 
			{
				var r = (d[i] * 0.393) + (d[i + 1] * .769) + (d[i + 2] * .189);
				var g = (d[i] * 0.349) + (d[i + 1] * .686) + (d[i + 2] * .168);
				var b = (d[i] * 0.272) + (d[i + 1] * .534) + (d[i + 2] * .131);


				d[i] = r;
				d[i + 1] = g;
				d[i + 2] = b;

			}

			ctx.putImageData(pixels, _affectedZone.x, _affectedZone.y);
		},

		/**
		* Applies a color Tint filter on the post effect area.
		* @function Tint
		* @memberof GFX/Gfx
		*
		* @param {Box} _affectedZone - Set the position and size of the post effect area
		* @param {String} _color - Set the color of tint
		**/

		Tint: function (_affectedZone, _color) 
		{
			Gfx.Filters.Greyscale(_affectedZone);
			ctx.fillStyle = _color;
			ctx.fillRect(_affectedZone.x, _affectedZone.x, _affectedZone.w, _affectedZone.h)

		},

		/**
		* Applies a AlphaMask on the post effect area.
		* @function AlphaMask
		* @memberof GFX/Gfx
		*
		* @param {Box} _affectedZone - Set the position and size of the post effect area
		**/

		AlphaMask: function(_affectedZone) 
		{
			if (Application.LoadedScene.AlphaMask != null) 
			{
				var alphaMask = Application.LoadedScene.AlphaMask;
				var d = alphaMask.Renderer.Pixels.data;
				var pixelsCanvas = ctx.getImageData(_affectedZone.x, _affectedZone.y, _affectedZone.w, _affectedZone.h);
				var d2 = pixelsCanvas.data;
				for (var i = 0; i < d.length; i += 4)
				 {
					if (!(d[i] && d[i + 1] && d[i + 2])) 
					{
						d2[i + 3] = Number.NaN;
					}
				}
				ctx.putImageData(pixelsCanvas, _affectedZone.x, _affectedZone.y);
			}
		},

		/**
		* Applies a Flash effect on the post effect area.
		* @function Flash
		* @memberof GFX/Gfx
		*
		* @param {Box} _affectedZone - Set the position and size of the post effect area
		* @param {Number} _power - Set the flash intensity
		* @param {String} _color - Set the flash color
		**/
		Flash: function(_affectedZone, _power, _color) {
			ctx.fillStyle = _color;
			ctx.fillRect(_affectedZone.x, _affectedZone.x, _affectedZone.w, _affectedZone.h);	
		}
	}
}