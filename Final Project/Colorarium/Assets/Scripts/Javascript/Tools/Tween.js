/**
 * <a href="http://blog.26interactive.com/wp-content/uploads/2012/02/Untitled-1.jpg" >
 * Graph </a> <br />
 * A Tween allows you to alter one or more properties of a target object over a defined period of time
 *
 * @namespace Tools/Tween
 * 
 * */
var Tween = 
{
    /**
     * @memberof Tools/Tween
     * @function Linear
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     *  
     * */
     
    Linear: function (_t, _b, _c, _d) {return _c * _t / _d + _b;},
    /**
     *
     * Quadratic.In, Quadratic.Out, Quadratic.InOut
     * @memberof Tools/Tween
     * @function Quadratic
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     *  
     * */
    Quadratic: 
    {
        In: function (_t, _b, _c, _d) {_t /= _d; return _c * _t * _t + _b;}, 
        Out: function (_t, _b, _c, _d) {_t /= _d; return - _c * _t * (_t - 2) + _b;},
        InOut: function (_t, _b, _c, _d) {_t /= _d / 2; if (_t < 1) return _c / 2 * _t * _t + _b; _t--; return - _c / 2 * (_t * (_t - 2) - 1) + _b;}
    },
    /**
     *
     * Cubic.In, Cubic.Out, Cubic.InOut
     * @memberof Tools/Tween
     * @function Cubic
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     *  
     * */
    Cubic:
    {
        In: function (_t, _b, _c, _d) {_t /= _d; return _c * _t * _t * _t + _b;},
        Out: function (_t, _b, _c, _d) {_t /= _d; _t--; return _c * (_t * _t * _t + 1) + _b;},
        InOut: function (_t, _b, _c, _d) {_t /= _d / 2; if (_t < 1) return _c / 2 * _t * _t * _t + _b; _t -= 2; return _c / 2 * (_t * _t * _t + 2) + _b;}
    },
    /**
     *
     * Quartic.In, Quartic.Out, Quartic.InOut
     * @memberof Tools/Tween
     * @function Quartic
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     *  
     * */
    Quartic:
    {
        In: function (_t, _b, _c, _d) {_t /= _d; return _c * _t * _t * _t * _t + _b;},
        Out: function (_t, _b, _c, _d) {_t /= _d; _t--; return - _c * (_t * _t * _t * _t - 1) + _b;},
        InOut: function (_t, _b, _c, _d) {_t /= _d / 2; if (_t < 1) return _c / 2 * _t * _t * _t * _t + _b; _t -= 2; return - _c / 2 * (_t * _t * _t * _t - 2) + _b;}
    },
    /**
     *
     * Quintic.In, Quintic.Out, Quintic.InOut
     * @memberof Tools/Tween
     * @function Quintic
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     *  
     * */
    Quintic:
    {
        In: function (_t, _b, _c, _d) {_t /= _d; return _c * _t * _t * _t * _t * _t + _b;},
        Out: function (_t, _b, _c, _d) {_t /= _d; _t--; return _c * (_t * _t * _t * _t * _t + 1) + _b;},
        InOut: function (_t, _b, _c, _d) {_t /= _d / 2; if (_t < 1) return _c / 2 * _t * _t * _t * _t * _t + _b; _t -= 2; return _c / 2 * (_t * _t * _t * _t * _t + 2) + _b;}
    },
    /**
     *
     * Sinusoidale.In, Sinusoidale.Out, Sinusoidale.InOut
     * @memberof Tools/Tween
     * @function Sinusoidale
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     *  
     * */
    Sinusoidale:
    {
        In: function (_t, _b, _c, _d) {return - _c * Math.cos(_t / _d * (Math.PI / 2)) + _c + _b;},
        Out: function (_t, _b, _c, _d) {return _c * Math.sin(_t / _d * (Math.PI / 2)) + _b;},
        InOut: function (_t, _b, _c, _d) {return - _c / 2 * (Math.cos(Math.PI * _t / _d) - 1) + _b;}
    },
    /**
     *
     * Exponential.In, Exponential.Out, Exponential.InOut
     * @memberof Tools/Tween
     * @function Exponential
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     *  
     * */
    Exponential:
    {
        In: function (_t, _b, _c, _d) {return _c * Math.pow(2, 10 * (_t / _d - 1)) + _b;},
        Out: function (_t, _b, _c, _d) {return _c * (- Math.pow(2, - 10 * _t /_d) + 1) + _b;},
        InOut: function (_t, _b, _c, _d) {_t /= _d / 2; if (_t < 1) return _c / 2 * Math.pow(2, 10 * (_t - 1)) + _b; _t--; return _c / 2 * (- Math.pow(2, - 10 * _t) + 2) + _b;}
    },
    /**
     *
     * Circular.In, Circular.Out, Circular.InOut
     * @memberof Tools/Tween
     * @function Circular
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     *  
     * */
    Circular:
    {
        In: function (_t, _b, _c, _d) {_t /= _d; return - _c * (Math.sqrt(1 - _t *_t) - 1) + _b;},
        Out: function (_t, _b, _c, _d) {_t /= _d; _t--; return _c * Math.sqrt(1 - _t * _t) + _b;},
        InOut: function (_t, _b, _c, _d) {_t /= _d / 2; if (_t < 1) return - _c / 2 * (Math.sqrt(1 - _t * _t) - 1) + _b; _t -= 2; return _c / 2 * (Math.sqrt(1 - _t * _t) + 1) + _b;}
    },
    /**
     *
     * Elastic.In, Elastic.Out, Elastic.InOut
     * @memberof Tools/Tween
     * @function Elastic
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     * @param {Number} _a - amplitude
     * @param {Number} _p - period
     *  
     * */
    Elastic: 
    {
        In: function (_t, _b, _c, _d, _a, _p) {if (_t == 0) return _b; if ((_t /= _d) == 1) return _b + _c; if (!_p) _p = _d * .3; if (_a < Math.abs(_c)) { _a = _c; var s = _p / 4;} else var s = _p / (2 * Math.PI) * Math.asin(_c / _a); return - (_a * Math.pow(2, 10 * (_t -= 1)) * Math.sin((_t * _d - s) * (2 * Math.PI) / _p)) + _b;},
        Out: function (_t, _b, _c, _d, _a, _p) {if (_t == 0) return _b; if ((_t /= _d) == 1) return _b + _c; if (!_p) _p = _d * .3; if (_a < Math.abs(_c)) { _a = _c; var s = _p / 4;} else var s = _p / (2 * Math.PI) * Math.asin(_c / _a); return _a * Math.pow(2, - 10 * _t) * Math.sin((_t * _d - s) * (2 * Math.PI) / _p ) + _c + _b;},
        InOut:function (_t, _b, _c, _d, _a, _p) {if (_t == 0) return _b; if ((_t /= _d / 2) == 2) return _b +_c; if (!_p) _p = _d * (.3 * 1.5); if (_a < Math.abs(_c)) { _a = _c; var s = _p / 4; } else var s = _p / (2 * Math.PI) * Math.asin(_c / _a); if (_t < 1) return - .5 * (_a * Math.pow(2, 10 * (_t -= 1)) * Math.sin((_t * _d - s) * (2 * Math.PI) / _p)) + _b; return _a * Math.pow(2, - 10 * (_t -= 1)) * Math.sin((_t * _d - s) * (2 * Math.PI) / _p) * .5 + _c + _b;}  
    },
    /**
     *
     * Back.In, Back.Out, Back.InOut
     * @memberof Tools/Tween
     * @function Back
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     * @param {Number} _s - overshoot amount
     *  
     * */
    Back: 
    {
        In: function (_t, _b, _c, _d, _s) {if (_s == undefined) _s = 1.70158; return _c * (_t /= _d) * _t * ((_s + 1) * _t - _s) + _b;},
        Out: function (_t, _b, _c, _d, _s) {if (_s == undefined) _s = 1.70158; return _c * ((_t = _t / _d - 1) * _t * ((_s + 1) * _t + _s) + 1) + _b;},
        InOut: function (_t, _b, _c, _d, _s) {if (_s == undefined) _s = 1.70158; if ((_t /= _d / 2) < 1) return _c / 2 * (_t * _t * (((_s *= (1.525)) + 1) * _t - _s)) + _b; return _c / 2 *((_t -= 2) * _t * (((_s *= (1.525)) + 1) * _t + _s) + 2) + _b;}
    },  
    /**
     *
     * Boucne.In, Boucne.Out, Boucne.InOut
     * @memberof Tools/Tween
     * @function Bounce
     * @param {Number} _t - current time
     * @param {Number} _b - start value
     * @param {Number} _c - change in value
     * @param {Number} _d - duration
     *  
     * */
    Bounce:
    {
        In: function (_t, _b, _c, _d) {return _c - Tween.Bounce.Out(_d - _t, 0, _c, _d) + _b;},
        Out: function (_t, _b, _c, _d) {if ((_t /= _d) < (1 / 2.75)) {return _c * (7.5625 * _t * _t) + _b;} else if (_t < (2 / 2.75)) {return _c * (7.5625 * (_t -= (1.5 / 2.75)) * _t + .75) + _b;} else if (_t < (2.5 / 2.75)) {return _c * (7.5625 * (_t -= (2.25 / 2.75)) * _t + .9375) + _b;} else {return _c * (7.5625 * (_t -= (2.625 / 2.75)) * _t + .984375) + _b;}},
        InOut: function (_t, _b, _c, _d) {if (_t < _d / 2) return Tween.Bounce.In(_t * 2, 0, _c, _d) * .5 + _b; return Tween.Bounce.Out(_t * 2 - _d, 0, _c, _d) * .5 + c * .5 + _b;}
    },
    CreateTimedTween: function(_tween, _duration, _startValue, _changeInValue ) 
    {
        var timer = new Timer(_duration, true, function() {
            var timer = this;
            var s = Tween.Bounce.InOut(timer.currentTime, _startValue, _changeInValue, _duration );
        });
         
    },
    /*  ATTENTION PSEUDOCODE

    function Tween (current, departure, arrival, delta, tolerence)
    {   
        //to right
        if( departure - arrival < delta )
        {
            return delta + current;
        }
        //to left
        if( departure - arrival > delta)
        {
            return delta - current;
        }
        if(Math.abs(departure - arrival) < tolerence )
        {
            return arrival;
        }

        //bisou
    }*/

    TweenGrid : function(_current, _departure, _arrival, _delta, _tolerence)
    {
        if(Math.abs(_arrival - _current) < _delta + _tolerence )
        {
            return _arrival;
        }
        if( _departure < _arrival )
        {
            return _current + _delta ;
        }
        //to left
        if( _departure > _arrival )
        {
            return _current - _delta;
        }
    }
};