$(document).ready(function(){
var input = document.getElementById('amount_NFT_to_buy');
var inputETH = document.getElementById('amount_ETH_to_buy');
var controls = document.querySelector('.box_qty_form_btn');
var cursVal = 449.0454;
var q = [449.0454, 1325, 21, 92, 2];
var currency = [' ETH', ' BTC', ' LTC', ' DASH', ' USD'];

$('.curs').html(cursVal + ' Ethereum');

$('.selectric').click(function(){
    $('.selectric_items').slideToggle();
    return false;
});

function mapEventToValue(event) {
    return event.target.value;
}
function compose() {
    var args = Array.prototype.slice.call(arguments);   
    return function(initValue) {
        return args.reduce(function(acc, el) {                
            return el(acc);
        }, initValue);
    };
}
function bindOutput(targetElement, cursNew) {
    return function(newValue) {
        var tElement = targetElement.value =(Math.round(newValue*cursNew * 10000) / 10000);
    };
}
function bind2Output(tElement, cursN) {
    return function(nValue) {                    
        var taElement = tElement.value =(Math.round(nValue/cursN * 10000) / 10000);
    };
}
function getCallbacks(inputElement, outputCallback) {
    return {
        plus: function(event) {
            var num = !isNaN(+inputElement.value)&&(+inputElement.value<10000000);
            inputElement.value = num ? +inputElement.value + 100 : 1;
            outputCallback(input.value);

        },
        minus: function (event) {
            var num = !isNaN(+inputElement.value)&&(+inputElement.value>100);
            inputElement.value = num ? +inputElement.value - 100 : 1;
            outputCallback(input.value);
        }
    };
}
$('.val_in').click(function(){
    if(!$(this).hasClass('selected')){ 
        $('.val_in').removeClass('selected').removeClass('highlighted');
        $(this).addClass('selected').addClass('highlighted'); 
        var labeSelectric = document.querySelector('.selectric .label');
        var selectActive = document.querySelector('.selected').innerHTML;
        var selectActive2 = labeSelectric.innerHTML = selectActive;
    }
    var curs = $('.val_in.selected');
    var span_curs = $('.curs');
    if(curs.hasClass('inbtc')){
        span_curs.html((Math.round(1/q[0] * 10000) / 10000)+currency[0]);
        cursVal = q[0];
    } else if(curs.hasClass('inltc')){
        span_curs.html((Math.round(1/q[1] * 10000) / 10000)+currency[1]);
        cursVal = q[1];
    } else if(curs.hasClass('ineth')){
        span_curs.html((Math.round(1/q[2] * 10000) / 10000)+currency[2]);
        cursVal = q[2];
    } else if(curs.hasClass('indash')){
        span_curs.html((Math.round(1/q[3] * 10000) / 10000)+currency[3]);
        cursVal = q[3];
    } else if(curs.hasClass('inusd')){
        span_curs.html((Math.round(1/q[4] * 10000) / 10000)+currency[3]);
        cursVal = q[4];
    }
    input.value = (Math.round(inputETH.value/cursVal * 10000) / 10000);
});


inputETH.addEventListener('input', compose(mapEventToValue, bind2Output(input, cursVal)));
input.addEventListener('input', compose(mapEventToValue, bindOutput(inputETH, cursVal)));
controls.addEventListener('click', function(event) {
    var callbacks = getCallbacks(input, bindOutput(inputETH, cursVal));
    event.preventDefault();
    var controlType = event.target.getAttribute('data-control');
    typeof callbacks[controlType] === 'function' && callbacks[controlType]();
});

});