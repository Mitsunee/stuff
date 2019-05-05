$(function(){
    $("div.tags-input").each(function(){
        let thisIn = $(this).find("input").eq(0),
            thisTagsArea = $("<div/>",{'class': 'tags-area'});

        // Insert tagsArea and
        $(this).prepend(thisTagsArea);
        // Give focus to input when clicked
        $(this).on("click",function(){
            thisIn[0].focus();
        }.bind(thisIn));
        // Input overrides for making new tags, deleting tags and getting the latest tag back to the input field
        thisIn.on("keydown",function(ev){
            let thisIn = $(ev.currentTarget),
                newVal = '',
                val = tagsInputRead(ev.currentTarget.parentElement, true),
                pop;

            switch (ev.key) {
                // Convert current input to new tag
                case ',':
                case 'Enter':
                case ' ':
                    ev.preventDefault();
                    if (thisIn.val()=="") return;
                    //create tag div
                    let tag = $("<span/>")
                        .html(thisIn.val())
                        .attr("data-value", thisIn.val());
                    tag.append($("<button/>").html("X").on("click", function(ev){
                        $(this.parentElement).remove();
                    }))
                    thisIn.val("");
                    thisTagsArea.append(tag);
                    break;
                // Delete last tag
                case 'Backspace':
                    if(thisIn.val() != "" || val == "") return;
                    ev.preventDefault();
                    thisTagsArea.find("span").last().remove();
                    break;
                // Recover latest tag
                case 'ArrowLeft':
                    thisTagsArea.find("span").last().remove();
<<<<<<< HEAD
                    if(thisIn.val() != "") return;
=======
                    if(thisIn.val() != "" || thisOut.val() == "") return;
>>>>>>> 0a1414ff0d54e91dc7f70d61baf04d49fdb0dad7
                    ev.preventDefault();
                    if(val.indexOf(',') != -1) {
                        let i = val.split(',');
                        pop = i.pop();
                        val = i.join(',');
                    } else pop = val;
                    thisIn.val(pop);
                    break;
            }
        });
        // On blur submit tag
        thisIn.on("blur", function(ev){
            let thisIn = $(this),
                thisTagsArea = thisIn.parent().find("div").eq(0);
            if (thisIn.val()=="") return;
            //create tag div
            let tag = $("<span/>")
                .html(thisIn.val())
                .attr("data-value", thisIn.val());
            tag.append($("<button/>").html("X").on("click", function(ev){
                $(this.parentElement).remove();
            }))
            thisIn.val("");
            thisTagsArea.append(tag);
        });
        // Clean up input to prevent special characters
        thisIn.on("input",function(ev){
            ev.currentTarget.value = ev.currentTarget.value.toLowerCase().replace(/[^0-9a-z]/g, '');
        });
    });
});

/*
 * Function to read a tags-input
 *
 * @param node el The wrapper div for the tags-input to read from
 * @param bool tostring Set true to convert the return to a string (optional, default: false)
 */
function tagsInputRead(el, tostring) {
    let vals = [];
    for (let tag of $(el).find(".tags-area").find("span")) {
        vals.push($(tag).data("value"));
    }
    return (tostring ? vals.join(',') : vals);
}