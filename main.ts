const result = document.getElementById("result") as HTMLInputElement;
let toClear = false;

function clear() {
    result.value = "";
}

function _evaluate(text: string, phase: string) {
    let ris = 0;
    let result: number[] = [];
    let splitted = text.split(phase);
    if (phase == "/") {
        ris = parseFloat(splitted[0]);
        for (let i = 1; i < splitted.length; i++) {
            ris /= parseFloat(splitted[i]);
        }
        return ris;
    }
    splitted.forEach(e => {
        if (phase == "+") {
            result.push(_evaluate(e, "-"));
        } else if (phase == "-") {
            result.push(_evaluate(e, "*"));
        } else if (phase == "*") {
            result.push(_evaluate(e, "/"));
        }
    })
    ris = result[0];
    if (phase == "+") {
        for (let i = 1; i < result.length; i++) {
            ris += result[i];
        }
    } else if (phase == "-") {
        for (let i = 1; i < result.length; i++) {
            ris -= result[i];
        }
    } else if (phase == "*") {
        for (let i = 1; i < result.length; i++) {
            ris *= result[i];
        }
    }
    return ris;
}

function evaluate(text: string) {
    if (!text.match(/^([\d\.]+[\/*+-]?)+$/g)) {
        result.value = "ERROR";
        return;
    }
    result.value = _evaluate(text, "+").toString();
}

function equalsPressed() {
    toClear = true;
    evaluate(result.value);
}

result.addEventListener("keydown", (e) => {
    if (toClear) {
        toClear = false;
    }
    if (e.key == "Enter") {
        equalsPressed();
    }
});

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
                equalsPressed();
                break;

            default:
                result.value += (event.target as HTMLInputElement).textContent;
                break;
        }
    });
});