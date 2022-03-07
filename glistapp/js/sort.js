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