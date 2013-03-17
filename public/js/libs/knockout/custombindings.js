(function(ko) {

  ko.bindingHandlers.enterKey = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      ko.utils.registerEventHandler(element, 'keydown', function(evt) {
        if (evt.keyCode === 13) {
          evt.preventDefault();
          evt.target.blur();
          console.log(valueAccessor, valueAccessor(), bindingContext);
          valueAccessor().call(viewModel, bindingContext.$data);
        }
      });
    }
  };

})(ko);
