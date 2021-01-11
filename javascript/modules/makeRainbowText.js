import $ from "jquery";

export default function(el) {
    let $el;
    if (el instanceof HTMLElement) $el = $(el);
    if (el instanceof $) $el = el;
    if (!$el) return false;

    let colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8F00FF"],
        text = String($el.text()).split(""),
        count = 0;
    $el.text("");

    for (let character of text) {
        if (/\S/.test(character)) {
            let span = $("<span/>").text(character)
                .css("color", colors[count % colors.length]);
            count++;
            $el.append(span);
        } else {
            let prevSpan = $el.find("span:last-of-type"),
                old = prevSpan.html();
            prevSpan.html(old + character);
        }
    }
}
