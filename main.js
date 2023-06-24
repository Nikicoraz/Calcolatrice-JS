"use strict";
const result = document.getElementById("result");
let toClear = false;
function clear() {
    result.value = "";
}
function _evaluate(text, phase) {
    let ris = 0;
    let result = [];
    let splitted = text.split(phase);
    if (phase == "/") {
        ris = parseInt(splitted[0]);
        for (let i = 1; i < splitted.length; i++) {
            ris /= parseInt(splitted[i]);
        }
        return ris;
    }
    splitted.forEach(e => {
        if (phase == "+") {
            result.push(_evaluate(e, "-"));
        }
        else if (phase == "-") {
            result.push(_evaluate(e, "*"));
        }
        else if (phase == "*") {
            result.push(_evaluate(e, "/"));
        }
    });
    ris = result[0];
    if (phase == "+") {
        for (let i = 1; i < result.length; i++) {
            ris += result[i];
        }
    }
    else if (phase == "-") {
        for (let i = 1; i < result.length; i++) {
            ris -= result[i];
        }
    }
    else if (phase == "*") {
        for (let i = 1; i < result.length; i++) {
            ris *= result[i];
        }
    }
    return ris;
}
function evaluate(text) {
    if (!text.match(/^(\d+[\/*+-]?)+$/g)) {
        result.value = "ERROR";
        return;
    }
    result.value = _evaluate(text, "+").toString();
}
Array.from(document.getElementsByTagName("button")).forEach(e => {
    e.addEventListener("click", (event) => {
        if (toClear) {
            clear();
            toClear = false;
        }
        switch (e.id) {
            case "clear":
                clear();
                break;
            case "equals":
                toClear = true;
                evaluate(result.value);
                break;
            default:
                const target = event.target;
                result.value += target.textContent;
                break;
        }
    });
});
alert("PIZZA PAZZA");
