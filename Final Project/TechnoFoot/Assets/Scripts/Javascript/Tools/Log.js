/**
 * Print text in console.
 * 
 * @namespace Tools/Log 
 * 
 * */
 
/**
 * Print green text in console
 * @memberOf Tools/Log
 * @function Print
 * 
 * @param {String} _text - The text to print in console.
 * 
 */
function Print(_text)
{
	console.log('%c' + _text, 'background:#222; color:#bada55');
}

/**
 * Print red text in console
 * @memberOf Tools/Log
 * @function PrintErr
 * 
 * @param {String} _text - The text to print in console.
 * 
 */
function PrintErr(_text)
{
	//console.log('%c' + _text, 'background:#F00; color:#000');
	throw _text;
}