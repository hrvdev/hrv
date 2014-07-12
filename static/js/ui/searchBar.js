var SearchBar = (function(){

  var SearchBarClass = function(){
    this.input = $('#searchInput');

    this.searchResult = $('#searchResult');

    this.init();
  };

  SearchBarClass.prototype.init = function(){
    var that = this;

    that.input.on('change', function(){
      that.doSearch();
    });

    $('#searchButton').on('click', function(){
      that.doSearch();
    });
  };

  SearchBarClass.prototype.doSearch = function(){
    var that = this;
    $.get('/worldLocation', {name: that.input.val()}, function(res){

    });
  };

  SearchBarClass.prototype.renderSearchResult = function(){

  };


  return SearchBarClass;

})();
