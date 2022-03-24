var config = {
    apiKey: "AIzaSyD-WoETx4P8BPtfxuKIVvr38tp0x0z7fVM",
    authDomain: "grocerylist-e012f.firebaseapp.com",
    databaseURL: "https://grocerylist-e012f-default-rtdb.firebaseio.com",
    projectId: "grocerylist-e012f",
    storageBucket: "grocerylist-e012f.appspot.com",
    messagingSenderId: "320470919045",
    appId: "1:320470919045:web:8a94b3e93c0290c1b546ec",
    measurementId: "G-6W4QL6Z2RS"
};
firebase.initializeApp(config);

var ref = firebase.database().ref('test');

function loadSavedItemList() {
    firebase.database().ref('test').once('value').then(function(snapshot) {
            var gData = snapshot.val();
            var produceUL = document.getElementById("produce-list");
            var produce = gData.Produce;
            var deliUL = document.getElementById("deli-list");
            var deli = gData.Deli;
            var meatUL = document.getElementById("meat-list");
            var meat = gData.Meat;
            var array = [
                { category: "Produce", element: produceUL, fbdata: produce },
                { category: "Deli", element: deliUL, fbdata: deli },
                { category: "Meat", element: meatUL, fbdata: meat }
            ];
            for (var j = 0; j < array.length; j++) {
                /* console.log(array[j].fbdata[0].item);*/
                for (var i = 0; i < array[j].fbdata.length; i++) {
                    li = $('<li class="ui-state-default" data-category=' + array[j].category + '>' + array[j].fbdata[i].item + '</li>');
                    li.data('d', array[j].fbdata[i])
                    $(array[j].element).append(li);
                }
            };

        },
        function(error) {
            console.log("Error: " + error.code);
        });
};

$(document).ready(function() {
    $('#produce-list, #deli-list, #meat-list').sortable({
        update: function(event, ui) {
            fb_category = $(this).find('li').data('category')
            new_locations = $(this).find('li').map(function(i, el) {
                return $(el).data('d')
            }).get()
            firebase.database().ref('test').child(fb_category).set(new_locations);
        }
    });
});
var items = ['Produce', 'Deli', 'Meat'];
$(".add").click(function(e) {
    var dlg = $("<div>", {
        title: "Add To " + $(this).parent().find("p").text()
    });
    var that = $(this);
    dlg.append(
        $("<label>").html("Name"),
        $("<input>", {
            type: "text",
            class: "name txt"
        }),
        $("<label>").html("Category"),
        $("<select>", {
            class: "category txt"
        }).append('<option>Produce</option><option>Deli</option><option>Meat</option>')
    );
    dlg.dialog({
        modal: true,
        buttons: [{
            text: "Ok",
            click: function() {
                var d = [{
                    item: $(this).find(".name").val(),
                    child: $(this).find(".category").val()
                }];
                addtoList(d, that.parent());
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
});

function addtoList(d) {
    firebase.database().ref('test').once('value').then(function(snapshot) {
        var gData = snapshot.val();
        let category = d[0].child;
        switch (category) {
            case 'Produce':
                array = gData.Produce;
                child = 'Produce';
                ul = document.getElementById('produce-list');
                break;
            case 'Deli':
                array = gData.Deli;
                child = 'Deli';
                ul = document.getElementById('deli-list');
                break;
            case 'Meat':
                array = gData.Meat;
                child = 'Meat';
                ul = document.getElementById('meat-list');
                break;
        }
        let key = array.length;
        console.log(array);
        var update = [{ item: d[0].item }];
        console.log(update);
        firebase.database().ref('test').child(child).child(key).set({ item: d[0].item });
        li = $('<li class="ui-state-default" data-category=' + child + '>' + d[0].item + '</li>');
        li.data('d', update)
        $(ul).append(li);
    })
}