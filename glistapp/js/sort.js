$(function() {
    var extData = [{}];

    function updateList(data, target) {
        var sort = target.find(".sortable");
        if (sort.hasClass("ui-sortable")) {
            sort.sortable("refresh");
        }
    }

    updateList(extData, $("#my-list"));
    $(".sortable").sortable();
    $(".sortable").disableSelection();
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
            $("<label>").html("ID"),
            $("<input>", {
                type: "input",
                class: "id txt"
            })
        );
        dlg.dialog({
            modal: true,
            buttons: [{
                text: "Ok",
                click: function() {
                    var d = [{
                        label: $(this).find(".name").val(),
                        id: $(this).find(".id").val()
                    }];
                    updateList(d, that.parent());
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
});

var locations = [
    { name: 'point 0', location: [50.8674162, 4.3772933] },
    { name: 'point 1', location: [50.8135113, 4.3247394] },
    { name: 'point 2', location: [50.8771732, 4.3544551] },
    { name: 'point 3', location: [50.8460485, 4.3664706] }
];



/*
$(document).ready(function() {
    generateUl();
    $('#points').sortable({
        update: function(event, ui) {
            new_locations = $(this).find('li').map(function(i, el) {
                return $(el).data('d')
            }).get()

            $('#display').html(JSON.stringify(new_locations));
        }
    });
}); */

$(document).ready(function() {
    generateUl();
    $('#points').sortable({
        update: function(event, ui) {
            new_locations = $(this).find('li').map(function(i, el) {
                return $(el).data('d')
            }).get()

            $('#display').html(JSON.stringify(new_locations));
        }
    });
});