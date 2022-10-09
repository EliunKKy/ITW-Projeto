// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Statistics/Season?year=2020');
    self.displayName = 'Standings';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.ConstructorId = ko.observable('');
    self.Year = ko.observable('');
    self.ConstructorStandings = ko.observableArray('');
    self.Name = ko.observable('');
    self.Position = ko.observable('');
    self.Countries = ko.observable('');
    self.Races = ko.observable('');
    self.Constructors = ko.observableArray('');
    self.Points=ko.observable('');
    self.changeYear =function (){
       let year = document.getElementById('select').value
       console.log (year)
       self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Statistics/Season?year='+year);
       console.log(self.baseUri());
       
           console.log('CALL: getStandings...');
           var composedUri = self.baseUri();
           ajaxHelper(composedUri, 'GET').done(function (data) {
               console.log(data);
               self.ConstructorStandings(data.ConstructorStandings);
               self.ConstructorId(data.ConstructorStandings.ConstructorId);
               self.Year(data.ConstructorStandings.Year);
               self.Name(data.ConstructorStandings.Name);
               self.Points(data.ConstructorStandings.Points);
               self.Constructors(data.Constructors);
               self.Position = function(){
                i=0
                while (i<11){
                    i++
                    return i
                }
            }
               //self.Races(data.Races);
               //self.Countries(data.Countries);
               //self.ConstructorStandings(data.ConstructorStandings);
           
           hideLoading();
       });
   }
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getStandings...');
        var composedUri = self.baseUri();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            self.ConstructorStandings(data.ConstructorStandings);
            console.log(ConstructorStandings);
            self.ConstructorId(data.ConstructorStandings.ConstructorId);
            self.Year(data.ConstructorStandings.Year);
            self.Name(data.ConstructorStandings.Name);
            self.Points(data.ConstructorStandings.Points);
            console.log(data.Constructors)
            self.Constructors(data.Constructors); 
          //self.Races(data.Races);
          //self.Countries(data.Countries);
          //self.ConstructorStandings(data.ConstructorStandings);
        });
        hideLoading();
    };
    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
  
    }
    function showLoading() {
        $('#myModal').modal('show',{
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }
  
    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
  
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
  
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    //--- start ....
    showLoading();
    var pg = getUrlParameter('year');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
  };
  
      $(document).ready(function () {
          console.log("ready!");
      ko.applyBindings(new vm());
      });
      
  i=2020
  let select = document.getElementsByClassName("form-select")
  while (i > 1949) {
      
      let opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = i;
      $('.form-select').append($('<option on-click="changeValue(value)" data-bind="click: changeYear">').val(i).text(i));
      i--;
  }
  function changeValue(value){
      document.getElementById('select').value=value
      return document.getElementById('select').value
  }