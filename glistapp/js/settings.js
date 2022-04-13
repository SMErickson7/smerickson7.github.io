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

$(document).ready(function() {
    firebase.database().ref('test').once('value').then(function(snapshot) {
            var gData = snapshot.val();
            var aisles = gData.Aisle;
            var aislesX = [...aisles];
            aislesX.unshift({ item: 'Aisle' });
            var aislesID = [];
            var aisleOptions = [];
            $(aislesX).each(function(i, e) {
                if ((i % 4) == 0) {
                    container = $('<div class="row"></div>');
                    $('#groceryAisles').append(container);
                }
                $('<div class="three columns"><div class="header"><h5>' + aislesX[i].item + '</h5></div><ul class="sortable connectedSortable" id="' + aislesX[i].item.toLowerCase().replace(" & ", "_") + '-list"  data-aisle="' + aislesX[i].item + '" ></ul></div>').appendTo(container);
                aislesID.push('#' + aislesX[i].item.toLowerCase().replace(" & ", "_") + '-list');
                aisleOptions.push('<option>' + aislesX[i].item + '</option>')
            });
            aisleOptions = aisleOptions.join("");
            let aislesIDSelector = aislesID.join(", ");
            for (var j = 0; j < aislesX.length; j++) {
                aisleName = aislesX[j].item;
                for (var i = 0; i < gData[aisleName].length; i++) {

                    li = $('<li class="ui-state-default"  data-groceryitem="' + gData[aisleName][i].item + '" data-category="' + aisleName + '">' + gData[aisleName][i].item + '<a href="#" class="clicked" data-item="' + gData[aisleName][i].item + '" data-aisle="' + aisleName + '"><div class="removeItem"><i class="fa-solid fa-xmark"></i></div></a></li>');
                    li.data('d', gData[aisleName][i])
                    $('#' + aisleName.toLocaleLowerCase().replace(" & ", "_") + '-list').append(li);
                }
            };
            $('.clicked').click(function() {
                var removeFromAisle = $(this).data('aisle');
                var removeItem = $(this).data('item');
                var aisleID = '#' + removeFromAisle.toLowerCase().replace(" & ", "_") + '-list';
                var aisleArray = gData[removeFromAisle];
                var removeItemPosition = aisleArray.map(function(e) { return e.item; }).indexOf(removeItem);
                $("ul[data-aisle=" + removeFromAisle + "] > li[data-groceryitem=" + removeItem + "]").remove();
                aisleArray.splice(removeItemPosition, 1);
                firebase.database().ref('test').child(removeFromAisle).set(aisleArray);
                confirm("Success");
            });
            $(aislesIDSelector).sortable({
                update: function(event, ui) {
                    fb_category = $(this).find('li').parent().data('aisle')
                    new_locations = $(this).find('li').map(function(i, el) {
                        return $(el).data('d')
                    }).get()
                    firebase.database().ref('test').child(fb_category).set(new_locations);

                },
                start: function(event, ui) {
                    $(ui.item).addClass("moving");
                },
                stop: function(event, ui) {
                    $(ui.item).removeClass("moving");
                },
                connectWith: ".connectedSortable"

            }).disableSelection();
        },
        function(error) {
            console.log("Error: " + error.code);
        });

});



$(".add").click(function(e) {
    firebase.database().ref('test').once('value').then(function(snapshot) {
            var gData = snapshot.val();
            var aisles = gData.Aisle;
            aisles.unshift({ item: 'Aisle' });
            var aisleOptions = [];
            $(aisles).each(function(i, e) {
                aisleOptions.push('<option>' + aisles[i].item + '</option>')
            });
            aisleOptions = aisleOptions.join("");
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
                }).append(aisleOptions)
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
        },
        function(error) {
            console.log("Error: " + error.code);
        });
});

function addtoList(d) {
    firebase.database().ref('test').once('value').then(function(snapshot) {
        var gData = snapshot.val();
        let category = d[0].child; // Aisle name, i.e. 'Produce'
        if (gData[category] == null) {
            var key = 0;
        } else {
            var key = gData[category].length;
        }
        var update = [{ item: d[0].item }];
        firebase.database().ref('test').child(category).child(key).set({ item: d[0].item });
        li = $('<li class="ui-state-default" data-category=' + category + '>' + d[0].item + '</li>');
        li.data('d', update)
        $('#' + category.toLocaleLowerCase().replace(" & ", "_") + '-list').append(li);
    })
}