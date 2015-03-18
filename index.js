(function( module ){
  var createView = function( el, context, variable ){
    return Object.create({
      $control:   el.querySelector('.control')
    , $value:     el.querySelector('.value')

    , init: function(){
        this.$control.addEventListener('input', function( e ){
          this.setValue( +e.target.value );
        }.bind( this ));

        return this;
      }

    , setValue: function( value ){
        this.value = context[ variable ] = value;
        this.render();
        return this;
      }

    , render: function(){
        this.$value.innerText = this.value;

        if ( this.$control.value != this.value ){
          this.$control.value = this.value;
        }
        return this;
      }
    }).init();
  };

  var cid  = 0;

  module.exports.init = function( options ){
    var defaults = {
      context: window
    };

    options = options || {};

    for ( var key in defaults ){
      if ( key in options ) continue;
      options[ key ] = defaults[ key ];
    }

    document.addEventListener( 'DOMContentLoaded', function(){
      var controls = document.querySelectorAll('[data-variable-control]');
      controls = Array.prototype.slice.call( controls );

      controls.forEach( function( el ){
        var view = module.exports.views[ el.id || cid ] = createView(
          el, options.context, el.dataset.variableControl
        );

        view.setValue( options.context[ el.dataset.variableControl ] );

        cid++;
      });
    });
  };

  module.exports.views = {};
})( module ? module : { exports: window.inputControls = {} } );