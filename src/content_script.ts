import {extendColor} from "./color"
import {extendGraph} from "./graph"

window.addEventListener("load", main, false);

function extendBigQuery() {
    extendGraph();
    extendColor();
}

function main() {
    console.log("load bigquery extension");
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);

    function jsLoaded() {
        console.log("jsLoaded");
        if (document.querySelector('bq-results-table th') == null) return;

        clearInterval(jsInitCheckTimer);
        console.log("clearInterval");

        extendBigQuery();

        let observer = new MutationObserver((_) => {
            console.log("MutationObserver");
            observer.disconnect();
            jsLoaded();
        });
        observer.observe(document.querySelector('bq-results-table'), {
            attributes: true,
            childList: true,
            subtree: true
        });
    }
}
